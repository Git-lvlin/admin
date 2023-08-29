export type TableProps = {
    id: number;
    sort: number;
    spuId: number;
    unit: string;
    goodsName: string;
    goodsDesc: string;
    goodsImageUrl: string;
    supplierId: number;
    goodsSaleType: number;
    goodsSaleMaxPrice: number;
    goodsSaleMinPrice: number;
    goodsSaleNum: number;
    goodsVerifyState: number;
    goodsState: number;
    auditTime: number;
    goodsMarketPrice: number;
    defaultSkuId: number;
    defaultSkuBuyMaxNum: number;
    defaultSkuBuyMinNum: number;
    brandId: number;
    gcId1: number;
    gcId2: number;
    gcId3: number;
    goodsFromType: number;
    outSpuId: string;
    storeNo: string;
    goodsVirtualSaleNum: number;
    settleType: number;
    goodsWsSaleNum: number;
    wholesaleTaxRate: string;
    operateType: number;
    distributeMinPrice: number;
    distributeMaxPrice: number;
    supplierSpuId: string;
    isMultiSpec: number;
    gcId1Display: string;
    gcId2Display: string;
    gcId3Display: string;
    fresh: number;
    brandName: string;
    goodsSaleTypeDisplay: string;
    goodsStateDisplay: string;
    goodsVerifyStateDisplay: string;
    goodsSaleMinPriceDisplay: string;
    goodsSaleMaxPriceDisplay: string;
    firstAuditDisplay: string;
    firstAudit: number;
    specName: string;
    specValue: string;
    priceRange: string;
    stockNum: number;
    activityStockNum: number;
    wholesaleSupplyPriceRange: string;
    retailSupplyPriceRange: string;
    minRetailSupplyPrice: number;
    maxRetailSupplyPrice: number;
    minWholesaleSupplyPrice: number;
    maxWholesaleSupplyPrice: number;
    minMarketPrice: number;
    maxMarketPrice: number;
    minPlatformGain: number;
    minSalePriceProfitLoss: number;
    defaultSkuName: string;
    defaultBatchNumber: number;
    wholesaleMinNum: number;
    wsFreight: number;
    wsFreightId: number;  
}

export type CumulativeProps = {
  msgDetail: TableProps  | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  callback: function;
}

export type RegimentProps = {
  listDetail: TableProps  | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  callback: function;
}

export type EnteringProps = {
  msgDetail: TableProps  | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: function;
  callback: function;
  name?: string;
  subId?: number;
}
