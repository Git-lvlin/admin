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
      }
    ]
  }