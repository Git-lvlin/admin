export type TableProps = {
    settlementId: number;
    applyId: string;
    applyName: string;
    orderType: string;
    confirmedAmount: number;
    commissionAmount: number;
    subOrderCount: number;
    settlementStatus: number;
    auditRemark: string;
    auditTime: string;
    applyTime: string;
    applyRemark: string;
    lastRemittanceTime: string;
    applyAttach?: (string)[] | null;
    confirmedAmountDesc: string;
    commissionAmountDesc: string;
    settlementStatusDesc: string;
    orderTypeDesc: string;
  }
  
  export type CumulativeProps = {
    msgDetail: TableProps  | undefined;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: Function;
    callback: Function;
  }

  export interface OrderArrEntity {
    amount: number;
    fee: number;
    status: number;
    orderId: string;
    orderNo: string;
    payAmount: number;
    unfreezeAmount: number;
    applyTime: number;
    auditTime: number;
    payTime: number;
    memberId: string;
    memberMobile: string;
  }
  
  export interface ByAuditSumIdData {
    allOrder: number;
    hasRemitOrder: number;
    allAmount: number;
    hasRemitAmount: number;
    hasFee: number;
    hasRemitReal: number;
    orderArr?: (OrderArrEntity)[] | null;
  }