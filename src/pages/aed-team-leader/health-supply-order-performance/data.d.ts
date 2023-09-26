export type DescriptionsProps = {
  commission: number;
  payAmount: number;
  trueCommission: number;
}

export type MsgDetailProps = { 
  agencyId?: string | undefined; 
  totalCommission?: number; 
  totalPayAmount?: number; 
  totalCommissionDesc?: string; 
  subMobile?: string; 
  name?: string | undefined; 
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