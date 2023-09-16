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
    // {
    //   name: 'procurement-zone',
    //   path: '/outpatient-service-management/procurement-zone',
    //   component: './outpatient-service-management/procurement-zone',
    //   wrappers: [RouteWatcher],
    // },
    {
      name: 'store-partne-purchasing-areas',
      path: '/outpatient-service-management/store-partne-purchasing-areas',
      component: './outpatient-service-management/store-partne-purchasing-areas',
      wrappers: [RouteWatcher],
    },
    {
      name: 'case-order-management',
      path: '/outpatient-service-management/case-order-management',
      component: '../../src/common/pages/case-order-management',
    },
    {
      name: 'ipo-gift-management',
      path: '/outpatient-service-management/ipo-gift-management',
      component: './outpatient-service-management/ipo-gift-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'digital-store-account-management',
      path: '/outpatient-service-management/digital-store-account-management',
      component: './outpatient-service-management/digital-store-account-management',
      wrappers: [RouteWatcher],
    },
  ]
}