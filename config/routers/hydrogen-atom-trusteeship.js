const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
    path: '/hydrogen-atom-trusteeship',
    name: 'hydrogen-atom-trusteeship',
    routes: [
      // {
      //   name: 'hydrogen-atom-start-record',
      //   path: '/hydrogen-atom-trusteeship/hydrogen-atom-start-record',
      //   component: './hydrogen-atom-trusteeship/hydrogen-atom-start-record',
      //   wrappers: [RouteWatcher],
      // },
      // {
      //   name: 'health-card-management',
      //   path: '/hydrogen-atom-trusteeship/health-card-management',
      //   routes: [
      //     {
      //       name: 'add-commodity-card',
      //       path: '/hydrogen-atom-trusteeship/health-card-management/add-commodity-card',
      //       component: './hydrogen-atom-trusteeship/health-card-management/add-commodity-card',
      //       wrappers: [RouteWatcher],
      //     },
      //     {
      //       name: 'platform-present-card',
      //       path: '/hydrogen-atom-trusteeship/health-card-management/platform-present-card',
      //       component: './hydrogen-atom-trusteeship/health-card-management/platform-present-card',
      //       wrappers: [RouteWatcher],
      //     },
      //     {
      //       name: 'record-card-acquisition',
      //       path: '/hydrogen-atom-trusteeship/health-card-management/record-card-acquisition',
      //       component: './hydrogen-atom-trusteeship/health-card-management/record-card-acquisition',
      //       wrappers: [RouteWatcher],
      //     },
      //     {
      //       name: 'card-usage-record',
      //       path: '/hydrogen-atom-trusteeship/health-card-management/card-usage-record',
      //       component: './hydrogen-atom-trusteeship/health-card-management/card-usage-record',
      //       wrappers: [RouteWatcher],
      //     }
      //   ]
      // },
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
      }
    ]
  }