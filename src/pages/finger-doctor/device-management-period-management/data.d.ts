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
  align: string;
}

export type Record = {
  activatedTime: string;
  activatedTimeStr: string;
  activity: string;
  bindStatus?: any;
  bindStatusStr: string;
  contractId: string;
  contractUrl: string;
  createId?: any;
  createTime: string;
  createTimeStr: string;
  dId?: any;
  fileUrl: string;
  id: string;
  imei: string;
  leaseAmountSum: string;
  leaseAmountSumStr: string;
  leaseDaySum: number;
  leaseDeadline: string;
  leaseDeadlineStr: string;
  leasePaySum: number;
  leaseStatus: number;
  leaseStatusStr: string;
  manageFee: string;
  manageFeeStr: string;
  manageType: string;
  memberId: string;
  memberPhone: string;
  occupationMode: number;
  occupationModeStr: string;
  orderAmount: string;
  orderAmountStr: string;
  orderId: string;
  orderSn: string;
  orderStatus: string;
  orders: any[];
  page: string;
  remainManageDayStr: number;
  requestMemberId?: any;
  scanAmountSum: string;
  scanTimeSum: string;
  size: string;
  startFee: string;
  startSum: number;
  status: number;
  statusStr: string;
  storeNo: string;
  traceId: string;
  updateId?: any;
  updateTime: string;
}


export type DetailProps = {
  visible: boolean,
  setVisible: (v: boolean) => void,
  onClose: () => void;
  callback: () => void;
  datailMsg: Record | undefined
}

export type DataType = {
  id: number;
  imei: string;
  provinceId: number;
  provinceName: string;
  cityId: number;
  cityName: string;
  areaId: number;
  areaName: string;
  detailAddress: string;
  phone: string;
  name: string;
}

export type DetailType = {
  imei: string;
  memberPhone: string;
  remainManageDays: string;
}