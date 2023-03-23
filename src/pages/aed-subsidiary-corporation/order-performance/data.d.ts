export type DescriptionsProps = {
  totalTradeCommission: number;
  totalCommission: number;
  totalSaleCommission: number;
  totalBuyCommission: number;
  totalTrainingCommission: number;
  totalLeaseCommission: number;
  totalBootCommission: number;
  totalRentCommission: number;
}

export type TableProps = {
  cityBusinessDeptId: string;
  cityBusinessDeptName: string;
  totalTradeCommission: string;
  totalCommission: string;
  totalSaleCommission: string;
  totalBuyCommission: string;
  totalTrainingCommission: string;
  totalLeaseCommission: string;
  createTime:Array,
  orderType:string,
  orderNo:string,
  dateRange:Array
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
    cityBusinessDeptId: String;
    cityBusinessDeptName: string;
  }
  type: string;
}

export type Detail = {
  cityBusinessDeptId: String;
  cityBusinessDeptName: string;
}

export type CumulativeProps = {
  msgDetail: {
    cityBusinessDeptId: String;
    cityBusinessDeptName: string;
  }
  type: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
}