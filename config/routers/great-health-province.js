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
    {
      name: 'aed-training-service-achievement',
      path: '/great-health-province/aed-training-service-achievement',
      component: './great-health-province/aed-training-service-achievement',
      wrappers: [RouteWatcher],
    },
    {
      name: 'health-package-order-performance',
      path: '/great-health-province/health-package-order-performance',
      component: './great-health-province/health-package-order-performance',
      wrappers: [RouteWatcher],
    },
    {
      name: 'settings-page',
      path: '/great-health-province/settings-page',
      component: './great-health-province/settings-page',
      wrappers: [RouteWatcher],
    },
    {
      name: 'early-screening-order-performance',
      path: '/great-health-province/early-screening-order-performance',
      component: './great-health-province/early-screening-order-performance',
      wrappers: [RouteWatcher],
    },
    {
      name: 'health-supply-order-performance',
      path: '/great-health-province/health-supply-order-performance',
      component: './great-health-province/health-supply-order-performance',
      wrappers: [RouteWatcher],
    },
  ]
}