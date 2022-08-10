export type TableProps = {
  id: number;
  type: number;
  amount: number;
  status: number;
  cardName: string;
  cardImage: string;
  totalMonth: number;
  firstMonthCard: number;
  firstMonthNum: number;
  nextMonthCard: number;
  nextMonthNum: number;
  cardTimeType: number;
  usefulDay: number;
  adminId: number;
  createTime: string;
  totalNum: number;
  totalAmount: number;
}

export type SubmitItem={
  cardName: string;
  cardImage: string;
  type: number;
  totalMonth: number;
  amount: number;
  cardTimeType: number;
  id: number;
  usefulDay: number;
}

export type TableItem = {
  id: number;
  title: string;
  time: string;
  MonthCard: number;
  MonthNum: number;
}

export type PropsDevices = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  type: number;
  detailData: {
    id: number;
    type: number;
    amount: number;
    status: number;
    cardName: string;
    cardImage: string;
    totalMonth: number;
    firstMonthCard: number;
    firstMonthNum: number;
    nextMonthCard: number;
    nextMonthNum: number;
    cardTimeType: number;
    usefulDay: number;
    adminId: number;
    createTime: string;
    totalNum: number;
    totalAmount: number;
  }
  onClose: function
  callback: function
}
