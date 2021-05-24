export default {
  path: '/group-contract-activity-management',
  name: 'group-contract-activity-management',
  routes: [
    {
      name: 'activity-list',
      path: '/group-contract-activity-management/activity-list',
      component: './group-contract-activity-management/activity-list',
    },
    {
      name: 'activity-detail',
      path: '/group-contract-activity-management/activity-detail/:id',
      component: './group-contract-activity-management/activity-detail',
      hideInMenu: true,
    },
    {
      name: 'activity-product',
      path: '/group-contract-activity-management/activity-product/:id',
      component: './group-contract-activity-management/activity-product',
      hideInMenu: true,
    },
    {
      name: 'group-detail',
      path: '/group-contract-activity-management/group-detail/:id',
      component: './group-contract-activity-management/group-detail',
      hideInMenu: true,
    },
  ],
}
