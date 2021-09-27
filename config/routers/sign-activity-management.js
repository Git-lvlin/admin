export default {
    path: '/sign-activity-management',
    name: 'sign-activity-management',
    routes: [
      {
        name: 'sign-rule',
        path: '/sign-activity-management/sign-rule',
        component: './sign-activity-management/sign-rule',
      },
      {
        name: 'usable-commodity',
        path: '/sign-activity-management/usable-commodity',
        component: './sign-activity-management/usable-commodity',
      },
      {
        name: 'grant-detail',
        path: '/sign-activity-management/grant-detail',
        component: './sign-activity-management/grant-detail',
      },
      {
        name: 'consume-detail',
        path: '/sign-activity-management/consume-detail',
        component: './sign-activity-management/consume-detail',
      },
      {
        name: 'user-detail',
        path: '/sign-activity-management/user-detail',
        component: './sign-activity-management/user-detail',
        hideInMenu: true
      }
    ]
  }
  