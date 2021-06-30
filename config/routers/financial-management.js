export default {
  name: 'financial-management',
  path: '/financial-management',
  routes: [
    {
      name: 'money-management',
      path: '/financial-management/money-management',
      routes: [
        {
          name: 'yeahgo-virtual-account-management',
          path: '/financial-management/money-management/yeahgo-virtual-account-management',
          component: './financial-management/money-management/yeahgo-virtual-account-management'
        },
        {
          name: 'transaction-details',
          path: '/financial-management/money-management/yeahgo-virtual-account-management/transaction-details',
          component: './financial-management/money-management/yeahgo-virtual-account-management/transaction-details',
          hidenMenu: true
        },
        {
          name: 'supplier-fund-management',
          path: '/financial-management/money-management/supplier-fund-management',
          component: './financial-management/money-management/supplier-fund-management'
        },
        {
          name: 'member-store-fund-management',
          path: '/financial-management/money-management/member-store-fund-management',
          component: './financial-management/money-management/member-store-fund-management'
        },
        {
          name: 'issuing-store-fund-management',
          path: '/financial-management/money-management/issuing-store-fund-management',
          component: './financial-management/money-management/issuing-store-fund-management'
        },
        {
          name: 'payment-details',
          path: '/financial-management/money-management/payment-details',
          component: './financial-management/money-management/payment-details',
          hidenMenu: true
        },
        {
          name: 'details',
          path: '/financial-management/money-management/details',
          component: './financial-management/money-management/details',
          hidenMenu: true
        }
      ]
    },
    {
      name: 'transaction-detail-management',
      path: '/financial-management/transaction-detail-management',
      routes: [
        {
          name: 'withdrawal-audit-management',
          path: '/financial-management/transaction-detail-management/withdrawal-audit-management',
          component: './financial-management/transaction-detail-management/withdrawal-audit-management',
        },
        {
          name: 'show-detail',
          path: '/financial-management/transaction-detail-management/withdrawal-audit-management/detail/:id',
          component: './financial-management/transaction-detail-management/withdrawal-audit-management/detail',
        },
        {
          name: 'order-pay-detail-management',
          path: '/financial-management/transaction-detail-management/order-pay-detail-management',
          component: './financial-management/transaction-detail-management/order-pay-detail-management',
        },
        {
          name: 'order-pay-detail',
          path: '/financial-management/transaction-detail-management/order-pay-detail-management/detail/:id',
          component: './financial-management/transaction-detail-management/order-pay-detail-management/detail',
        },
        {
          name: 'bonus-detail-management',
          path: '/financial-management/transaction-detail-management/bonus-detail-management',
          component: './financial-management/transaction-detail-management/bonus-detail-management',
        },
        {
          name: 'commission-detail-management',
          path: '/financial-management/transaction-detail-management/commission-detail-management',
          component: './financial-management/transaction-detail-management/commission-detail-management',
        },
        {
          name: 'loan-detail-management',
          path: '/financial-management/transaction-detail-management/loan-detail-management',
          component: './financial-management/transaction-detail-management/loan-detail-management',
        },
        {
          name: 'royalty-details',
          path: '/financial-management/transaction-detail-management/royalty-details/:id',
          component: './financial-management/transaction-detail-management/royalty-details',
        },
        {
          name: 'after-sales-order-details',
          path: '/financial-management/transaction-detail-management/after-sales-order-details',
          component: './financial-management/transaction-detail-management/after-sales-order-details',
        },
        {
          name: 'after-order-details',
          path: '/financial-management/transaction-detail-management/after-sales-order-details/detail/:id',
          component: './financial-management/transaction-detail-management/after-sales-order-details/detail',
        }
      ]
    },
    {
      name: 'transaction-allocation-management',
      path: '/financial-management/transaction-allocation-management',
      routes: [
        {
          name: 'withdrawal-fee-config',
          path: '/financial-management/transaction-allocation-management/withdrawal-fee-config',
          component: './financial-management/transaction-allocation-management/withdrawal-fee-configuration',
        }
      ]
    }
  ]
}