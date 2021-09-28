import { Line } from "react-chartjs-2";
import { AbstractPlot } from "./abstractClasses";
import { DefaultPlotData } from "./types";

export class LineFunction extends AbstractPlot{
    constructor(data: DefaultPlotData) {
        const options = {
            plugins: {
                legend: {
                    display: false,
                },
            },
        };
        super(data, options);
    }
}