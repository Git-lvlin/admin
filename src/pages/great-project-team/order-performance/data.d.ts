export type DescriptionsProps = {
  healthyCommission: number;
  hydrogenPayAmountDesc: string;
  hydrogenPayAmount: number;
  salesCommissionDesc: string;
  agencyId: number;
  hydrogenRentPayAmountDesc: string;
  totalCommission: number;
  hydrogenBootPayAmount: number;
  hydrogenBootCommissionDesc: string;
  hydrogenCommissionDesc: string;
  hydrogenCommission: number;
  managerPhone: string;
  healthyPayAmountDesc: string;
  hydrogenRentCommissionDesc: string;
  hydrogenRentCommission: number;
  salesCommission: number;
  salesPayAmount: number;
  healthyPayAmount: number;
  totalPayAmountDesc: string;
  healthyCommissionDesc: string;
  totalPayAmount: number;
  totalCommissionDesc: string;
  hydrogenBootCommission: number;
  hydrogenRentPayAmount: number;
  hydrogenBootPayAmountDesc: string;
  salesPayAmountDesc: string;
}

export type TableProps = {
  healthyCommission: number;
  hydrogenPayAmountDesc: string;
  hydrogenPayAmount: number;
  salesCommissionDesc: string;
  agencyId: number;
  hydrogenRentPayAmountDesc: string;
  totalCommission: number;
  hydrogenBootPayAmount: number;
  hydrogenBootCommissionDesc: string;
  hydrogenCommissionDesc: string;
  hydrogenCommission: number;
  managerPhone: string;
  healthyPayAmountDesc: string;
  hydrogenRentCommissionDesc: string;
  hydrogenRentCommission: number;
  salesCommission: number;
  salesPayAmount: number;
  healthyPayAmount: number;
  totalPayAmountDesc: string;
  healthyCommissionDesc: string;
  totalPayAmount: number;
  totalCommissionDesc: string;
  hydrogenBootCommission: number;
  hydrogenRentPayAmount: number;
  hydrogenBootPayAmountDesc: string;
  salesPayAmountDesc: string;
  createTime: Array
}


export type GithubIssueItem = {
  orderType: string;
  memberPhone: string;
  payAmount: number;
  orderSn: string;
  createTime: string;
  payAmountDesc: string;
  commission: number;
  commissionDesc: string;
  dateRange: Array;
  teamPhone: string;
};


export type DevicesProps = {
  msgDetail: TableProps
  type: string;
}

export type CumulativeProps = {
  msgDetail: TableProps
  type: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
}