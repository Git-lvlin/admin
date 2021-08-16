export default {
  path: '/product-management',
  name: 'product-management',
  routes: [
    {
      name: 'product-list',
      path: '/product-management/product-list',
      component: './product-management/product-list',
    },
    {
      name: 'product-detail',
      path: '/product-management/product-detail/:id',
      component: './product-management/product-detail',
      hideInMenu: true,
    },
    {
      name: 'daifa-product',
      path: '/product-management/daifa-product',
      component: './product-management/daifa-product',
    },
    {
      name: 'brand-list',
      path: '/product-management/brand-list',
      component: './product-management/brand-list',
    },
    {
      name: 'product-log',
      path: '/product-management/product-log',
      component: './product-management/product-log',
    },
    // {
    //   name: 'freight-template',
    //   path: '/product-management/freight-template',
    //   component: './product-management/freight-template',
    // },
    {
      name: 'product-review',
      path: '/product-management/product-review',
      component: './product-management/product-review',
    },
    {
      name: 'set-goods-list',
      path: '/product-management/set-goods-list',
      component: './product-management/set-goods-list',
    },
    {
      name: 'product-category',
      path: '/product-management/product-category',
      component: './product-management/product-category',
    },
  ]
}
