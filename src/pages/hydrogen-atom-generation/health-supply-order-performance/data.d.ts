export type DescriptionsProps = {
  agencyNum: number;
  payAmount: number;
  commission: number;
  wholesaleCommission: number;
  totalCommission: number;
  hydrogenLeaseCommission: number
  totalNum: number;
  totalPayAmount: number;
  trueCommission: number;
}

export type TableProps = {
  hydrogenAmount?: number;
  accountId?: number;
  agentId?: number;
  manager?: string;
  accountName?: string;
  hydrogenCommission?: number;
  wholesaleCommission?: number;
  managerPhone?: string;
  agentName?: string | undefined;
  totalCommission?: number;
  wholesaleAmount?: string;
  totalAmount?: string;
  agencyId?: string | undefined,
  dateRange?: Array,
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
  activeKey:  string | number;
}

export type CumulativeProps = {
  msgDetail: TableProps | undefined;
  type?: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  scope?: string | undefined;
}