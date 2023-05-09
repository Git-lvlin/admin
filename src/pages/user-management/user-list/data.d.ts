export type CumulativeProps = {
  msgDetail: TableProps  | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  callback: function;
}
