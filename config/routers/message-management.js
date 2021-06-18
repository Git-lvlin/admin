export default {
  path: '/message-management',
  name: 'message-management',
  routes: [
    {
      name: 'member-message-template-config',
      path: '/message-management/member-message-template-config',
      component: './message-management/member-message-template-config'
    },
    {
      name: 'store-message-template-config',
      path: '/message-management/store-message-template-config',
      component: './message-management/store-message-template-config'
    },
    {
      name: 'supplier-message-template-config',
      path: '/message-management/supplier-message-template-config',
      component: './message-management/supplier-message-template-config'
    },
    {
      name: 'platform-message-template-config',
      path: '/message-management/platform-message-template-config',
      component: './message-management/platform-message-template-config'
    },
    {
      name: 'custom-message',
      path: '/message-management/custom-message',
      component: './message-management/custom-message'
    },
    {
      name: 'audit',
      path: '/message-management/custom-message/audit/:id',
      component: './message-management/custom-message/audit',
      hideInMenu: true
    },
    {
      name: 'detail',
      path: '/message-management/custom-message/detail/:id',
      component: './message-management/custom-message/detail',
      hideInMenu: true
    },
    {
      name: 'stand-inside-letter-list',
      path: '/message-management/stand-inside-letter-list',
      component: './message-management/stand-inside-letter-list'
    }
  ]
}