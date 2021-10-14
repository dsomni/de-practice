import { AbstractFunction } from "./AbstractFunction";

export class ApproximateFunction extends AbstractFunction {
    private gen_function: (x: number, y: number, stepSize: number) => number;

    constructor(
        gen_function: (x: number, y: number, stepSize: number) => number,
        label: string, colour: string) {
        super(label, colour, false);
        this.gen_function = gen_function;
    }

    public generatedData(x: number): any {
        const y = this.data.find((obj: any) => obj.x.toFixed(this.precision) === x.toFixed(this.precision));
        return y || null;
    }


    public genData(start: number, finish: number, stepsNumber: number, y0: number): any {
        var data: any[] = [];
        const stepSize: number = (finish - start) / (stepsNumber - 1);
        if (stepSize <=0){
            return [];
        }

        var x = start;
        var y = y0;
        data.push({
            x: x.toFixed(this.precision),
            y: parseFloat(y.toFixed(this.precision))
        })

        while (x<finish){
            y = this.gen_function(x, y, stepSize);
            x += stepSize;
            data.push({
                x: x.toFixed(this.precision),
                y: parseFloat(y.toFixed(this.precision))
            })
        }
        this.data = data;
        return {
            label: this.label,
            borderColor: this.colour,
            data: data,
            fill: false,
            pointRadius: 3,
            spanGaps: true
        };
    }

    public genDataRange(range: number[], y0: number): any {
        var data: any[] = [];

        if (range.length < 2){
            return [];
        }
        const stepSize: number = range[1] - range[0];
        if (stepSize<= 0){
            return [];
        }
        var x = range[0];
        var y = y0;
        data.push({
            x: x.toFixed(this.precision),
            y: parseFloat(y.toFixed(this.precision))
        })

        for (let i = 1; i < range.length; i++) {
            y = this.gen_function(range[i-1], y, stepSize);
            data.push({
                x: range[i].toFixed(this.precision),
                y: y
            })
        }
        this.data = data;
        return {
            label: this.label,
            borderColor: this.colour,
            data: data,
            fill: false,
            pointRadius: 4,
            spanGaps: true
        };
    }
}
