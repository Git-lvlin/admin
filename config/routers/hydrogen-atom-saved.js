const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  name: 'hydrogen-atom-saved',
  path: '/hydrogen-atom-saved',
  routes: [
    {
      name: 'order-performance',
      path: '/hydrogen-atom-saved/order-performance',
      component: './hydrogen-atom-saved/order-performance',
      wrappers: [RouteWatcher],
    },
  ]
}