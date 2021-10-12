export class Generator {
    min(x: number, y: number) {
        return x < y ? x : y;
    }
    max(x: number, y: number) {
        return x > y ? x : y;
    }

    public genRange(start: number, finish: number, stepsNumber: number): number[] {
        var range: number[] = [];
        const stepSize: number = (finish - start) / (stepsNumber - 1);
        if (stepSize <=0){
            return [];
        }
        var next: number = start;
        while (stepsNumber > 0) {
            if (next > finish) break;
            range.push(next);
            next += stepSize;
            stepsNumber -= 1;
        }
        // if (!range.includes(parseFloat(finish.toFixed(5)))) {
        //     range.push(finish);
        // }
        return range;
    }

    public genSmoothRange(start: number, finish: number, stepsNumber: number): number[] {
        var smoothRange: number[] = [];
        var smoothStepsNumber = this.max(stepsNumber, this.min(stepsNumber * 100, 800));
        // var smoothStepsNumber = 10;
        const stepSize: number = (finish - start) / (stepsNumber - 1);
        if (stepSize <=0){
            return [];
        }
        var next: number = start;
        while (stepsNumber > 0) {
            if (next > finish) break;
            smoothRange.push(next);
            next += stepSize;
            stepsNumber -= 1;
        }
        // if (!smoothRange.includes(parseFloat(finish.toFixed(5)))) {
        //     smoothRange.push(finish);
        // }

        const smoothStepSize: number = (finish - start) / (smoothStepsNumber - 1);
        next = start;
        while (smoothStepsNumber > 0) {
            if (next > finish) break;
            if (!smoothRange.includes(next)) smoothRange.push(next);
            next += smoothStepSize;
            stepsNumber -= 1;
        }
        smoothRange.sort((a: number, b: number) => (a - b));

        return smoothRange;

    }

    public genOptionsRanges(range: number[], smoothRange: number[], useSmooth: boolean): any{
        if (useSmooth)
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
                            const v = smoothRange[value];
                            if (range.indexOf(v) !== -1){
                                return v.toFixed(5);
                            }
                            return '';
                        },
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

    public genOptions(start: number, finish: number, stepsNumber: number, useSmooth: boolean): any{
        const smoothRange = this.genSmoothRange(start, finish, stepsNumber);
        const range = this.genRange(start, finish, stepsNumber);
        if (useSmooth)
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
                            const v = smoothRange[value];
                            if (range.indexOf(v) !== -1){
                                return v.toFixed(5);
                            }
                            return '';
                        },
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
}