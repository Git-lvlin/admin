export default {
  path: '/intensive-activity-management',
  name: 'intensive-activity-management',
  routes: [
    {
      name: 'intensive-activity-list',
      path: '/intensive-activity-management/intensive-activity-list',
      component: './intensive-activity-management/intensive-activity-list',
    },
    {
      name: 'intensive-activity-create',
      path: '/intensive-activity-management/intensive-activity-create',
      component: './intensive-activity-management/intensive-activity-create',
      hideInMenu: true,
    },
  ]
}
