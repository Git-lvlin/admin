const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
    name: 'great-project-team',
    path: '/great-project-team',
    routes:[
      {
        name: 'great-project-team-management',
        path: '/great-project-team/great-project-team-management',
        component: './great-project-team/great-project-team-management',
        wrappers: [RouteWatcher],
      },
      {
        name: 'order-performance',
        path: '/great-project-team/order-performance',
        component: './great-project-team/order-performance',
        wrappers: [RouteWatcher],
      },
    ]
  }