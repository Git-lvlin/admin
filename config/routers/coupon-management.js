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
      name: 'construction',
      path: '/coupon-management/coupon-list/construction',
      component: './coupon-construction/coupon-construction',
      hideInMenu: true,
    },
    {
      name: 'coupon-codebase',
      path: '/coupon-management/coupon-list/coupon-codebase',
      component: './coupon-management/coupon-codebase',
      hideInMenu: true,
    },
  ],
}
