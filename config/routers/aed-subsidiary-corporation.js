const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/aed-subsidiary-corporation',
  name: 'aed-subsidiary-corporation',
  routes:[
    {
      name: 'subsidiary-corporation-management',
      path: '/aed-subsidiary-corporation/subsidiary-corporation-management',
      component: './aed-subsidiary-corporation/subsidiary-corporation-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'order-performance',
      path: '/aed-subsidiary-corporation/order-performance',
      component: './aed-subsidiary-corporation/order-performance',
      wrappers: [RouteWatcher],
    }
  ]
}
