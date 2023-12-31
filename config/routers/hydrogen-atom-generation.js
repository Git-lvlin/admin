const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  name: 'hydrogen-atom-generation',
  path: '/hydrogen-atom-generation',
  routes: [
    {
      name: 'generation-management',
      path: '/hydrogen-atom-generation/generation-management',
      component: './hydrogen-atom-generation/generation-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'aed-training-service-achievement',
      path: '/hydrogen-atom-generation/aed-training-service-achievement',
      component: './hydrogen-atom-generation/aed-training-service-achievement',
      wrappers: [RouteWatcher],
    },
    {
      name: 'health-package-order-performance',
      path: '/hydrogen-atom-generation/health-package-order-performance',
      component: './hydrogen-atom-generation/health-package-order-performance',
      wrappers: [RouteWatcher],
    },
    {
      name: 'settings-page',
      path: '/hydrogen-atom-generation/settings-page',
      component: './hydrogen-atom-generation/settings-page',
      wrappers: [RouteWatcher],
    },
    {
      name: 'health-supply-order-performance',
      path: '/hydrogen-atom-generation/health-supply-order-performance',
      component: './hydrogen-atom-generation/health-supply-order-performance',
      wrappers: [RouteWatcher],
    },
  ]
}