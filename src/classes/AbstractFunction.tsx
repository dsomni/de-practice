import { Generator } from "./Generator";

export abstract class AbstractFunction {
    protected label: string;
    protected colour: string;
    public isSmooth: boolean;
    protected precision: number = 5;

    protected data: number[] = [];
    protected generator = new Generator();

    constructor(label: string, colour: string, isSmooth: boolean) {
        this.label = label;
        this.colour = colour;
        this.isSmooth = isSmooth;
    }

    public generatedData(x: number): any { }

    public generatedDataInitValues(x: number, x0: number, y0: number): any { }


    public genData(start: number, finish: number, stepsNumber: number, y0: number): any { }

    public genDataRange(smoothRange: number[], y0: number): any { }
}
