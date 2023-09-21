export type DescriptionsProps = {
  agentNum: number;
  hydrogenAmount: number;
  hydrogenCommission: number;
  wholesaleCommission: number;
  totalCommission: number;
  hydrogenLeaseCommission: number
}

export type TableProps = {
    accountId: string;
    name: string;
    status: number;
    userName: string;
    contactName: string;
    contactPhone: string;
    areaAsc?: (string)[] | null;
    areaAddress: string;
    nums: string;
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
  msgDetail?: TableProps;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  callback: ()=> void
}