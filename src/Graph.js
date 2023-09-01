import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Graph(props) {
  const // destructuring objects
    { data } = props,
    // make array into an array that just has the invoice amounts
    prices = data.map((d) => d.Invoice),
    // create options needed for graph - https://www.highcharts.com/demo
    options = {
      chart: {
        type: "scatter", // column, spline, area, bar, scatter, etc.
      },
      title: {
        text: "Invoices",
      },
      series: [
        {
          name: "Invoice",
          data: prices,
        },
      ],
    };
  console.log(
    "props",
    props,
    "data",
    data,
    "prices",
    prices,
    "options",
    options
  );

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default Graph;
