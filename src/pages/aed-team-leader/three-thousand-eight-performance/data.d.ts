export type DescriptionsProps = {
  totalCommission: number;
  totalAmount: number;
}

export type MsgDetailProps = { 
  subId?: string | undefined; 
  totalCommission?: number; 
  totalPayAmount?: number; 
  totalCommissionDesc?: string; 
  subMobile?: string; 
  subName?: string | undefined; 
  dateRange?: Array;
} | undefined

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
  msgDetail:MsgDetailProps | undefined;
  type: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  activeKey?: string;
}