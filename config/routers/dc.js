export default {
  path: '/dc-management',
  name: 'dc-management',
  routes: [
    {
      name: 'add',
      path: '/dc-management/add',
      component: './dc-management/add',
    },
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
  ]
}