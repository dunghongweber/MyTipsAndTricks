"""
    Process raw email to get the email attachment then upload to S3 bucket
"""
import os
import email
from aws_lambda_powertools import Tracer
from aws_lambda_powertools.utilities.typing import LambdaContext

import sentry_sdk
from tp7_common.utils.sentry_utils import init_sentry
from tp7_common.utils.sqs_params_utils import sqs_params_or_direct
from tp7_common.utils.s3_utils2 import s3_upload_file
from tp7_pr_pipeline.pipeline_download_pdf import (
    pipeline_download_pdf,
)


TEMP_FOLDER = "/tmp"


tracer = Tracer()
init_sentry()


def get_output_bucket():
    current_environment = os.environ["SUB_ENV"]
    if "iowa" in current_environment:
        return "tp7-pr-iowa-pr-iowa-input"
    else:
        return "tp7-pr-iowa-pr-dev2-input"


def _build_records(event):
    ret = []
    for item in sqs_params_or_direct(event):
        for record in item["Records"]:
            ret.append(record)

    return ret


@tracer.capture_lambda_handler()
def email_attachment(event: dict, context: LambdaContext):
    tracer.put_metadata("event", event)

    print(f"=====AWS event: {event}")

    for record in _build_records(event):
        s3 = record["s3"]
        bucket_name = s3["bucket"]["name"]
        file_name = s3["object"]["key"]
        s3_url = f"s3://{bucket_name}/{file_name}"
        pdf_path = pipeline_download_pdf(s3_url)
        print(f"=====AWS Record: {record}")
        print(f"=====bucket_name: {bucket_name}\tpdf_path: {pdf_path}")

        _email_attachment_iowa(eml_path=pdf_path)


def _email_attachment_iowa(eml_path: str):
    try:
        # convert file extension to eml
        pre, ext = os.path.splitext(eml_path)
        os.rename(eml_path, pre + ".eml")

        eml_path = eml_path + ".eml"
        process_email_file(eml_path)

    except Exception as e:
        sentry_sdk.capture_exception()
        print(f"===error: {e}")
        raise


def process_email_file(email_file):
    try:
        with open(email_file, "rb") as f:
            msg = email.message_from_binary_file(f)

        for part in msg.walk():
            content_disposition = part.get("Content-Disposition", None)
            if content_disposition and "attachment" in content_disposition.lower():
                save_attachment(part)

    except Exception as e:
        sentry_sdk.capture_exception()
        print(f"===error: {e}")
        raise


def save_attachment(part):
    """
    Save and upload attachment
    """
    BUCKET_NAME = get_output_bucket()
    filename = part.get_filename()
    if filename:
        # Get the lowercase extension
        _, file_extension = os.path.splitext(filename)
        lowercase_extension = file_extension.lower()

        # Create the new filename with lowercase extension
        new_filename = f"{os.path.splitext(filename)[0]}{lowercase_extension}"

        pdf_path = os.path.join(TEMP_FOLDER, new_filename)
        with open(pdf_path, "wb") as f:
            f.write(part.get_payload(decode=True))

        s3_upload_file(
            bucket_name=BUCKET_NAME,
            bucket_path=new_filename,
            local_path=pdf_path,
        )

        print(f"Attachment saved {new_filename} and uploaded to {BUCKET_NAME}")
