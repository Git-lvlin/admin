const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/health-package-activities',
  name: 'health-package-activities',
  routes: [
    {
      name: 'store-health-card-management',
      path: '/health-package-activities/store-health-card-management',
      component: './health-package-activities/store-health-card-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'promotion-activity-management',
      path: '/health-package-activities/promotion-activity-management',
      component: './health-package-activities/promotion-activity-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'divide-configure',
      path: '/health-package-activities/divide-configure',
      component: './health-package-activities/divide-configure',
      wrappers: [RouteWatcher],
    },
  ]
}