const RouteWatcher = '@/components/PageTab/RouteWatcher';


export default {
  path: '/product-sharing-management',
  name: 'product-sharing-management',
  routes: [
    {
      name: 'sharing-management',
      path: '/product-sharing-management/sharing-management',
      component: './product-sharing-management/sharing-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'settlement-records',
      path: '/product-sharing-management/settlement-records',
      component: './product-sharing-management/settlement-records',
      wrappers: [RouteWatcher],
    },
    {
      name: 'designated-commodity-settlement',
      path: '/product-sharing-management/designated-commodity-settlement',
      routes: [
        {
          name: 'designated-commodity-settlement',
          path: '/product-sharing-management/designated-commodity-settlement/designated-commodity-settlement',
          component: './product-sharing-management/designated-commodity-settlement/designated-commodity-settlement',
          wrappers: [RouteWatcher],
        },
        {
          name: 'merchandise-settlement-record',
          path: '/product-sharing-management/designated-commodity-settlement/merchandise-settlement-record',
          component: './product-sharing-management/designated-commodity-settlement/merchandise-settlement-record',
          wrappers: [RouteWatcher],
        },
      ]
    },
    {
      name: 'allocation-management',
      path: '/product-sharing-management/allocation-management',
      component: './product-sharing-management/allocation-management',
      wrappers: [RouteWatcher],
    }
  ]
}
