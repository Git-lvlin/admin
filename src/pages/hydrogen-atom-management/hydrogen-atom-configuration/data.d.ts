export type activityItem={
    id:number;
    buyType: number;
    suggestCommission: number;
    agentCompanyCommission: number;
    businessDeptCommission: number;
    provinceAgentCommission: number;
    cityAgentCommission: number;
    divideExplain: string
}

export type buyConfigItem={
    id:number;
    commission: string;
    describe: string;
    DividedAmount: number;
    IntoThat: string
}

export type detailItem={
    salePrice:number;
}

export type rentDetailItem={
    startMoney:number;
    useTime:number;
    deposit:number;
    firstRentDay:number;
    monthRentMoney:number;
    firstFreeRentDay:number;
    autoConfirmTime:number;
    exceedStopDay:number
}