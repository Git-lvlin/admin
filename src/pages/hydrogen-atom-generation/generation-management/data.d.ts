export type DescriptionsProps = {
  agentNum: number;
  hydrogenAmount: number;
  hydrogenCommission: number;
  wholesaleCommission: number;
  totalCommission: number;
  hydrogenLeaseCommission: number
}

export type TableProps = {
  hydrogenAmount?: number;
  accountId?: number;
  agentId: number;
  manager?: string;
  accountName?: string;
  hydrogenCommission?: number;
  wholesaleCommission?: number;
  managerPhone?: string;
  agentName?: string;
  totalCommission?: number;
  wholesaleAmount?: string;
  totalAmount?: string;
  createTime?: Array
}


export type GithubIssueItem = {
  orderTime: string;
  orderSn: string;
  orderType: string;
  orderTypeDesc: string;
  orderAmount: string;
  buyerMobile: string;
  storeHouseNumber: string;
  dateRange: Array
};


export type DevicesProps = {
  msgDetail: {
    agentId: String;
  }
  type: string;
}

export type CumulativeProps = {
  msgDetail: TableProps | undefined;
  type?: number | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
}