export type DescriptionsProps = {
  totalTradeCommission: number;
  totalCommission: number;
  totalSaleCommission: number;
  totalBuyCommission: number;
  totalTrainingCommission: number;
  totalLeaseCommission: number;
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
  }
  type: string;
}

export type CumulativeProps = {
  msgDetail: {
    cityBusinessDeptId: String;
    cityBusinessDeptName: string;
  }
  type: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
}