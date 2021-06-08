export default {
  path: '/order-management',
  name: 'order-management',
  routes: [
    {
      name: 'normal-order',
      path: '/order-management/normal-order',
      component: './order-management/normal-order',
    },
    {
      name: 'normal-order-detail',
      path: '/order-management/normal-order-detail/:id',
      component: './order-management/normal-order-detail',
      hideInMenu: true,
    },
    {
      name: 'intensive-order',
      path: '/order-management/intensive-order',
      routes: [
        {
          name: 'supplier-order',
          path: '/order-management/intensive-order/supplier-order',
          component: './order-management/intensive-order/supplier-order',
        },
        {
          name: 'supplier-order-detail',
          path: '/order-management/intensive-order/supplier-order-detail/:id',
          component: './order-management/intensive-order/supplier-order-detail',
          hideInMenu: true,
        },
        {
          name: 'shopkeeper-order',
          path: '/order-management/intensive-order/shopkeeper-order',
          component: './order-management/intensive-order/shopkeeper-order',
        },
        {
          name: 'shopkeeper-order-detail',
          path: '/order-management/intensive-order/shopkeeper-order-detail/:id',
          component: './order-management/intensive-order/shopkeeper-order-detail',
          hideInMenu: true,
        },
      ]
    },
    {
      name: 'after-sales-order',
      path: '/order-management/after-sales-order',
      component: './order-management/after-sales-order'
    },
    {
      name: 'after-sales-order-details',
      path: '/order-management/after-sales-order/detail/:id',
      component: './order-management/after-sales-order/detail',
      hideInMenu: true,
    }
  ]
}
