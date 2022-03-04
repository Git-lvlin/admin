const RouteWatcher = '@/components/PageTab/RouteWatcher';


export default {
  path: '/product-management',
  name: 'product-management',
  routes: [
    {
      name: 'product-list',
      path: '/product-management/product-list',
      component: './product-management/product-list',
      wrappers: [RouteWatcher],
    },
    {
      name: 'product-list-purchase',
      path: '/product-management/product-list-purchase',
      component: './product-management/product-list',
      wrappers: [RouteWatcher],
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
      wrappers: [RouteWatcher],
    },
    {
      name: 'brand-list',
      path: '/product-management/brand-list',
      component: './product-management/brand-list',
      wrappers: [RouteWatcher],
    },
    {
      name: 'product-log',
      path: '/product-management/product-log',
      component: './product-management/product-log',
      wrappers: [RouteWatcher],
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
      wrappers: [RouteWatcher],
    },
    {
      name: 'set-goods-list',
      path: '/product-management/set-goods-list',
      component: './product-management/set-goods-list',
      wrappers: [RouteWatcher],
    },
    {
      name: 'product-category',
      path: '/product-management/product-category',
      component: './product-management/product-category',
      wrappers: [RouteWatcher],
    },
    {
      name: 'overrule-list',
      path: '/product-management/overrule-list',
      component: './product-management/overrule-list',
      wrappers: [RouteWatcher],
    },
    {
      name: 'product-evaluate',
      path: '/product-management/product-evaluate',
      component: './product-management/product-evaluate',
      wrappers: [RouteWatcher],
    },
    {
      name: 'product-unit',
      path: '/product-management/product-unit',
      component: './product-management/product-unit',
      wrappers: [RouteWatcher],
    },
  ]
}
