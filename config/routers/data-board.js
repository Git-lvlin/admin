const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  name: 'data-board',
  path: '/data-board',
  routes: [
    {
      name: 'summary-of-data',
      path: '/data-board/summary-of-data',
      component: './data-board/summary-of-data',
      wrappers: [RouteWatcher],
    },
    {
      name: 'order-analysis',
      path: '/data-board/order-analysis',
      component: './data-board/order-analysis',
      wrappers: [RouteWatcher],
    },
    {
      name: 'product-data',
      path: '/data-board/product-data',
      component: './data-board/product-data',
      wrappers: [RouteWatcher],
    },
    {
      name: 'community-store-data',
      path: '/data-board/community-store-data',
      component: './data-board/community-store-data',
      wrappers: [RouteWatcher],
    },
    {
      name: 'operation-data',
      path: '/data-board/operation-data',
      component: './data-board/operation-data',
      wrappers: [RouteWatcher],
    },
    {
      name: 'supplier-data',
      path: '/data-board/supplier-data',
      component: './data-board/supplier-data',
      wrappers: [RouteWatcher],
    },
    {
      name: 'detail',
      path: '/data-board/supplier-data/detail',
      component: './data-board/supplier-data/detail',
      wrappers: [RouteWatcher],
    },
    {
      name: 'supplier-development-data',
      path: '/data-board/supplier-development-data',
      component: './data-board/supplier-development-data',
      wrappers: [RouteWatcher],
    },
    {
      name: 'data-preview',
      path: '/data-board/data-preview',
      component: './data-board/data-preview',
      wrappers: [RouteWatcher],
    },
    {
      name: 'intensive-data-export',
      path: '/data-board/intensive-data-export',
      component: './data-board/intensive-data-export',
      wrappers: [RouteWatcher],
    },
    {
      name: 'data-sales',
      path: '/data-board/data-sales',
      component: './data-board/data-sales',
      wrappers: [RouteWatcher],
    },
    {
      name: 'gmv-detail',
      path: '/data-board/gmv-detail',
      component: './data-board/data-sales/gmv-detail',
      wrappers: [RouteWatcher],
    },
    {
      name: 'sales-detail',
      path: '/data-board/sales-detail',
      component: './data-board/data-sales/sales-detail',
      wrappers: [RouteWatcher],
    },
    {
      name: 'gmv-order',
      path: '/data-board/gmv-order',
      component: './data-board/data-sales/gmv-order',
      wrappers: [RouteWatcher],
    },
    {
      name: 'sales-order',
      path: '/data-board/sales-order',
      component: './data-board/data-sales/sales-order',
      wrappers: [RouteWatcher],
    },
    {
      name: 'class-of-view',
      path: '/data-board/class-of-view',
      component: './data-board/class-of-view',
      wrappers: [RouteWatcher],
    },
    {
      name: 'order-list',
      path: '/data-board/order-list',
      component: './data-board/class-of-view/order',
      wrappers: [RouteWatcher],
    },
    {
      name: 'rank',
      path: '/data-board/rank',
      component: './data-board/rank',
      wrappers: [RouteWatcher],
    },
    {
      name: 'order',
      path: '/data-board/order/:id',
      component: './data-board/order',
      // wrappers: [RouteWatcher],
    }
  ]
}