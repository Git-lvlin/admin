export type TableProps = {
  id: number;
  name: string;
  phone: string;
  createTime?: string | null;
  status: string;
  operateName: string;
  loginStatus: string;
  accountName: string;
  type: string;
  typeDesc: string;
  accountId: string;
  managerPhone: string;
}

export type CumulativeProps = {
  msgDetail: TableProps  | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  callback: function;
}

export type RegimentProps = {
  listDetail: TableProps  | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  callback: function;
}

export type EnteringProps = {
  msgDetail: TableProps  | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  callback: function;
  type: number;
  name?: string;
  subId?: number;
}
