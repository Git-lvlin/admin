export type DescriptionsProps = {
  totalCommission: number;
  totalPayAmount: number;
}

export type TableProps = {
  agencyId: string | undefined;
  totalCommission: number;
  totalPayAmount: number;
  totalCommissionDesc: string;
  managerPhone: string;
  dateRange:Array
}

export type Refer = {
  name: string;
  dateRange: Array;
}

export type DrtailItem = {
  offTrainStatus: any;
  orderSn?: string; 
  dateRange?: [string, string]; 
  teamPhone?: string;
  orderType?: string;
  examStatus?: string;
  learnStatus?: string;
  contractStatus?: string;
  teamLeaderPhone?: string;
}

export type CumulativeProps = {
  msgDetail: {
    agencyId: string | undefined;
    totalCommission: number;
    totalPayAmount: number;
    totalCommissionDesc: string;
    managerPhone: string;
    dateRange: Array;
    name: string;
  } | undefined;
  type: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  activeKey?: string;
}