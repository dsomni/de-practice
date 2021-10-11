import styled from '@emotion/styled';
import { Chart } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Country, DefaultDataSet } from '../classes/types';
import zoomPlugin from 'chartjs-plugin-zoom'
import { ClassAttributes, HTMLAttributes, ReactChild, ReactFragment, ReactPortal, useCallback, useMemo, useState } from 'react';
import ReactSlider from 'react-slider';
import RangeSlider from './RangeSlider';
import InputField from './InputField';
import StepsNumberNav from './StepsNumberNav';
import ComputationalBoundsNav from './ComputationalBoundsNav';
import { Function } from '../classes/Function';
import { parse } from 'path';

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

// Chart.register(zoomPlugin);
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

const NavsWrapper = styled.div`
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
`;


var QuadraticFunction = new Function((x:number) => {return x*x;}, "f(x)=x^2", "rgb(255,0,0)",true);
var LogFunction = new Function((x:number) =>   {return x * Math.log(x);} , "f(x)=x*log(x)", "rgb(0,255,0)",false);
var LinearFunction = new Function((x:number) =>   {return x;}  , "f(x)=x", "rgb(0,0,255)",false);

var funcs: Function[] = [QuadraticFunction, LogFunction, LinearFunction];

function genData2(start:number, finish:number, stepsNumber: number){
    Function.genRanges(start, finish, stepsNumber);
    var datasets: any[] = [];
    funcs.forEach(func => {
        datasets.push(func.getPlotObject());
    });
    // console.log(datasets)
    return {labels: Function.getSmoothRange(),datasets: datasets};
};

function genOptions2(start:number, finish:number, stepsNumber: number){
    Function.genRanges(start, finish, stepsNumber);
    // console.log(Function.genDefaultOptions())
    return Function.genDefaultOptions();
}

const LineChart: React.FunctionComponent = () => {

    // const [data, setData] = useState(genDatasets(genData(10)));

    /* Step Number & Co */
    // Step Number
    const [stepNumber, setStepNumber] = useState(5);
    const stepNumberChanged = (val: any) => {
        // setData(genDatasets(genData(val)));
        setData(genData2(lowerBound, upperBound, val));
        setStepNumber(val);
    };
    // Lower Bound Step Value
    const [minStepNumber, setMinStepNumber] = useState(2);
    const minStepNumberChanged = (e: any) => {
        const val = max(2, parseInt(e.target.value));
        setMinStepNumber(val);
        if (stepNumber < val) stepNumberChanged(val);
    }
    // Upper Bound Step Value
    const [maxStepNumber, setMaxStepNumber] = useState(10);
    const maxStepNumberChanged = (e: any) => {
        const val = min(1000, parseInt(e.target.value));
        setMaxStepNumber(val);
        if (stepNumber > val) stepNumberChanged(val);
    }

    /* Computational Bounds & Co */
    // Lower Computational Bound
    const [lowerBound, setLowerBound] = useState(1);
    const lowerBoundChanged = (e: any) => {
        const val = max(0, parseFloat(e.target.value));
        setLowerBound(val);
        if (upperBound < val) upperBoundChanged(val);
        setData(genData2(val, upperBound, stepNumber))
    }
    // Upper Computational Bound
    const [upperBound, setUpperBound] = useState(5);
    const upperBoundChanged = (e: any) => {
        const val = min(4000000000, parseFloat(e.target.value));
        setUpperBound(val);
        if (lowerBound > val) lowerBoundChanged(val);
        setData(genData2(lowerBound, val, stepNumber))
    }

    // /* Data & Co */
    const [data, setData] = useState(genData2(lowerBound, upperBound, stepNumber));
    // options={genOptions2(lowerBound, upperBound, stepNumber)}
    return (
        <>
            <ChartWrapper>
                <Line data={data}   options={genOptions2(lowerBound, upperBound, stepNumber)}/>
                {/* <Line data={data}/> */}
            </ChartWrapper>
            <NavsWrapper>
                <StepsNumberNav
                    label={'N'}
                    onChangeN={(e: any) => stepNumberChanged(e)}
                    onChangeMaxN={(e: any) => maxStepNumberChanged(e)}
                    onChangeMinN={(e: any) => minStepNumberChanged(e)}
                    value={stepNumber}
                    maxVal={maxStepNumber}
                    minVal={minStepNumber} />
                <ComputationalBoundsNav
                    label={'Bounds'}
                    onChangeUpperBound={(e: any) => upperBoundChanged(e)}
                    onChangeLowerBound={(e: any) => lowerBoundChanged(e)}
                    upperBound={upperBound}
                    lowerBound={lowerBound} />
            </NavsWrapper>
        </>
    );
};

export default LineChart;


function min(x: number, y: number) {
    return x < y ? x : y;
}
function max(x: number, y: number) {
    return x > y ? x : y;
}

