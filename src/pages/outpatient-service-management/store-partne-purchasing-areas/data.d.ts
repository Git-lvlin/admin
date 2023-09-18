export type ThematicEventItem={
  wholesaleTaxRate: number | string;
  id: number;
  sort: number;
  spuId: number;
  skuId: number | string;
  orderType: number;
  actPrice: number;
  editType: number;
  storeState: number;
  buyMinNum: number;
  divideState: number;
  divideInfoList?: null;
  tPlatformGain: number;
  createTime: string;
  updateTime: string;
  deleteTime: number;
  goodsName: string;
  supplierId: number;
  retailSupplyPrice: number;
  salePrice: number;
  stockNum: number;
  goodsState: number;
  goodsImageUrl: string;
  actPriceStr: number;
  storeStateStr: string;
  divideStateStr: string;
  tPlatformGainStr: number;
  retailSupplyPriceStr: number;
  salePriceStr: number;
  goodsStateStr: string;
  type: string;
}


export interface MyComponentProps {
  setVisible: (visible: boolean) => void;
  visible: boolean;
  callback: (data?: any) => void;
  onClose: () => void;
  msgDetail?: ThematicEventItem;
  dataSource?: ThematicEventItem[];
}


export interface SearchConfig {
  form: {
    getFieldsValue: () => {
      tPlatformGain: {
        min: number;
        max: number;
      };
      // 添加其他表单字段的类型信息
    }
  }
}

export interface RecordsEntity {
  actPrice: number;
  id: number;
  unit: string;
  goodsName: string;
  skuName: string;
  goodsDesc: string;
  imageUrl: string;
  retailSupplyPrice: number;
  wholesalePrice: number;
  wholesaleMinNum: number;
  suggestedRetailPrice: number;
  marketPrice: number;
  salePrice: number;
  gcId1: number;
  gcId2: number;
  gcId3: number;
  supplierId: number;
  goodsFromType: number;
  saleNum: number;
  settleType: number;
  wholesaleSupplyPrice: number;
  wholesaleFreight: number;
  wholesaleTaxRate: string;
  batchNumber: number;
  isSample: number;
  wsUnit: string;
  buyMaxNum: number;
  buyMinNum: number;
  salePriceProfitLoss: number;
  distributePrice: number;
  spuId: number;
  skuId: number;
  retailSupplyPriceDisplay: string;
  wholesalePriceDisplay: string;
  suggestedRetailPriceDisplay: string;
  marketPriceDisplay: string;
  salePriceDisplay: string;
  orderType: number;
  stockNum: number;
  activityStockNum: number;
  stockAlarmNum: number;
  skuNameDisplay: string;
  goodsImageUrl: string;
  gcId1Display: string;
  gcId2Display: string;
  gcId3Display: string;
  goodsVerifyRemark: string;
  supplierName: string;
}

