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
      name: 'share-the-subsidy',
      path: '/product-performance-management/share-the-subsidy',
      component: './product-performance-management/share-the-subsidy',
      wrappers: [RouteWatcher],
    },
    {
      name: 'AED-performance-management',
      path: '/product-performance-management/AED-performance-management',
      routes: [
        {
          name: 'AED-program-performance',
          path: '/product-performance-management/AED-performance-management/AED-program-performance',
          component: './product-performance-management/AED-performance-management/AED-program-performance',
          wrappers: [RouteWatcher],
        },
        {
          name: 'AED-course-list',
          path: '/product-performance-management/AED-performance-management/AED-course-list',
          component: './product-performance-management/AED-performance-management/AED-course-list',
          wrappers: [RouteWatcher],
        },
        {
          name: 'AED-program-transaction',
          path: '/product-performance-management/AED-performance-management/AED-program-transaction',
          component: './product-performance-management/AED-performance-management/AED-program-transaction',
          wrappers: [RouteWatcher],
        },
        
        {
          name: 'noSub-AED-program-performance',
          path: '/product-performance-management/AED-performance-management/noSub-AED-program-performance',
          component: './product-performance-management/AED-performance-management/noSub-AED-program-performance',
          wrappers: [RouteWatcher],
        },
        {
          name: 'AED-volunteer-exam-info',
          path: '/product-performance-management/AED-performance-management/AED-volunteer-exam-info',
          component: './product-performance-management/AED-performance-management/AED-volunteer-exam-info',
          wrappers: [RouteWatcher],
        },
        {
          name: 'AED-volunteer-ID-info',
          path: '/product-performance-management/AED-performance-management/AED-volunteer-ID-info',
          component: './product-performance-management/AED-performance-management/AED-volunteer-ID-info',
          wrappers: [RouteWatcher],
        },
        {
          name: 'early-screening-service-configuration',
          path: '/product-performance-management/AED-performance-management/early-screening-service-configuration',
          component: './product-performance-management/AED-performance-management/early-screening-service-configuration',
          wrappers: [RouteWatcher],
        },
      ]
    },
    {
      name: 'early-screening-order-performance',
      path: '/product-performance-management/early-screening-order-performance',
      component: './product-performance-management/early-screening-order-performance',
      wrappers: [RouteWatcher],
    },
  ]
}