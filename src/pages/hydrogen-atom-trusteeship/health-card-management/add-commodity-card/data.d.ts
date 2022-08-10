export type TableProps = {
  id: number;
  num: number;
  status: number;
  sort: number;
  cardName: string;
  cardImage: string;
  salePrice: number;
  marketPrice: number;
  cardType: number;
  equipmentType: number;
  cardTimeType: number;
  usefulDay: number;
  cartEndTime: number;
  hotType: number;
  adminId: number;
  createTime: string;
  validTimeStr: string;
}


export type SubmitItem={
  cardName: string;
  subTitle: string;
  cardImage: string;
  marketPrice: number;
  salePrice: number;
  cardType: number;
  equipmentType: number;
  num: number;
  cardRule: string;
  id: number;
  cardTimeType: number;
  hotType: number;
  usefulDay: number;
  cartEndTime: string;
}

export type PropsDevices = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  type: number;
  detailData: {
    id: number;
    cartEndTime: number;
    salePrice: number;
    marketPrice: number;
    hotType: number;
    sort: number
  }
  onClose: function
  callback: function
}