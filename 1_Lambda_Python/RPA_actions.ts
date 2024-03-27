import * as fs from "fs";
import get from "lodash.get";
import { Browser, Page } from "puppeteer";

import { screenshotDir, tmpDir } from "./configs";

import { ActionError } from "./actionUtils";
import { actionCount } from "./actions/count";
import {
  actionUpdoxDownloadUnreadItems,
  actionUpdoxGetInboxUnreadItems,
  actionUpdoxGetTrashUnreadItems,
} from "./actions/updox";
import { getBrowser, getPage, resolveElement } from "./browser";
import { tracer } from "./powertools/utilities";
import { TAction, TActionConfigs, TContext, TElemConfigs } from "./types";

export function resolveStringTemplate(
  stringTemplate: string,
  obj: Record<string, any>
) {
  const matchedKeys = stringTemplate.match(/{[\w\- ]+}/g) || [];
  let res = `${stringTemplate}`;
  let key;

  for (key of matchedKeys) {
    const actualKey = key.slice(1, -1);

    res = res.replace(
      new RegExp(key, "gi"),
      obj[actualKey] || `<${actualKey}>`
    );
  }

  return res;
}

const _resolveConfigTemplate = (config: TActionConfigs, ctx: TContext) => {
  const targetElem = { ...config.targetElem };

  if (targetElem.selector != null) {
    targetElem.selector = resolveStringTemplate(targetElem.selector, ctx.data);
  }

  if (targetElem.value) {
    targetElem.value = resolveStringTemplate(targetElem.value, ctx.data);
  }

  return {
    ...config,
    targetElem,
  };
};

export const _dummyTarget: TElemConfigs = { selector: "", type: "Selector" };

// const _getPage = async (
//   configs: TActionConfigs,
//   ctx: TContext
// ): Promise<Page> => {
//   const { pageIndex = 0, parentAlias } = configs;

//   const browser = await getBrowser();
//   const page = parentAlias
//     ? ctx.elemStore[parentAlias]
//     : (await browser.pages())[pageIndex];

//   return page;
// };

