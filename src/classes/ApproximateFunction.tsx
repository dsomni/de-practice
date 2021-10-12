import { Generator } from "./Generator";

export class ApproximateFunction {
    private func_to_approx: (x: number, y: number) => number; //f(x,y)
    private gen_function: (x: number, y: number, stepSize: number) => number;
    private label: string;
    private colour: string;
    public isSmooth: boolean = false;

    private data: number[] = [];
    private generator = new Generator();

    constructor(func_to_approx: (x: number, y: number) => number,
        gen_function: (x: number, y: number, stepSize: number) => number,
        label: string, colour: string) {
        this.func_to_approx = func_to_approx;
        this.gen_function = gen_function;
        this.label = label;
        this.colour = colour;
    }

    public generatedData(x: number): any {
        const y = this.data.find((obj: any) => obj.x.toFixed(5) === x.toFixed(5));
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
            x: x.toFixed(5),
            y: parseFloat(y.toFixed(5))
        })

        while (x<finish){
            y = this.gen_function(x, y, stepSize);
            x += stepSize;
            data.push({
                x: x.toFixed(5),
                y: parseFloat(y.toFixed(5))
            })
        }

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
        var x = range[0];
        var y = y0;
        data.push({
            x: x.toFixed(5),
            y: parseFloat(y.toFixed(5))
        })

        for (let i = 1; i < range.length; i++) {
            data.push({
                x: x.toFixed(5),
                y: this.gen_function(range[i], y, stepSize)
            })
        }

        return {
            label: this.label,
            borderColor: this.colour,
            data: data,
            fill: false,
            pointRadius: 3,
            spanGaps: true
        };
    }
}
