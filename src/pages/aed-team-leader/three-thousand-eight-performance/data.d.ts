export type DescriptionsProps = {
  totalCommission: number;
  totalAmount: number;
}

export type MsgDetailProps = { 
  subId: string | undefined; 
  totalCommission: number; 
  totalPayAmount: number; 
  totalCommissionDesc: string; 
  subMobile: string; 
  dateRange: any; 
  subName: string; 
} | undefined

export type Refer = {
  subName: string;
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
    subId: string | undefined;
    totalCommission: number;
    totalPayAmount: number;
    totalCommissionDesc: string;
    subMobile: string;
    dateRange: Array;
    subName: string;
  } | undefined;
  type: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  activeKey?: string;
}