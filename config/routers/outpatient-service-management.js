const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/outpatient-service-management',
  name: 'outpatient-service-management',
  routes: [
    {
      name: 'county-service-providers-management',
      path: '/outpatient-service-management/county-service-providers-management',
      component: './outpatient-service-management/county-service-providers-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'store-partners-management',
      path: '/outpatient-service-management/store-partners-management',
      component: './outpatient-service-management/store-partners-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'procurement-zone',
      path: '/outpatient-service-management/procurement-zone',
      component: './outpatient-service-management/procurement-zone',
      wrappers: [RouteWatcher],
    }
  ]
}