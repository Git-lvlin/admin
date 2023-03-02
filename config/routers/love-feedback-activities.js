const RouteWatcher = '@/components/PageTab/RouteWatcher';


export default {
  path: '/love-feedback-activities',
  name: 'love-feedback-activities',
  routes: [
    {
      name: 'foundation-donation-records',
      path: '/love-feedback-activities/foundation-donation-records',
      component: './love-feedback-activities/foundation-donation-records',
      wrappers: [RouteWatcher],
    },
    {
      name: 'user-registration-record',
      path: '/love-feedback-activities/user-registration-record',
      component: './love-feedback-activities/user-registration-record',
      wrappers: [RouteWatcher],
    },
    {
      name: 'fund-receipt-record',
      path: '/love-feedback-activities/fund-receipt-record',
      component: './love-feedback-activities/fund-receipt-record',
      wrappers: [RouteWatcher],
    },
    {
      name: 'love-feedback-gift-order',
      path: '/love-feedback-activities/love-feedback-gift-order',
      component: './love-feedback-activities/love-feedback-gift-order',
      wrappers: [RouteWatcher],
    },
    {
      name: 'volunteer-list',
      path: '/love-feedback-activities/volunteer-list',
      component: './love-feedback-activities/volunteer-list',
      wrappers: [RouteWatcher],
    },
    {
      name: 'recommendation-commission',
      path: '/love-feedback-activities/recommendation-commission',
      component: './love-feedback-activities/recommendation-commission',
      wrappers: [RouteWatcher],
    }
  ]
}