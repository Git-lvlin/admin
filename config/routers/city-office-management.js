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
  ]
}
