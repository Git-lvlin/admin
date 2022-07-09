export type TableProps = {
  operationId: string;
  operationName: string;
  totalCommission: number;
  totalSaleCommission: number;
  totalRentCommission: number;
}

export type DetailDrawerProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  type: number;
  id?: string;
  time: string;
}