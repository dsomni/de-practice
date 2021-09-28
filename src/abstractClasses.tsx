import { DefaultDataSet, DefaultPlotData } from "./types";

export abstract class AbstractFunction {
    protected func: (argument: number) => number;
    protected label: string;
    protected colour: string;

    constructor(func: (argument: number) => number, label: string, colour: string) {
        this.func = func;
        this.label = label;
        this.colour = colour;
    }

    getPlotObject(): DefaultDataSet {
        const dataset: DefaultDataSet = {
            function: this.func,
            label: this.label,
            borderColor: this.colour,
            data: [],
            fill: false,
        };

        return dataset;
    }
}

export abstract class AbstractPlot {
    protected data: DefaultPlotData;
    protected options: Object;
    protected plugins: any;

    constructor(data: DefaultPlotData, options: Object) {
        this.data = data;
        this.options = options;
    }

    generateDatasets(){}

    getPlotData(): DefaultPlotData {
        return this.data;
    };

    getPlotOptions(): Object {
        return this.options;
    };

}
