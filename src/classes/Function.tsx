import { DefaultDataSet, DefaultOptions, DefaultPlotObject } from "./types";

export class Function {
    protected func: (argument: number) => number;
    protected label: string;
    protected colour: string;
    protected isSmooth: boolean;

    protected static smoothRange: number[] = [];
    protected static range: number[] = [];
    protected static isThereSmooth: boolean = false;

    constructor(func: (argument: number) => number, label: string, colour: string, isSmooth: boolean) {
        this.func = func;
        this.label = label;
        this.colour = colour;
        this.isSmooth = isSmooth;
        if(isSmooth === true){
            Function.isThereSmooth = true;
        }
    }

    static getRange(): number[]{
        return Function.range;
    }

    static getSmoothRange(): number[]{
        return Function.smoothRange;
    }

    static genRanges(start: number, finish: number, stepsNumber: number){
        Function.range = [];
        Function.smoothRange = [];
        var prev_steps_number = stepsNumber;
        if (stepsNumber > 0){
            const stepSize:number = (finish-start) / (stepsNumber-1);
            var next: number = start;
            while (stepsNumber>0){
                if (next> finish) break;
                Function.range.push(next);
                Function.smoothRange.push(next);
                next+= stepSize;
                stepsNumber-=1;
            }
        }
        if (!Function.range.includes(finish)){
            Function.range.push(finish);
            Function.smoothRange.push(finish);
        }
        // console.log("aaaaa");
        // console.log(Function.range)
        // console.log(Function.smoothRange)

        // Function.smoothRange = [start];
        stepsNumber = this.max(prev_steps_number,this.min(prev_steps_number*100,800));
        // console.log(stepsNumber)
        const stepSize:number = (finish-start) / (stepsNumber-1);
        next = start;
        while (stepsNumber>0){
            if (next> finish) break;
            if (!Function.smoothRange.includes(next)) Function.smoothRange.push(next);
            next+= stepSize;
            stepsNumber-=1;
        }
        // Function.smoothRange.push(finish);
        Function.smoothRange.sort((a:number, b:number) => (a-b));
        // console.log("!!!!")
        // console.log(Function.range.includes(5))
        // console.log(Function.smoothRange.includes(5))
    }

    static min(x: number, y: number) {
        return x < y ? x : y;
    }
    static max(x: number, y: number) {
        return x > y ? x : y;
    }

    static genDefaultOptions(): any{
        const range = Function.getRange();
        const smoothRange = Function.getSmoothRange();
        // console.log(range)
        // console.log(smoothRange)
        if (Function.isThereSmooth)
            return {
                parsing: {
                    yAxisKey: 'y',
                    xAxisKey: 'x'
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 15
                            }
                        }
                    }
                },
                scaleShowValues: true,
                scales: {

                    xAxis: {
                        ticks: {
                            callback: function (value: any, index: any, values: any) {
                                // console.log(value)
                                const v = smoothRange[value];
                                if (range.indexOf(v) !== -1){
                                    return v.toFixed(5);
                                }
                                return '';
                            },
                            // maxTicksLimit: 500,
                            autoSkip: false,
                            font: {
                                size: 14,
                            }
                        },
                    },
                    yAxes: {
                        ticks:{
                            autoSkip: false,
                        }
                    }
                }
            };
        else
        return {
            parsing: {
                yAxisKey: 'y',
                xAxisKey: 'x'
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 15
                        }
                    }
                }
            },
        };
    }

    protected genData():any{
        var rng: number[];
        var data: any[]= [];
        if (this.isSmooth){
            rng = Function.getSmoothRange();
        }else{
            rng = Function.getRange();
        }
        // console.log(Function.getSmoothRange())
        for (let i = 0; i < rng.length; i++) {
            data.push({x: rng[i].toFixed(5), y: parseFloat(this.func(rng[i]).toFixed(5))});
            // console.log(rng[i].toFixed(5), this.func(rng[i]).toFixed(5))
        }
        // console.log(data)
        return data;
    }

    public getPlotObject(): DefaultDataSet {
        const dataset: DefaultDataSet = {
            function: this.func,
            label: this.label,
            borderColor: this.colour,
            data: this.genData(),
            fill: false,
            pointRadius: this.isSmooth ? 0 : 3,
            spanGaps: !this.isSmooth
        };

        return dataset;
    }
}
