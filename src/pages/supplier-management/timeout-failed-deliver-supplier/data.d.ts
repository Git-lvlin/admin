export type TableProps = {
    id: number;
    supplierId: number;
    supplierName: string;
    orderAmount: number;
    orderNum: number;
    earliestPayTime: string;
    earliestDay: number;
    createTime: string;
}

export type CumulativeProps = {
  msgDetail: TableProps | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: function;
  activeKey?: string;
  callback?: function;
  orderArr?: TableProps | undefined;
  Day: number;
}


export type Statistics = {
  activeKey: string
}