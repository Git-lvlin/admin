export default {
    path: '/activity-management',
    name: 'activity-management',
    routes: [
      {
        name: 'everyday-red-packet-activity',
        path: '/activity-management/everyday-red-packet-activity',
        routes: [
            {
              name: 'activity-list',
              path: '/activity-management/everyday-red-packet-activity/activity-list',
              component: './activity-management/everyday-red-packet-activity/activity-list'
            },
            {
              name: 'red-packet-particulars',
              path: '/activity-management/everyday-red-packet-activity/red-packet-particulars',
              component: './activity-management/everyday-red-packet-activity/red-packet-particulars'
            },
            {
              name: 'everyday-packet-rule',
              path: '/activity-management/everyday-red-packet-activity/everyday-packet-rule',
              component: './activity-management/everyday-red-packet-activity/everyday-packet-rule',
              hideInMenu: true
            }
          ]
      },
      {
        name: 'share-red-packet-activity',
        path: '/activity-management/share-red-packet-activity',
        routes: [
            {
              name: 'activity-list',
              path: '/activity-management/share-red-packet-activity/activity-list',
              component: './activity-management/share-red-packet-activity/activity-list'
            },
            {
              name: 'activity-data',
              path: '/activity-management/share-red-packet-activity/activity-data',
              component: './activity-management/share-red-packet-activity/activity-data'
            },
            {
              name: 'share-packet-rule',
              path: '/activity-management/share-red-packet-activity/share-packet-rule',
              component: './activity-management/share-red-packet-activity/share-packet-rule',
              hideInMenu: true
            }
          ]
      },
      {
        name: 'spring-festival-build-building-activity',
        path: '/activity-management/spring-festival-build-building-activity',
        routes: [
            {
              name: 'spring-festival-list',
              path: '/activity-management/spring-festival-build-building-activity/spring-festival-list',
              component: './activity-management/spring-festival-build-building-activity/spring-festival-list'
            },
            // {
            //   name: 'activity-data',
            //   path: '/activity-management/spring-festival-build-building-activity/activity-data',
            //   component: './activity-management/spring-festival-build-building-activity/activity-data'
            // },
            {
              name: 'rule-configuration',
              path: '/activity-management/spring-festival-build-building-activity/rule-configuration',
              component: './activity-management/spring-festival-build-building-activity/rule-configuration',
              hideInMenu: true
            }
          ]
      },
    ]
  }