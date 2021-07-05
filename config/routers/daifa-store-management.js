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
      name: 'list-detail',
      path: '/daifa-store-management/list/list-detail',
      component: './daifa-store-management/list-detail',
    },
    {
      name: 'bank-edit',
      path: '/daifa-store-management/list/bank-edit',
      component: './daifa-store-management/bank-edit',
    },
    {
      name: 'consultant-product-list',
      path: '/daifa-store-management/list/consultant-product-list',
      component: './daifa-store-management/consultant-product-list',
    },
    {
      name: 'agent-shop-money',
      path: '/daifa-store-management/list/agent-shop-money',
      component: './daifa-store-management/agent-shop-money',
    },
    {
      name: 'agent-shop-store_apply',
      path: '/daifa-store-management/agent-shop-store_apply',
      component: './daifa-store-management/agent-shop-store_apply',
    },
    {
      name: 'store-apply-detail',
      path: '/daifa-store-management/agent-shop-store_apply/store-apply-detail',
      component: './daifa-store-management/store-apply-detail',
    }
  ]
}
