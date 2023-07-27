export type TableProps = {
    id: number;
    adType: string;
    positionCode: string;
    positionTitle: string;
    action: string;
    old: string;
    new: string;
    remark: string;
    optAdminId: string;
    optAdminName: string;
    createTime: string;
    extra: Extra;
    adTypeDesc: string;
}

export type CumulativeProps = {
  msgDetail?: TableProps | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  activeKey?: string;
  callback?: function;
}