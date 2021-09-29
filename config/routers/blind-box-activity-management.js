export default {
    path: '/blind-box-activity-management',
    name: 'blind-box-activity-management',
    routes: [
      {
        name: 'blind-box-management-list',
        path: '/blind-box-activity-management/blind-box-management-list',
        component: './blind-box-activity-management/blind-box-management-list',
      },
      {
        name: 'blind-box-consume-detail',
        path: '/blind-box-activity-management/blind-box-consume-detail',
        component: './blind-box-activity-management/blind-box-consume-detail',
      },
      {
        name: 'blind-box-grant-detail',
        path: '/blind-box-activity-management/blind-box-grant-detail',
        component: './blind-box-activity-management/blind-box-grant-detail',
      },
      {
        name: 'blind-box-user-detail',
        path: '/blind-box-activity-management/blind-box-user-detail',
        component: './blind-box-activity-management/blind-box-user-detail',
        hideInMenu: true
      },
      {
        name: 'bind-box-rule-set',
        path: '/blind-box-activity-management/bind-box-rule-set',
        component: './blind-box-activity-management/bind-box-rule-set',
        hideInMenu: true
      }
    ]
  }
  