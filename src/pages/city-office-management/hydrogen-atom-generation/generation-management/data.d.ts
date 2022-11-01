export type DescriptionsProps = {
  agentNum: number;
  hydrogenAmount: number;
  hydrogenCommission: number;
  wholesaleCommission: number;
  totalCommission: number;
}

export type TableProps = {
  hydrogenAmount: number;
  accountId: number;
  agentId: number;
  manager: string;
  accountName: string;
  hydrogenCommission: number;
  wholesaleCommission: number;
  managerPhone: string;
  agentName: string;
  totalCommission: number;
  wholesaleAmount: string;
  totalAmount: string;
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