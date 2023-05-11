const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/product-performance-management',
  name: 'product-performance-management',
  routes: [
    {
      name: 'new-intensive-performance',
      path: '/product-performance-management/new-intensive-performance',
      component: './product-performance-management/new-intensive-performance',
      wrappers: [RouteWatcher],
    },
    {
      name: 'VIP-hydrogen',
      path: '/product-performance-management/VIP-hydrogen',
      component: './product-performance-management/VIP-hydrogen',
      wrappers: [RouteWatcher],
    },
    {
      name: 'hydrogen-start-fee',
      path: '/product-performance-management/hydrogen-start-fee',
      component: './product-performance-management/hydrogen-start-fee',
      wrappers: [RouteWatcher],
    },
    {
      name: 'brand-authorization-fee',
      path: '/product-performance-management/brand-authorization-fee',
      component: './product-performance-management/brand-authorization-fee',
      wrappers: [RouteWatcher],
    },
    {
      name: 'finger-doctor-performance',
      path: '/product-performance-management/finger-doctor-performance',
      component: './product-performance-management/finger-doctor-performance',
      wrappers: [RouteWatcher],
    },
    {
      name: 'AED-program-performance',
      path: '/product-performance-management/AED-program-performance',
      component: './product-performance-management/AED-program-performance',
      wrappers: [RouteWatcher],
    },
    {
      name: 'AED-course-list',
      path: '/product-performance-management/AED-course-list',
      component: './product-performance-management/AED-course-list',
      wrappers: [RouteWatcher],
    },
    {
      name: 'AED-program-transaction',
      path: '/product-performance-management/AED-program-transaction',
      component: './product-performance-management/AED-program-transaction',
      wrappers: [RouteWatcher],
    },
  ]
}