import type { SearchTransformKeyFn } from '@ant-design/pro-utils';

interface SearchConfig {
  span: number;
  width: number;
}

interface TableColumn {
  title: string
  dataIndex: string;
  valueType: string;
  hideInTable?: boolean;
  hideInSearch?: boolean;
  search?: false | {
    transform: SearchTransformKeyFn;
    config: SearchConfig;
  };
  render: (_: any) => JSX.Element;
}


export type DetailProps = {
  visible: boolean,
  setVisible: (v: boolean) => void,
  memberId: string,
}

export type DataType = {
  name: string;
  gender: string;
  birthday: string;
  height: number;
  weight: number;
  phone: string;
  address: string;
  openId: string;
  unionId: string;
  memberId: string;
  identityNo: string;
  emergencyContact: string;
  icon: string;
  email: string;
}