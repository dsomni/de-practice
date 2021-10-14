import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import StepsNumberNav from '../components/StepsNumberNav';
import ComputationalBoundsNav from '../components/ComputationalBoundsNav';
import InitialValueNav from '../components/InitialValueNav';
import { Generator } from '../classes/Generator';
import { ChartWrapper, GlobalWrapper, NavsWrapper, TitleWrapper } from '../styles';
import { actualFunction, Euler, ImprovedEuler, Runge_Kutta } from '../common/functions';

function genData(lowerBound: number, upperBound: number, stepNumber: number, y0: number) {
    if (lowerBound >= upperBound) return { labels: [], datasets: [] };
    var range = generator.genRange(lowerBound, upperBound, stepNumber);
    var smoothRange = generator.genSmoothRange(lowerBound, upperBound, stepNumber);

    var datasets: any[] = [];
    funcs.forEach(func => {
        if (func.isSmooth) datasets.push(func.genDataRange(smoothRange, y0))
        else datasets.push(func.genDataRange(range, y0));
    });
    return { labels: [], datasets: datasets };
}

function genOptions(lowerBound: number, upperBound: number, stepNumber: number, useSmooth: boolean) {
    return generator.genOptions(lowerBound, upperBound, stepNumber, useSmooth);
}

// /* Functions & Co */
const generator = new Generator();

var funcs = [actualFunction, Euler, ImprovedEuler, Runge_Kutta];

const MainChart: React.FunctionComponent = () => {


    /* Step Number & Co */
    // Step Number
    const [stepNumber, setStepNumber] = useState(5);
    const stepNumberChanged = (val: any) => {
        setData(genData(lowerBound, upperBound, val, initialValue));
        setStepNumber(val);
    };
    // Lower Bound Step Value
    const [minStepNumber, setMinStepNumber] = useState(2);
    const minStepNumberChanged = (e: any) => {
        const val = max(2, parseInt(e.target.value));
        setMinStepNumber(val);
        if (maxStepNumber < val) maxStepNumberChanged({ target: { value: val + 1 } });
        if (stepNumber < val) stepNumberChanged(val);
    }
    // Upper Bound Step Value
    const [maxStepNumber, setMaxStepNumber] = useState(10);
    const maxStepNumberChanged = (e: any) => {
        const val = min(1000, parseInt(e.target.value));
        setMaxStepNumber(val);
        if (minStepNumber > val) minStepNumberChanged({ target: { value: val - 1 } });
        if (stepNumber > val) stepNumberChanged(val);
    }

    /* Computational Bounds & Co */
    // Lower Computational Bound
    const [lowerBound, setLowerBound] = useState(1);
    const lowerBoundChanged = (e: any) => {
        if (e.target.value) {
            const val = max(-400000000, parseFloat(e.target.value));
            setLowerBound(val);
            if (upperBound < val) upperBoundChanged({ target: { value: val } });
            setData(genData(val, upperBound, stepNumber, initialValue))
        } else {
            setLowerBound(0);
            if (upperBound < 0) upperBoundChanged({ target: { value: 0 } });
            setData(genData(0, upperBound, stepNumber, initialValue))
        }
    }
    // Upper Computational Bound
    const [upperBound, setUpperBound] = useState(10);
    const upperBoundChanged = (e: any) => {
        if (e.target.value) {
            const val = min(400000000, parseFloat(e.target.value));
            setUpperBound(val);
            if (lowerBound > val) lowerBoundChanged({ target: { value: val } });
            setData(genData(lowerBound, val, stepNumber, initialValue));
        } else {
            setUpperBound(0);
            if (lowerBound > 0) lowerBoundChanged({ target: { value: 0 } });
            setData(genData(lowerBound, 0, stepNumber, initialValue));
        }
    }

    /* Initial Value & Co */
    const [initialValue, setInitialValue] = useState(0);
    const initialValueChanged = (e: any) => {
        const val = max(-400000000, parseFloat(e.target.value));
        setInitialValue(val);
        setData(genData(lowerBound, upperBound, stepNumber, val));
    }

    // /* Data & Co */
    const [data, setData] = useState(genData(lowerBound, upperBound, stepNumber, initialValue));


    return (
        <>
            <GlobalWrapper>
                <NavsWrapper>
                    <TitleWrapper>Main Chart</TitleWrapper>
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
                    <InitialValueNav
                        label={'Initial value'}
                        onChange={(e: any) => initialValueChanged(e)}
                        value={initialValue} />
                </NavsWrapper>
                <ChartWrapper>
                    <Line data={data} options={genOptions(lowerBound, upperBound, stepNumber, true)} />
                </ChartWrapper>
            </GlobalWrapper>
        </>
    );
};

export default MainChart;


function min(x: number, y: number) {
    return x < y ? x : y;
}
function max(x: number, y: number) {
    return x > y ? x : y;
}

