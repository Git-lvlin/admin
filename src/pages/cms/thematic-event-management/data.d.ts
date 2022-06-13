export type DetailListItem={
    spuId: number;
    sort: number;
    status: number;
    goodsName: string;
    imageUrl: string;
    salePrice: number;
    stockNum: number;
    goodsState: number;
    marketPrice: number;
    retailSupplyPrice: number;
    id: number;
    actPrice: number;
    actPriceProfitLoss: number;
    skuId: number;
}

export type PropsItem={
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id: string;
  callback: function;
  onClose: function
}

export type endItem={
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  endId: string;
  callback: function;
}