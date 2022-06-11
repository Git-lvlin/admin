const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/office-management',
  name: 'office-management',
  routes:[
    {
      name: 'office-management-list',
      path: '/office-management/office-management-list',
      component: './office-management/office-management-list',
      wrappers: [RouteWatcher],
    },
    {
      name: 'office-achievements',
      path: '/office-management/office-achievements',
      component: './office-management/office-achievements',
      wrappers: [RouteWatcher],
    },
  ]
}