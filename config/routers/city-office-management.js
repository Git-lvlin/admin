const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/city-office-management',
  name: 'city-office-management',
  routes:[
    {
      name: 'city-office-management-list',
      path: '/city-office-management/city-office-management-list',
      component: './city-office-management/city-office-management-list',
      wrappers: [RouteWatcher],
    },
    {
      name: 'city-office-achievements',
      path: '/city-office-management/city-office-achievements',
      component: './city-office-management/city-office-achievements',
      wrappers: [RouteWatcher],
    },
    {
      name: 'new-intensive-performance',
      path: '/city-office-management/new-intensive-performance',
      component: './city-office-management/new-intensive-performance',
      wrappers: [RouteWatcher],
    },
    {
      name: 'living-service-fee-performance',
      path: '/city-office-management/living-service-fee-performance',
      component: './city-office-management/living-service-fee-performance',
      wrappers: [RouteWatcher],
    },
    {
      name: 'great-project-team',
      path: '/city-office-management/great-project-team',
      routes:[
        {
          name: 'great-project-team-management',
          path: '/city-office-management/great-project-team/great-project-team-management',
          component: './city-office-management/great-project-team/great-project-team-management',
          wrappers: [RouteWatcher],
        },
        {
          name: 'order-performance',
          path: '/city-office-management/great-project-team/order-performance',
          component: './city-office-management/great-project-team/order-performance',
          wrappers: [RouteWatcher],
        },
      ]
    }
  ]
}
