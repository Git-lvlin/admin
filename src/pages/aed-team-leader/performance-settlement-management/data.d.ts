export type DescriptionsProps = {
  totalCommission: number;
  totalPayAmount: number;
}

export type TableProps = {
    settlementId: number;
    orderType: string;
    subOrderCount: number;
    settlementStatus: number;
    auditRemark: string;
    applyTime: string;
    auditTime: string;
    lastRemittanceTime: string;
    settlementStatusDesc: string;
    orderTypeDesc: string;
    applyRemark: string;
    applyAttach?: (null)[] | null;
    applyId: number;
    confirmedAmount: number;
    applyName: string;
    commissionAmount: number;
}

export type Refer = {
    orderSn: string;
    memberId: string;
    memberPhone: string;
    teamLeaderPhone: string;
    goodsName: string;
    consignee: string;
    payTime: string;
    auditTime: string;
    remittanceTime: string;
    status: number;
    statusDesc: string;
    auditSubId: number;
    auditSumId: number;
    divideItemId: number;
    settlementId: number;
    payAmount: number;
    unfreezeAmount: number;
    amount: number;
    fee: number;
    dateRange: Array;
    remittanceTime: Array;
} | undefined

export interface OrderArrEntity {
  amount: number;
  fee: number;
  status: number;
  orderId: string;
  orderNo: string;
  payAmount: number;
  unfreezeAmount: number;
  applyTime: number;
  payTime: number;
  memberId: string;
  memberMobile: string;
}
export type DrtailItem = {
    allOrder: number;
    hasRemitOrder: number;
    allAmount: number;
    hasRemitAmount: string;
    hasFee: string;
    hasRemitReal: string;
    orderArr?: OrderArrEntity[] | null | undefined
}

export type Weather={
  remark: string;
  auditSumId: number;
  orderArr: {
    string: string;
    string: string;
  };
  fee: number;
  unfreezeAmount: number;
  applyName: string;
  bankNo: string;
  allOrder: string;
  allAmount: string;
  status: number;
  remitAmount: number;
  remitTime: number;
  urlArr?: (string)[] | null;
}


export type CumulativeProps = {
  msgDetail: TableProps | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  activeKey?: string;
  callback: function;
  orderArr: TableProps | undefined;
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