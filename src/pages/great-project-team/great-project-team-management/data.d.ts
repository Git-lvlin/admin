export type DescriptionsProps = {
  totalNum: string;
  vipStoreNum: string;
  commonStoreNum: number;
  allDeviceNum: number;
  hostingDeviceNum: number;
  operateNum: string;
  hostingUserNum: string;
  operateUserNum: string;
  salesDeviceNum: number;
  leaseOrderNum: string;
}

export type TableProps = {
  manager: string;
  name: string;
  managerPhone: string;
  vipStoreNums: number;
  hostingDeviceNum: number;
  userName: string;
  accountId: number;
  agencyId: number;
  commonStoreNums: number;
  allDeviceNum: number;
  operateDeviceNum: string;
  hosingUserNum: string;
  operateUserNum: string;
}

export type AgencySalesListItem= {
  orderSn: string;
  payTime: string;
  userPhone: string;
  contactPhone: string;
  address: string;
};

export type HostingDeviceListItem= {
  orderSn: string;
  createTime: string;
  hostingMemberPhone: string;
  recomPhone: string;
  recomStoreHouseNumber: string;
  recomStoreAddress: string;
  imei: string;
  statusDesc: string;
};

export type AgencyleaseOrderItem= {
  leaseTitle: string;
  orderSn: string;
  payTime: string;
  memberPhone: string;
  houseNumber: string;
  address: string;
  imei: string;
};

export type HostingUserListItem= {
  hostingMemberPhone: string;
  realname: string;
  hostingStoreName: string;
  hostingHouseNumber: string;
  hostingAddress: string;
};

export type AgencyOperateUserItem= {
  memberPhone: string;
  realname: string;
  storeName: string;
  houseNumber: string;
  address: string;
};