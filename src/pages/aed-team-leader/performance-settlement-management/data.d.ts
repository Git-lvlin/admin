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
  managerPhone: string;
  dateRange: Array;
}

export type DrtailItem = {
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
    allOrder: number;
    hasRemitOrder: number;
    allAmount: number;
    hasRemitAmount: string;
    hasFee: string;
    hasRemitReal: string;
}

export type CumulativeProps = {
  msgDetail: TableProps | undefined;
  type: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  activeKey?: string;
}