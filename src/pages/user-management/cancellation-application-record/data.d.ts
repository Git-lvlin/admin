export type TableProps = {
  createTime: string;
  finishTime?: string | null;
  icon: string;
  id: string;
  loginTime: string;
  memberId: string;
  nickName: string;
  phoneNumber: string;
  reason: string;
  regTime: string;
  sourceType?: number | null;
  sourceTypeDesc: string;
  type: number;
  userType: number;
}

export type CumulativeProps = {
  msgDetail: TableProps | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  activeKey?: string;
  callback?: function;
}