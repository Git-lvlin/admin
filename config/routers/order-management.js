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
          name: 'shopkeeper-order',
          path: '/order-management/intensive-order/shopkeeper-order',
          component: './order-management/intensive-order/shopkeeper-order',
        },
        {
          name: 'supplier-order',
          path: '/order-management/intensive-order/supplier-order',
          component: './order-management/intensive-order/supplier-order',
        },
      ]
    },
    {
      name: 'after-sales-order',
      path: '/order-management/after-sales-order',
      component: './order-management/after-sales-order'
    }
  ]
}
