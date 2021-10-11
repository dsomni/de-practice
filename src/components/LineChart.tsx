import styled from '@emotion/styled';
import { Chart } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Country, DefaultPlotData } from '../types';
import zoomPlugin from 'chartjs-plugin-zoom'
import { ClassAttributes, HTMLAttributes, ReactChild, ReactFragment, ReactPortal, useCallback, useMemo, useState } from 'react';
import ReactSlider from 'react-slider';
import RangeSlider from './RangeSlider';

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
// const data: DefaultPlotData = {
//     labels: genRange(1, 51, 1000),
//     datasets: [{
//         label: "f(x) = x",
//         function: function (x: any) { return x },
//         borderColor: "rgba(75, 192, 192, 1)",
//         data: [],
//         fill: false
//     },
//     {
//         label: "f(x) = x²",
//         function: function (x: number) { return x * x },
//         borderColor: "rgba(153, 102, 255, 1)",
//         data: [],
//         fill: false
//     },
//     {
//         label: "f(x) = x * log(x)",
//         function: function (x: number) { return x * Math.log(x) },
//         borderColor: "rgba(255, 206, 86, 1)",
//         data: [],
//         fill: false
//     }]
// };
const options: any = {
    // radius: 0,
    bezierCurve: false,
    interaction: {
        intersect: false
    },
};

const genData = (number: number) => ({
    labels: genRange(1, 51, number),
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
        fill: false,
    },
    {
        label: "f(x) = x * log(x)",
        function: function (x: number) { return x * Math.log(x) },
        borderColor: "rgba(255, 206, 86, 1)",
        data: [],
        fill: false
    }]
});

function genDatasets(data: any) {
    for (var i = 0; i < data.datasets.length; i++) {

        for (var j = 0; j < data.labels.length; j++) {
            var fct = data.datasets[i].function,
                x = data.labels[j],
                y = fct(x);
            data.datasets[i].data.push(y);
        }
    }
    return data;
}


// const dataA: any = {
//     labels: [1,2,3,4,5],
//     datasets: [{
//         label: "f(x) = x^2",
//         function: function (x: any) { return x*x },
//         borderColor: "rgba(75, 192, 192, 1)",
//         data: [1,4,9,16,25],
//         fill: false,
//         pointRadius: 0
//     },
//     {
//         label: "f(x) = x² round",
//         function: function (x: number) { return x * x },
//         borderColor: "rgba(153, 102, 255, 1)",
//         data: [1, null, 9, null, 25],
//         fill: false,
//         spanGaps: true
//     }]
// };
const labels: any = [1, 2, 3, 4, 5];
const dataB: any = {
    datasets: [{
        label: "f(x) = x^2",
        function: function (x: any) { return x * x },
        borderColor: "rgba(75, 192, 192, 1)",
        data: [{ x: "1", y: 1 }, { x: "2", y: 4 }, { x: "3", y: 9 }, { x: "4", y: 16 }, { x: "5", y: 25 }],
        fill: false,
        pointRadius: 0,
    },
    {
        label: "f(x) = x² round",
        function: function (x: number) { return x * x },
        borderColor: "rgba(153, 102, 255, 1)",
        data: [{ x: "1", y: 1 }, { x: "3", y: 9 }, { x: "5", y: 25 }],
        fill: false,
        spanGaps: true
    }]
};

const arr: any = [1, 3, 5];
const optionsB: any = {
    // radius: 0,
    parsing: {
        yAxisKey: 'y',
        xAxisKey: 'x'
    },
    scales: {
        xAxis: {
            ticks: {
                callback: function (value: any, index: any, values: any) {
                    const v = labels[value];
                    if (arr.indexOf(v) !== -1) return v;
                    return '';
                }
            }
        }
    }
};


const ChartWrapper = styled.div`
    max-width: 1024px;
    margin: 0 auto;
`;

const LineChart: React.FunctionComponent = () => {


    const [data, setData] = useState(genDatasets(genData(10)));


    const [parentVal, setParentVal] = useState(10);
    const sliderValueChanged = (val: any) => {
        // console.log("NEW VALUE", val);
        setData(genDatasets(genData(val)));
        // console.log(data)
        setParentVal(val);
    };


    const [getN, setN] = useState(50);

    const [inputN, setInputN] = useState(50);
    const inputsHandler = (e: any) => {
        console.log(e.target.value)
        setInputN(e.target.value);
        // console.log(inputN);
        setN(parseInt(e.target.value));
        sliderValueChanged(e.target.value);
    }




    return (
        <>
            <ChartWrapper>
                <Line data={data} options={options} />
            </ChartWrapper>
            <div>
                {/* <h1>PARENT VALUE: {parentVal}</h1> */}
                <RangeSlider classes="additional-css-classes"
                    label={"N"}
                    onChange={(e: any) => sliderValueChanged(e)}
                    value={parentVal}
                    min={2}
                    max={getN}
                    step={1} />
            </div>
            <input
                type="number"
                name="n"
                onChange={inputsHandler}
                value={inputN} />
        </>
    );
};

export default LineChart;

// function componentDidMount() {
//     throw new Error('Function not implemented.');
// }

