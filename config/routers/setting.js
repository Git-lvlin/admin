const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/setting',
  name: 'setting',
  routes: [
    {
      name: 'account-management',
      path: '/setting/account-management',
      component: './setting/account-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'role-management',
      path: '/setting/role-management',
      component: './setting/role-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'authority-management',
      path: '/setting/authority-management',
      component: './setting/authority-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'password',
      path: '/setting/password',
      component: './setting/password',
      wrappers: [RouteWatcher],
      hideInMenu: true,
    },
    {
      path: '/setting/dc-management',
      name: 'dc-management',
      routes: [
        {
          name: 'add',
          path: '/setting/dc-management/add',
          component: './setting/dc-management/add',
          hideInMenu: true
        },
        {
          name: 'list',
          path: '/setting/dc-management/list',
          component: './setting/dc-management/list',
        },
        {
          name: 'version',
          path: '/setting/dc-management/version',
          component: './setting/dc-management/version',
        },
        {
          name: 'data-board',
          path: '/setting/dc-management/data-board',
          component: './setting/dc-management/data-board',
        },
        {
          name: 'data-board-configuration',
          path: '/setting/dc-management/data-board/data-board-configuration',
          component: './setting/dc-management/data-board/data-board-configuration',
          hideInMenu: true
        },
        {
          name: 'import-export',
          path: '/setting/dc-management/import-export',
          routes: [
            {
              name: 'export-configuration',
              path: '/setting/dc-management/import-export/export-configuration',
              component: './setting/dc-management/import-export/export-configuration',
            },
            {
              name: 'import-configuration',
              path: '/setting/dc-management/import-export/import-configuration',
              component: './setting/dc-management/import-export/import-configuration'
            }
          ]
        }
      ]
    },
    {
      name: 'advert-config',
      path: '/setting/advert-config',
      component: './setting/advert-config',
      wrappers: [RouteWatcher],
    },
  ]
}
