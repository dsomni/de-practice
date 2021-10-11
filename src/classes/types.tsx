export type DefaultPlotObject ={
    x: string,
    y: number
};

export type DefaultDataSet = {
    function: (argument: number) => number;
    label: string;
    borderColor: string;
    data: DefaultPlotObject[];
    fill: boolean;
    pointRadius: number;
    spanGaps: boolean;
};

export type DefaultOptions = {
    parsing: {
        yAxisKey: string;
        xAxisKey: string;
    };
    scales: {
        xAxis: {
            ticks: {
                callback: (value: any, index: any, values: any) => any;
            };
        };
    };
};


export type Country = {
    Country: string;
    CountryCode: string;
    Date: string;
    ID: string;
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    Premium: unknown;
    Slug: string;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
};

export type GlobalData = {
    Date: string,
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
};


export type ResponseData = {
    Countries: Country[];
    Date: string;
    Global: GlobalData;
    ID: string;
    Message: string;
}