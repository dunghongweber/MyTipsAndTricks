/*
  Add label on Chart in React Chart JS
  Must install the label plugin and import then register it
  https://stackoverflow.com/questions/68046847/adding-data-labels-inside-charts-in-reactjs-is-not-working

  modify the labels position, font style, color, etc.
  https://codesandbox.io/s/8ljzzkn3v8?file=/src/index.js:1259-1409
*/
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

const options = {
  plugins: {
    datalabels: {
      formatter: function(value, context) {
        return context.chart.data.labels[context.dataIndex];
      },
      align: "top",
      anchor: "center",
      offset: 25,
      padding: -2,
      color: 'white',
      clip: true,
      font: {
        size: "16",
        weight: "bold"
      }
    }
  }
};

return <HorizontalBar data={data} options={options} />
