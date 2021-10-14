import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import ComputationalBoundsNav from '../components/ComputationalBoundsNav';
import InitialValueNav from '../components/InitialValueNav';
import { Generator } from '../classes/Generator';
import { ErrorGenerator } from '../classes/ErrorGenerator';
import StepsNumberBoundsNav from '../components/StepsNumberBoundsNav';
import { ChartWrapper, GlobalWrapper, NavsWrapper, TitleWrapper } from '../styles';
import { Euler, ImprovedEuler, Runge_Kutta, actualFunction } from '../common/functions';

function genData(lowerBound: number, upperBound: number, minStepNumber: number, maxStepNumber: number, y0: number) {
    if (lowerBound >= upperBound || minStepNumber > maxStepNumber) return { labels: [], datasets: [] };
    var datasets: any[] = [];
    funcs.forEach(func => {
        let preDataSet: any = [];

        for (let stepsNumber = minStepNumber; stepsNumber <= maxStepNumber; stepsNumber++) {
            var range = generator.genRange(lowerBound, upperBound, stepsNumber);
            preDataSet.push({
                datasets: errorGenerator.genData(func.genDataRange(range, y0), lowerBound, y0),
                stepsNumber: stepsNumber
            })
        }
        datasets.push(errorGenerator.extractMaxError(preDataSet));
    });
    return { labels: [], datasets: datasets };
}

function genOptions(lowerBound: number, upperBound: number, stepNumber: number, useSmooth: boolean) {
    return generator.genOptions(lowerBound, upperBound, stepNumber, useSmooth);
}

// /* Functions & Co */
const generator = new Generator();
const errorGenerator = new ErrorGenerator(actualFunction);

var funcs = [Euler, ImprovedEuler, Runge_Kutta];

const MaxErrorChart: React.FunctionComponent = () => {


    /* Step Number & Co */
    // Lower Bound Step Value
    const [minStepNumber, setMinStepNumber] = useState(2);
    const minStepNumberChanged = (e: any) => {
        const val = max(2, parseInt(e.target.value));
        setMinStepNumber(val);
        if (maxStepNumber < val) maxStepNumberChanged({ target: { value: val } });
        setData(genData(lowerBound, upperBound, val, maxStepNumber, initialValue))
    }
    // Upper Bound Step Value
    const [maxStepNumber, setMaxStepNumber] = useState(10);
    const maxStepNumberChanged = (e: any) => {
        const val = min(4000000, parseInt(e.target.value));
        setMaxStepNumber(val);
        if (minStepNumber > val) minStepNumberChanged({ target: { value: val } });
        setData(genData(lowerBound, upperBound, minStepNumber, val, initialValue))
    }

    /* Computational Bounds & Co */
    // Lower Computational Bound
    const [lowerBound, setLowerBound] = useState(1);
    const lowerBoundChanged = (e: any) => {
        if (e.target.value) {
            const val = max(-400000000, parseFloat(e.target.value));
            setLowerBound(val);
            if (upperBound < val) upperBoundChanged({ target: { value: val } });
            setData(genData(val, upperBound, minStepNumber, maxStepNumber, initialValue))
        } else {
            setLowerBound(0);
            if (upperBound < 0) upperBoundChanged({ target: { value: 0 } });
            setData(genData(0, upperBound, minStepNumber, maxStepNumber, initialValue))
        }
    }
    // Upper Computational Bound
    const [upperBound, setUpperBound] = useState(10);
    const upperBoundChanged = (e: any) => {
        if (e.target.value) {
            const val = min(400000000, parseFloat(e.target.value));
            setUpperBound(val);
            if (lowerBound > val) lowerBoundChanged({ target: { value: val } });
            setData(genData(lowerBound, val, minStepNumber, maxStepNumber, initialValue));
        } else {
            setUpperBound(0);
            if (lowerBound > 0) lowerBoundChanged({ target: { value: 0 } });
            setData(genData(lowerBound, 0, minStepNumber, maxStepNumber, initialValue));
        }
    }

    /* Initial Value & Co */
    const [initialValue, setInitialValue] = useState(0);
    const initialValueChanged = (e: any) => {
        const val = max(-400000000, parseFloat(e.target.value));
        setInitialValue(val);
        setData(genData(lowerBound, upperBound, minStepNumber, maxStepNumber, val));
    }

    // /* Data & Co */
    const [data, setData] = useState(genData(lowerBound, upperBound, minStepNumber, maxStepNumber, initialValue));


    return (
        <>
            <GlobalWrapper>
                <NavsWrapper>
                    <TitleWrapper>Maximum Error Chart</TitleWrapper>
                    <StepsNumberBoundsNav
                        label={'Steps Number'}
                        onChangeUpperBound={(e: any) => maxStepNumberChanged(e)}
                        onChangeLowerBound={(e: any) => minStepNumberChanged(e)}
                        upperBound={maxStepNumber}
                        lowerBound={minStepNumber}
                    />
                    <ComputationalBoundsNav
                        label={'Bounds'}
                        onChangeUpperBound={(e: any) => upperBoundChanged(e)}
                        onChangeLowerBound={(e: any) => lowerBoundChanged(e)}
                        upperBound={upperBound}
                        lowerBound={lowerBound} />
                    <InitialValueNav
                        label={'Initial value'}
                        onChange={(e: any) => initialValueChanged(e)}
                        value={initialValue} />
                </NavsWrapper>
                <ChartWrapper>
                    <Line data={data} options={genOptions(lowerBound, upperBound, minStepNumber, false)} />
                </ChartWrapper>
            </GlobalWrapper>
        </>
    );
};

export default MaxErrorChart;


function min(x: number, y: number) {
    return x < y ? x : y;
}
function max(x: number, y: number) {
    return x > y ? x : y;
}

