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
      console.log('payload.spuIds',payload.spuIds)
        state.spuIds=payload.spuIds
      return { ...state };
    },
    onUnit(state = { UseScopeObje:{}},{ payload }){
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
