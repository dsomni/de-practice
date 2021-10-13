import { SmoothFunction } from "./SmoothFunction";

export class ErrorGenerator {
    private smoothFunction: SmoothFunction;

    constructor(smoothFunction: SmoothFunction) {
        this.smoothFunction = smoothFunction;
    }


    public genData(approxFuncData: any, x0: number, y0: number): any {
        var data: any[] = [];
        var approxFuncDataset: any = approxFuncData.data;
        if (approxFuncDataset) {
            approxFuncDataset.forEach((obj: any) => {
                let x = parseFloat(obj.x);
                let y = obj.y;
                data.push({
                    x: obj.x,
                    y: Math.abs(y - this.smoothFunction.generatedDataInitValues(x, x0, y0))
                });
            });
            approxFuncData.data = data;
        }
        return approxFuncData;
    }
}