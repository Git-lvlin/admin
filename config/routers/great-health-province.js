const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  name: 'great-health-province',
  path: '/great-health-province',
  routes: [
    {
      name: 'hydrogen-atom-saved-management',
      path: '/great-health-province/hydrogen-atom-saved-management',
      component: './great-health-province/hydrogen-atom-saved-management',
      wrappers: [RouteWatcher],
    },
    // {
    //   name: 'order-performance',
    //   path: '/great-health-province/order-performance',
    //   component: './great-health-province/order-performance',
    //   wrappers: [RouteWatcher],
    // },
    {
      name: 'aed-training-service-achievement',
      path: '/great-health-province/aed-training-service-achievement',
      component: './great-health-province/aed-training-service-achievement',
      wrappers: [RouteWatcher],
    },
  ]
}