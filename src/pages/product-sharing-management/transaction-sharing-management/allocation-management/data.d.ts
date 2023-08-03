export type TableProps = {
    id: number;
    name: string;
    buyer: string;
    remark: string;
    status: number;
    orderType: number;
    subType: number;
    agreementShowType: number;
    agreementUrl: string;
    afterSale: number;
    miniProgram: number;
    orderDetailTips: string;
    contractIsSign: number;
    contractFeeBear: string;
    contractCode: string;
    billType: number;
    startTime: number;
    endTime: number;
    supplyPriceType: number;
    lastEditor: string;
    roleNum: number;
    goodsNum: number;
    platformLeastSpuId: number;
    platformLeastSkuId: number;
    platformLeastFee: number;
    createTime: string;
    updateTime: string;
    deleteTime: number;
}

export type CumulativeProps = {
  msgDetail?: TableProps | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  activeKey?: string;
  callback?: function;
}
