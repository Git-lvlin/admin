const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/health-gift-package-activities',
  name: 'health-gift-package-activities',
  routes: [
    {
      name: 'health-package-order-management',
      path: '/health-gift-package-activities/health-package-order-management',
      component: './health-gift-package-activities/health-package-order-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'health-package-performance-statistics',
      path: '/health-gift-package-activities/health-package-performance-statistics',
      component: './health-gift-package-activities/health-package-performance-statistics',
      wrappers: [RouteWatcher],
    },
    {
      name: 'health-package-commission',
      path: '/health-gift-package-activities/health-package-commission',
      component: './health-gift-package-activities/health-package-commission',
      wrappers: [RouteWatcher],
    },
    {
      name: 'divide-configure',
      path: '/health-gift-package-activities/divide-configure',
      component: './health-gift-package-activities/divide-configure',
      wrappers: [RouteWatcher],
    },
  ]
}