export type TableProps = {
    id: number;
    supId: number;
    supName: string;
    qlfNumber: string;
    qlfImg: string;
    optName: string;
    updateTime: number;
    auditStatus: number;
    auditStatusDesc: string;
    gcDesc: string;
    name: string;
    type: string;
    typeDesc: string;
    goodsQlfId: string;
    gc: string;

}

export type CumulativeProps = {
  msgDetail: TableProps | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: function;
  activeKey?: string;
  callback?: function;
  orderArr?: TableProps | undefined;
}
