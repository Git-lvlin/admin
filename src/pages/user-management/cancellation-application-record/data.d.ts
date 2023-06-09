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

export type CumulativeProps = {
  msgDetail: TableProps | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  activeKey?: string;
  callback: function;
  orderArr: TableProps | undefined;
}