const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
    path: '/hydrogen-atom-trusteeship',
    name: 'hydrogen-atom-trusteeship',
    routes: [
      {
        name: 'hydrogen-atom-start-record',
        path: '/hydrogen-atom-trusteeship/hydrogen-atom-start-record',
        component: './hydrogen-atom-trusteeship/hydrogen-atom-start-record',
        wrappers: [RouteWatcher],
      },
      {
        name: 'health-card-management',
        path: '/hydrogen-atom-trusteeship/health-card-management',
        component: './hydrogen-atom-trusteeship/health-card-management',
        wrappers: [RouteWatcher],
      },
      {
        name: 'hydrogen-referral-commission',
        path: '/hydrogen-atom-trusteeship/hydrogen-referral-commission',
        component: './hydrogen-atom-trusteeship/hydrogen-referral-commission',
        wrappers: [RouteWatcher],
      },
      {
        name: 'equipment-management',
        path: '/hydrogen-atom-trusteeship/equipment-management',
        component: './hydrogen-atom-trusteeship/equipment-management',
        wrappers: [RouteWatcher],
      },
      {
        name: 'managed-transaction-data',
        path: '/hydrogen-atom-trusteeship/managed-transaction-data',
        component: './hydrogen-atom-trusteeship/managed-transaction-data',
        wrappers: [RouteWatcher],
      },
      {
        name: 'direcffons',
        path: '/hydrogen-atom-trusteeship/direcffons',
        component: './hydrogen-atom-trusteeship/direcffons',
        wrappers: [RouteWatcher],
      },
      {
        name: 'order-management',
        path: '/hydrogen-atom-trusteeship/order-management',
        component: './hydrogen-atom-trusteeship/order-management',
        wrappers: [RouteWatcher],
      },
      {
        name: 'divided-configuration',
        path: '/hydrogen-atom-trusteeship/divided-configuration',
        component: './hydrogen-atom-trusteeship/divided-configuration',
        wrappers: [RouteWatcher],
      },
      {
        name: 'management-fee-configuration',
        path: '/hydrogen-atom-trusteeship/management-fee-configuration',
        component: './hydrogen-atom-trusteeship/management-fee-configuration',
        wrappers: [RouteWatcher],
      },
      {
        name: 'data-report',
        path: '/hydrogen-atom-trusteeship/data-report',
        component: './hydrogen-atom-trusteeship/data-report',
        wrappers: [RouteWatcher],
      }
    ]
  }