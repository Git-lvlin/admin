const RouteWatcher = '@/components/PageTab/RouteWatcher';


export default {
  path: '/love-feedback-activities',
  name: 'love-feedback-activities',
  routes: [
    {
      name: 'registration-record-love-feedback',
      path: '/love-feedback-activities/registration-record-love-feedback',
      component: './love-feedback-activities/registration-record-love-feedback',
      wrappers: [RouteWatcher],
    },
    {
      name: 'love-feedback-gift-order',
      path: '/love-feedback-activities/love-feedback-gift-order',
      component: './love-feedback-activities/love-feedback-gift-order',
      wrappers: [RouteWatcher],
    },
  ]
}