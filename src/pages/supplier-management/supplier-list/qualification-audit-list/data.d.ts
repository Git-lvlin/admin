export type TableProps = {
    id: number;
    supId: number;
    supName: string;
    qlfNumber: string;
    qlfImg: string;
    optName: string;
    updateTime: number;
    auditStatus: number;
    auditStatusDesc: string;
    gcDesc: string;
    name: string;
    type: string;
    typeDesc: string;
    goodsQlfId: string;
    gc: string;
    settlementId: string;
    applyId: string;
    applyName: string;
    settlementStatusDesc: string;
    applyTime: string;
    companyName: string;
    settlementStatus: number;
}

export type CumulativeProps = {
  msgDetail: TableProps | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: function;
  activeKey?: string;
  callback?: function;
  orderArr?: TableProps | undefined;
  type?: string;
}


export type Statistics = {
    settlementId: number;
    settlementStatus: number;
    orderType: string;
    applyTime: string;
    applyId: string;
    applyName: string;
    applyAttach?: (string)[] | null;
    applyRemark: string;
    subOrderCount: number;
    statsConfirmedAmount: number;
    statsCommissionAmount: number;
    orderTypeDesc: string;
    settlementStatusDesc: string;
    statsAmount: number;
    statsFee: number;
    statsCount10: number;
    statsCount11: number;
    statsCount21: number;
    statsCount12: number;
    statsRemitAmount: number;
}