type PropsExpandTable = {
  data: PropsExpand[]
}

interface PropsExpand {
  amount: number;
  buyId: string;
  buyMobile: string;
  createTime: any;
  driverCount: number;
  memberShop: boolean;
  storeName: string;
  storeNo: string;
  inviteType: number;
}

type PropsTable = {
  address: string;
  createTime: number;
  pMemId: string;
  pMobile: string;
  pStoreId: string;
  storeName: string;
  storeStatus: string;
  subs: PropsExpand[];
  totalAccount: string;
  totalDriverCount: number;
  totalUser: number;
}

type DetailProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data?: PropsTable
}

export const PropsTable, PropsExpand, PropsExpandTable, DetailProps