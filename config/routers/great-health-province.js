const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  name: 'great-health-province',
  path: '/great-health-province',
  routes: [
    {
      name: 'aed-training-service-achievement',
      path: '/great-health-province/aed-training-service-achievement',
      component: './great-health-province/aed-training-service-achievement',
      wrappers: [RouteWatcher],
    },
  ]
}