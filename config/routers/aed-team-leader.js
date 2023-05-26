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
    },
    {
      name: 'three-thousand-eight-performance',
      path: '/aed-team-leader/three-thousand-eight-performance',
      component: './aed-team-leader/three-thousand-eight-performance',
      wrappers: [RouteWatcher],
    },
    {
      name: 'performance-settlement-management',
      path: '/aed-team-leader/performance-settlement-management',
      component: './aed-team-leader/performance-settlement-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'aed-head-performance',
      path: '/aed-team-leader/aed-head-performance',
      component: './aed-team-leader/aed-head-performance',
      wrappers: [RouteWatcher],
    },
    {
      name: 'aed-settlement-configuration',
      path: '/aed-team-leader/aed-settlement-configuration',
      component: './aed-team-leader/aed-settlement-configuration',
      wrappers: [RouteWatcher],
    }
  ]
}
