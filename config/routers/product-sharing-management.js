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
  ]
}
