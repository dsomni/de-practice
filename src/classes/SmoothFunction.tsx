import { AbstractFunction } from "./AbstractFunction";

export class SmoothFunction extends AbstractFunction {
    private func: (argument: number, x0: number, y0: number) => any;

    constructor(func: (argument: number, x0: number, y0: number) => any, label: string, colour: string) {
        super(label, colour, true);
        this.func = func;
    }

    public generatedData(x: number): any {
        const y = this.data.find((obj: any) => obj.x.toFixed(this.precision) === x.toFixed(this.precision));
        return y || null;
    }

    public generatedDataInitValues(x: number, x0: number, y0: number): any {
        return this.func(x, x0, y0);
    }


    public genData(start: number, finish: number, stepsNumber: number, y0: number): any {
        var data: any[] = [];
        var smoothRange = this.generator.genSmoothRange(start, finish, stepsNumber);

        for (let i = 0; i < smoothRange.length; i++) {
            data.push({ x: smoothRange[i].toFixed(this.precision), y: parseFloat(this.func(smoothRange[i], start, y0).toFixed(this.precision)) });
        }
        this.data = data;
        return {
            label: this.label,
            borderColor: this.colour,
            data: data,
            fill: false,
            pointRadius: 0,
        };
    }

    public genDataRange(smoothRange: number[], y0: number): any {
        var data: any[] = [];
        if (smoothRange.length > 0) {
            var x0 = smoothRange[0];
            for (let i = 0; i < smoothRange.length; i++) {
                data.push({ x: smoothRange[i].toFixed(this.precision), y: parseFloat(this.func(smoothRange[i], x0, y0).toFixed(this.precision)) });
            }
        }
        this.data = data;
        return {
            label: this.label,
            borderColor: this.colour,
            data: data,
            fill: false,
            pointRadius: 0,
        };
    }
}