const _navigate = async (configs: TActionConfigs, ctx: TContext) => {
  const page = await getPage(configs, ctx);
  const { url = "" } = configs;

  await page.goto(url, { waitUntil: "networkidle2" });
  // await Promise.all([
  //   ,
  //   page.waitForNavigation({
  //     waitUntil: "networkidle2",
  //   }),
  // ]);

  return page;
};
const _type = async (configs: TActionConfigs, ctx: TContext) => {
  const { targetElem } = configs;
  const page = await getPage(configs, ctx);

  try {
    const { selector, value, JSONPath = [] } = targetElem;
    const elem = await _wait(configs, ctx);

    await elem.click({ clickCount: 4 });
    await page.type(
      selector,
      `${value != null ? value : String(get(ctx.data, JSONPath, ""))}`
    );
  } catch (e) {
    e instanceof Error && console.log("_type", e.message);
    throw e;
  }
};
const _click = async (configs: TActionConfigs, ctx: TContext) => {
  const { targetElem } = configs;
  const page = await getPage(configs, ctx);

  try {
    if (targetElem.existedAlias) {
      console.log(ctx.elemStore[targetElem.existedAlias]);
      await ctx.elemStore[targetElem.existedAlias].click();
      return;
    }

    await _wait(configs, ctx);
    await page.evaluate((targetElem_: TElemConfigs) => {
      if (targetElem_.type === "XPath") {
        const htmlElement = document?.evaluate(
          targetElem_.selector,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;

        if (targetElem_.extraInfo === "click_active_checkbox") {
          const isChecked = htmlElement?.checked;
          if (isChecked) return;
        }

        htmlElement?.click();
      } else {
        const htmlElement = document?.querySelector(targetElem_.selector);

        if (targetElem_.extraInfo === "click_active_checkbox") {
          const isChecked = htmlElement?.checked;
          if (isChecked) return;
        }

        htmlElement?.click();
      }
    }, targetElem);
  } catch (e) {
    e instanceof Error && console.log("_click", e.message);
    throw e;
  }
};

const _hover = async (configs: TActionConfigs, ctx: TContext) => {
  const { targetElem } = configs;
  const page = await getPage(configs, ctx);

  try {
    await _wait(configs, ctx);
    await page.hover(targetElem.selector);
  } catch (e) {
    e instanceof Error && console.log("_hover", e.message);
    throw e;
  }
};
const _wait = async (configs: TActionConfigs, ctx: TContext) => {
  const { targetElem } = configs;
  const page = await getPage(configs, ctx);
  const element = await resolveElement(page, targetElem, ctx);

  try {
    await element.hover(this);
  } catch (e) {
    console.log(e);
  }

  return element;
};
const _upload = async (configs: TActionConfigs, ctx: TContext) => {
  const { targetElem } = configs;
  const page = await getPage(configs, ctx);
  const element = await resolveElement(page, targetElem, ctx);

  await element.uploadFile(`${tmpDir}/${targetElem.value}`);
};
const _select = async (configs: TActionConfigs, ctx: TContext) => {
  const { targetElem } = configs;
  const page = await getPage(configs, ctx);

  await page.select(targetElem.selector, targetElem.value || "");
};
const _sleep = async (configs: TActionConfigs) =>
  new Promise((r) => setTimeout(r, configs.timeout));
const _close = async (configs: TActionConfigs) => {
  const { pageIndex = 0, targetElem } = configs;
  const browser = await getBrowser();
  const page = (await browser.pages())[pageIndex];

  await page.close();
};
const _extractAttribute = async (configs: TActionConfigs, ctx: TContext) => {
  const { targetElem } = configs;
  const element = await _wait(configs, ctx);
  const page = await getPage(configs, ctx);

  // const test_elem = await page.$x(targetElem.selector);
  // const test_elem = [element];
  // console.log('test_elem', test_elem);
  // console.log(
  //   "page",
  //   await (await test_elem[0].getProperty("className")).jsonValue(),
  //   await page.evaluate(elem => elem.getAttribute("class"), element)
  // );

  const res = await page.evaluate(
    (elem, configs) => elem.getAttribute(configs.attribute),
    element,
    targetElem
  );

  ctx.data["__output"][`${targetElem.selector}_${targetElem.attribute}`] = res;
};
const _captureScreenshot = async (
  configs: TActionConfigs,
  ctx: TContext,
  retries: number,
  page?: Page
) => {
  const { pageIndex = 0, action, name } = configs;
  const { currentPhase = "" } = ctx;
  const browser = await getBrowser();
  let finalPage;
  if (page != null) {
    finalPage = page;
  } else {
    finalPage = (await browser.pages())[pageIndex];
  }
  const prefix = name ? `_${name}` : "";

  await finalPage.screenshot({
    path: `${screenshotDir}/${Date.now()}_${currentPhase}:${action}_${prefix}_${retries}.png`,
  });
  try {
    const content = await finalPage.content();
    fs.writeFileSync(
      `${screenshotDir}/${Date.now()}_${currentPhase}:${action}_${prefix}_${retries}.html`,
      content
    );
  } catch (e) {
    fs.writeFileSync(
      `${screenshotDir}/${Date.now()}_${currentPhase}:${action}_${prefix}_${retries}.no_content`,
      `Could not capture page content: ${(e as Error).message}`
    );
  }
};

const actionByType: { [key in TAction]: Function } = {
  _navigate,
  _type,
  _click,
  _hover,
  _wait,
  _upload,
  _select,
  _sleep,
  _close,
  _extractAttribute,
  count: actionCount,
  updoxGetInboxUnreadItems: actionUpdoxGetInboxUnreadItems,
  updoxGetTrashUnreadItems: actionUpdoxGetTrashUnreadItems,
  updoxDownloadUnreadItems: actionUpdoxDownloadUnreadItems,
};

function _buildProcessConfigSubsegment(
  config: TActionConfigs,
  browser: Browser,
  context: TContext
) {
  const { action } = config;

  return `${context.actionIndex || ""}:${action}`;
}

function _filterSensitiveConfigValue(config: TActionConfigs) {
  if (config.action == "_type") {
    const selector: string = config.targetElem?.selector || "";

    for (const field of ["password", "pwd", "pass"]) {
      if (selector.indexOf(field) >= 0) {
        return {
          ...config,
          targetElem: {
            ...config.targetElem,
            value: "***",
          },
        };
      }
    }
  }

  return config;
}

class Actions {
  @tracer.captureMethod()
  public async execute(
    configs: TActionConfigs[],
    context: TContext
  ): Promise<void> {
    console.log("Actions.process()");
    const browser = await getBrowser();

    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      context.actionIndex = i;
      await this.processConfig(config, browser, context);
    }
  }

  @tracer.captureMethodWithName({
    subSegmentName: _buildProcessConfigSubsegment,
    captureResponse: true,
  })
  public async processConfig(
    config: TActionConfigs,
    browser: Browser,
    context: TContext
  ) {
    const { action, waitTargetCreated } = config;
    if (actionByType[action] == null) {
      throw new ActionError(context, config, `Not support action '${action}'`);
    }

    const nav = waitTargetCreated
      ? new Promise((res) => browser.on("targetcreated", res))
      : () => {};
    const maxRetry = config.retries || 2;
    let retries = maxRetry;

    tracer.putMetadata("config", _filterSensitiveConfigValue(config));
    while (retries--) {
      try {
        context.retries = maxRetry - retries;

        const finalConfig = _resolveConfigTemplate(config, context);

        console.log(
          `Action ${action}. Retry #${maxRetry - retries}`,
          JSON.stringify(config)
        );
        const page = await actionByType[action](finalConfig, context);

        console.log(
          `Action ${action}. Retry #${maxRetry - retries} - Capture screenshot`
        );
        // await _captureScreenshot(config, context, retries, page);
        break;
      } catch (e) {
        console.error(e);
        if (e instanceof Error) {
          console.log(`Remaining tries: ${retries}`, e.message);
        }

        if (retries > 0 || config.isTolerant) continue;

        // if (action !== "_navigate") {
        //   await _captureScreenshot(config, context, retries);
        // }

        throw new ActionError(context, config, (e as Error).message);
      }
    }
    await nav;
  }
}

const actions = new Actions();
export const execute = actions.execute.bind(actions);
