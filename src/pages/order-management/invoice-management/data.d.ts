export type DescriptionsProps = {
  agentNum: number;
  hydrogenAmount: number;
  hydrogenCommission: number;
  wholesaleCommission: number;
  totalCommission: number;
  hydrogenLeaseCommission: number
}

export type TableProps = {
  id: number;
  orderNo: string;
  orderType: number;
  goodsInfo: string;
  goodsNum: number;
  orderAmount: number;
  supplierId: number;
  memberId: string;
  memberPhone: string;
  payTime: number;
  editInfo: EditInfo;
  invoiceTime: number;
  invoiceStatus: number;
  invType: number;
  invTitleType: number;
  invTitleName: string;
  invNumber: string;
  invBankNo: string;
  invBankName: string;
  invAddress: string;
  invPhone: string;
  invEmail: string;
  invSendEmail: number;
  lastEditInfo: LastEditInfo;
  createTime: string;
  updateTime: string;
  deleteTime: number;
  orderTypeStr: string;
  lastEditor: string;
  lastEditTime: string;
  invoiceStatusStr: string;
}


export type GithubIssueItem = {
  orderTime: string;
  orderNo: string;
  orderType: string;
  orderTypeDesc: string;
  orderAmount: string;
  buyerMobile: string
};


export type DevicesProps = {
  msgDetail: {
    agentId: String;
  }
  type: string;
}

export type CumulativeProps = {
  msgDetail: {
    agentId: String;
    agentName: string;
  }
  type: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
}