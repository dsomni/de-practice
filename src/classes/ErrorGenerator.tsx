import { SmoothFunction } from "./SmoothFunction";

export class ErrorGenerator {
    private smoothFunction: SmoothFunction;

    constructor(smoothFunction: SmoothFunction) {
        this.smoothFunction = smoothFunction;
    }

    min(x: number, y: number) {
        return x < y ? x : y;
    }
    max(x: number, y: number) {
        return x > y ? x : y;
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

    public extractMaxError(sets: any){
        var data: any[] = [];
        if (sets.length === 0) return [];
        sets.forEach((set:any) => {
            let funcData = set.datasets.data;
            let y = 0;
            if(!funcData) return [];
            funcData.forEach((obj: any) => {
                y = this.max(y, obj.y);
            });
            data.push({
                x: set.stepsNumber.toString(),
                y: y
            });
        });
        let dataset = sets[0].datasets;
        dataset.data = data;
        return dataset;
    }
}