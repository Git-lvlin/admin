export default {
  path: '/coupon-management',
  name: 'coupon-management',
  routes: [
    {
      name: 'coupon-list',
      path: '/coupon-management/coupon-list',
      component: './coupon-management/coupon-list',
    },
    {
      name: 'coupon-construction',
      path: '/coupon-management/coupon-construction',
      component: './coupon-management/coupon-construction',
      hideInMenu: true,
    },
    {
      name: 'coupon-codebase',
      path: '/coupon-management/coupon-list/coupon-codebase',
      component: './coupon-management/coupon-codebase',
      hideInMenu: true,
    },
    {
      name: 'list-details',
      path: '/coupon-management/coupon-list/list-details',
      component: './coupon-management/list-details',
      hideInMenu: true,
    },
    {
      name: 'coupon-audit',
      path: '/coupon-management/coupon-audit',
      component: './coupon-management/coupon-audit',
    },
    {
      name: 'audit-details',
      path: '/coupon-management/coupon-audit/audit-details',
      component: './coupon-management/audit-details',
      hideInMenu: true,
    },
    {
      name: 'coupon-crowd',
      path: '/coupon-management/coupon-crowd',
      component: './coupon-management/coupon-crowd',
    },
    {
      name: 'add-crowd',
      path: '/coupon-management/coupon-crowd/add-crowd',
      component: './coupon-management/coupon-crowd/add-crowd',
    }
  ],
}
