export default {
  path: '/dc-management',
  name: 'dc-management',
  routes: [
    {
      name: 'list',
      path: '/dc-management/list',
      component: './dc-management/list',
    },
    {
      name: 'version',
      path: '/dc-management/version',
      component: './dc-management/version',
    },
    {
      name: 'data-board',
      path: '/dc-management/data-board',
      component: './dc-management/data-board',
    },
    {
      name: 'data-board-configuration',
      path: '/dc-management/data-board/data-board-configuration',
      component: './dc-management/data-board/data-board-configuration',
      hideInMenu: true
    },
  ]
}