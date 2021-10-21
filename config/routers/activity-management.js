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
                name: 'everyday-packet-rule',
                path: '/activity-management/everyday-red-packet-activity/activity-list/everyday-packet-rule',
                component: './activity-management/everyday-red-packet-activity/activity-list/everyday-packet-rule'
            },
            {
              name: 'red-packet-particulars',
              path: '/activity-management/everyday-red-packet-activity/red-packet-particulars',
              component: './activity-management/everyday-red-packet-activity/red-packet-particulars'
            },
          ]
      }
    ]
  }