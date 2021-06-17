export default {
  path: '/daifa-store-management',
  name: 'daifa-store-management',
  routes: [
    {
      name: 'list',
      path: '/daifa-store-management/list',
      component: './daifa-store-management/list',
    },
    {
      name: 'consultant-product-list',
      path: '/daifa-store-management/consultant-product-list',
      component: './daifa-store-management/consultant-product-list',
    },
    // {
    //   name: 'role-management',
    //   path: '/setting/role-management',
    //   component: './setting/role-management',
    // },
    // {
    //   name: 'authority-management',
    //   path: '/setting/authority-management',
    //   component: './setting/authority-management',
    // },
  ]
}
