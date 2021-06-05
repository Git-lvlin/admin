export default {
  path: '/order-management',
  name: 'order-management',
  routes: [
    {
      name: 'pending-orders',
      path: '/order-management/pending-orders',
      component: './order-management/pending-orders',
    },
    {
      name: 'order-detail',
      path: '/order-management/order-detail/:id',
      component: './order-management/order-detail',
      hideInMenu: true,
    },
    {
      name: 'retail-list',
      path: '/order-management/retail-list',
      component: './order-management/retail-list',
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
      ]
    }
  ]
}
