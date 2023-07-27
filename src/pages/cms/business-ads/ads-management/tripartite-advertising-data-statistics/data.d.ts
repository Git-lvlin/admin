export type CumulativeProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  activeKey?: string;
  callback?: function;
}