import { Generator } from "./Generator";

export class SmoothFunction {
    private func: (argument: number, x0: number, y0: number) => any;
    private label: string;
    private colour: string;
    public isSmooth: boolean = true;

    private data: number[] = [];
    private generator = new Generator();

    constructor(func: (argument: number, x0: number, y0: number) => any, label: string, colour: string) {
        this.func = func;
        this.label = label;
        this.colour = colour;
    }

    public generatedData(x: number): any {
        const y = this.data.find((obj: any) => obj.x.toFixed(5) === x.toFixed(5));
        return y || null;
    }


    public genData(start: number, finish: number, stepsNumber: number, y0: number): any {
        var data: any[] = [];
        var smoothRange = this.generator.genSmoothRange(start, finish, stepsNumber);

        for (let i = 0; i < smoothRange.length; i++) {
            data.push({ x: smoothRange[i].toFixed(5), y: parseFloat(this.func(smoothRange[i], start, y0).toFixed(5)) });
        }

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
                data.push({ x: smoothRange[i].toFixed(5), y: parseFloat(this.func(smoothRange[i], x0, y0).toFixed(5)) });
            }
        }
        return {
            label: this.label,
            borderColor: this.colour,
            data: data,
            fill: false,
            pointRadius: 0,
        };
    }
}
