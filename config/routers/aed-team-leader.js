const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/aed-team-leader',
  name: 'aed-team-leader',
  routes:[
    {
      name: 'team-leader-management',
      path: '/aed-team-leader/team-leader-management',
      component: './aed-team-leader/team-leader-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'order-performance',
      path: '/aed-team-leader/order-performance',
      component: './aed-team-leader/order-performance',
      wrappers: [RouteWatcher],
    }
  ]
}
