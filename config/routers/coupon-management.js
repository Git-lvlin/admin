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
      path: '/coupon-management/construction',
      component: './coupon-construction',
    },
  ],
}
