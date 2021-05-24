export default {
  path: '/supplier-management',
  name: 'supplier-management',
  routes: [
    {
      name: 'supplier-list',
      path: '/supplier-management/supplier-list',
      component: './supplier-management/supplier-list',
    },
    {
      name: 'consultant-product-list',
      path: '/supplier-management/consultant-product-list/:id',
      component: './supplier-management/consultant-product-list',
      hideInMenu: true,
    },
    {
      name: 'consultant-supplier-list',
      path: '/supplier-management/consultant-supplier-list/:id',
      component: './supplier-management/consultant-supplier-list',
      hideInMenu: true,
    },
    {
      name: 'after-sale-address',
      path: '/supplier-management/after-sale-address/:id',
      component: './supplier-management/after-sale-address',
      hideInMenu: true,
    },
    {
      name: 'supplier-sub-account',
      path: '/supplier-management/supplier-sub-account/:id',
      component: './supplier-management/supplier-sub-account',
      hideInMenu: true,
    },
    {
      name: 'supplier-detail',
      path: '/supplier-management/supplier-detail/:id',
      component: './supplier-management/supplier-detail',
      hideInMenu: true,
    },
  ]
}
