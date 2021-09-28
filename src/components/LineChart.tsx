import styled from '@emotion/styled';
import { Chart } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Country, DefaultPlotData } from '../types';
import zoomPlugin from 'chartjs-plugin-zoom'
import { useState } from 'react';

function genRange(start: number, finish: number, n: number) {
    const h = (finish - start) / n;
    var arr: number[] = [];
    var value = start;
    while (value < finish) {
        arr.push(parseFloat(value.toFixed(10)));
        value += h;
    }
    return arr;
}

Chart.register(zoomPlugin);
const data: DefaultPlotData = {
    labels: genRange(1, 51, 1000),
    datasets: [{
        label: "f(x) = x",
        function: function (x: any) { return x },
        borderColor: "rgba(75, 192, 192, 1)",
        data: [],
        fill: false
    },
    {
        label: "f(x) = x²",
        function: function (x: number) { return x * x },
        borderColor: "rgba(153, 102, 255, 1)",
        data: [],
        fill: false
    },
    {
        label: "f(x) = x * log(x)",
        function: function (x: number) { return x * Math.log(x) },
        borderColor: "rgba(255, 206, 86, 1)",
        data: [],
        fill: false
    }]
};
const zoomOptions = {
    pan: {
      enabled: true,
      mode: 'xy',
      threshold: 5,
    },
    zoom: {
      wheel: {
        enabled: true
      },
      pinch: {
        enabled: true
      },
      mode: 'xy',
    },
};
const options: any = {
    radius: 0,
    interaction: {
        intersect: false
      },
    // plugins: {
    //     zoom: zoomOptions,
    // }

};

function genDatasets(data: DefaultPlotData) {
    for (var i = 0; i < data.datasets.length; i++) {

        for (var j = 0; j < data.labels.length; j++) {
            var fct = data.datasets[i].function,
                x = data.labels[j],
                y = fct(x);
            data.datasets[i].data.push(y);
        }
    }
}


const ChartWrapper = styled.div`
    max-width: 1024px;
    margin: 0 auto;
`;

const LineChart: React.FunctionComponent = () => {

    genDatasets(data);
    return (
        <ChartWrapper>
            <Line data={data} options={options} />
        </ChartWrapper>
    );
};

export default LineChart;
