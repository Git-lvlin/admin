const UseScopeModel = {
  namespace: 'UseScopeList',
  state: {
    UseScopeObje:{}
  },
  effects: {
    *fetchUseScopeList({ payload}, { call, put}) {
      yield put({
        type: 'onUseScopeList',
        payload
      });
    },
    *fetchUseType({ payload}, { call, put}) {
        yield put({
          type: 'onUseType',
          payload
        });
      },
    *fetchCouponType({ payload}, { call, put}) {
        yield put({
          type: 'onCouponType',
          payload
        });
    },
    *fetchLookSpuIds({ payload}, { call, put}) {
        yield put({
          type: 'onSpuIds',
          payload
        });
    },
    *fetchLookSpuIdsArr({ payload}, { call, put}) {
        yield put({
          type: 'onSpuIdsArr',
          payload
        });
    },
    *fetchLookUnit({ payload }, { call, put}) {
        yield put({
          type: 'onUnit',
          payload
        });
      },
    *fetchLookUnitArr({ payload }, { call, put}) {
      yield put({
        type: 'onUnitArr',
        payload
      });
    },
    *fetchWholesaleIds({ payload }, { call, put}) {
        console.log('payload',payload)
        yield put({
            type: 'onWholesaleIds',
            payload
        });
    },
    *fetchWholesaleArr({ payload }, { call, put}) {
      console.log('payload',payload)
      yield put({
          type: 'onWholesaleArr',
          payload
      });
  },
    *fetchCrowdIdsArr({ payload}, { call, put}) {
      console.log('payload',payload)
      yield put({
          type: 'onCrowdIdsArr',
          payload
      });
  },
    *fetchCrowdIds({ payload}, { call, put}) {
      console.log('payload',payload)
      yield put({
          type: 'onCrowdIds',
          payload
      });
  }

  },
  reducers: {
    onCouponType(state = { UseScopeObje:{}},{ payload }){
        state.UseScopeObje.couponType=payload.couponType
      return { ...state };
    },
    onUseType(state = { UseScopeObje:{}},{ payload }){
        state.UseScopeObje.useType=payload.useType
      return { ...state };
    },
    onSpuIds(state = { UseScopeObje:{}},{ payload }){
        state.UseScopeObje.spuIds=payload.spuIds
        console.log('spuIds',payload.spuIds)
      return { ...state };
    },
    onSpuIdsArr(state = { UseScopeObje:{}},{ payload }){
        state.UseScopeObje.spuIdsArr=payload.spuIdsArr
      return { ...state };
    },
    onUnit(state = { UseScopeObje:{}},{ payload }){
      console.log('payload.unit',payload.unit)
        state.UseScopeObje.unit=payload.unit
        return { ...state };
    },
    onUnitArr(state = { UseScopeObje:{}},{ payload }){
      console.log('payload.unitArr',payload.unitArr)
        state.UseScopeObje.unitArr=payload.unitArr
        return { ...state };
    },
    onWholesaleIds(state = { UseScopeObje:{}},{ payload }){
      console.log('payload.wholesaleIds',payload.wholesaleIds)
        state.UseScopeObje.wholesaleIds=payload.wholesaleIds
        return { ...state };
    },
    onWholesaleArr(state = { UseScopeObje:{}},{ payload }){
      console.log('payload.wholesaleArr',payload.wholesaleArr)
      state.UseScopeObje.wholesaleArr=payload.wholesaleArr
      return { ...state };
  },
    onCrowdIdsArr(state = { UseScopeObje:{}},{ payload }){
      state.UseScopeObje.CrowdIdsArr=payload.CrowdIdsArr
    return { ...state };
    },
    onCrowdIds(state = { UseScopeObje:{}},{ payload }){
      console.log('CrowdIds',payload.CrowdIds)
      state.UseScopeObje.CrowdIds=payload.CrowdIds
      return { ...state };
    },
    onUseScopeList(state = { UseScopeObje:{}},{ payload }){
      console.log('UseScopeObje',payload.UseScopeObje)
      state.UseScopeObje=payload.UseScopeObje
      return { ...state };
    },
   
  },
};
export default UseScopeModel;
