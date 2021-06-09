const UseScopeModel = {
  namespace: 'UseScopeList',
  state: {
    UseScopeObje:{}
  },
  effects: {
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
    *fetchLookUnit({ payload}, { call, put}) {
        yield put({
          type: 'onUnit',
          payload
        });
      },
    *fetchWholesaleIds({ payload}, { call, put}) {
        console.log('payload',payload)
    yield put({
        type: 'onWholesaleIds',
        payload
    });
    }

  },
  reducers: {
    onCouponType(state = { UseScopeObje:{}},{ payload }){
        state.couponType=payload.couponType
      return { ...state };
    },
    onUseType(state = { UseScopeObje:{}},{ payload }){
        state.useType=payload.useType
      return { ...state };
    },
    onSpuIds(state = { UseScopeObje:{}},{ payload }){
        state.spuIds=payload.spuIds
      return { ...state };
    },
    onSpuIdsArr(state = { UseScopeObje:{}},{ payload }){
        state.spuIdsArr=payload.spuIdsArr
      return { ...state };
    },
    onUnit(state = { UseScopeObje:{}},{ payload }){
      console.log('payload.unit',payload.unit)
        state.unit=payload.unit
        return { ...state };
    },
    onWholesaleIds(state = { UseScopeObje:{}},{ payload }){
        state.wholesaleIds=payload.wholesaleIds
        return { ...state };
    },
  },
};
export default UseScopeModel;
