export default {
  path: '/user-management',
  name: 'user-management',
  routes: [
    {
      name: 'user-list',
      path: '/user-management/user-list',
      component: './user-management/user-list',
    },
    {
      name: 'disable-user-list',
      path: '/user-management/disable-user-list',
      component: './user-management/disable-user-list',
    },
    {
      name: 'user-detail',
      path: '/user-management/user-detail/:id',
      component: './user-management/user-detail',
      hideInMenu: true,
    },
    {
      name: 'user-relationship',
      path: '/user-management/user-relationship',
      component: './user-management/user-relationship',
    },
    {
      name: 'new-poster',
      path: '/user-management/new-poster',
      component: './user-management/new-poster',
    },
    {
      name: 'new-poster-new',
      path: '/user-management/new-poster-new',
      component: './user-management/new-poster-new',
    },
  ]
}
