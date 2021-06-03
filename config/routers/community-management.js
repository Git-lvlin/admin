export default {
    path: '/community-management',
    name: 'community-management',
    routes: [
      {
        name: 'circle-management',
        path: '/community-management/circle-management',
        component: './community-management/circle-management',
      },
      {
        name: 'add-circle',
        path: '/community-management/circle-management/add-circle',
        component: './community-management/circle-management/add-circle',
        hideInMenu: true,
      },
      {
        name: 'circleInterior-management',
        path: '/community-management/circleInterior-management',
        component: './community-management/circleInterior-management/index.jsx',
      },
      {
        name: 'content-management',
        path: '/community-management/content-management',
        component: './community-management/content-management/index.jsx',
      },
      {
        name: 'consultation-management',
        path: '/community-management/consultation-management',
        component: './community-management/consultation-management/index.jsx',
      },
      {
        name: 'reporttype-management',
        path: '/community-management/reporttype-management',
        component: './community-management/reporttype-management/index.jsx',
      },
      {
        name: 'review-report',
        path: '/community-management/review-report',
        routes: [
          {
            name: 'review-report-untreated',
            path: '/community-management/review-report/review-report-untreated',
            component: './community-management/review-report/review-report-untreated/index.jsx'
          },
          {
            name: 'review-report-processed',
            path: '/community-management/review-report/review-report-processed',
            component: './community-management/review-report/review-report-processed/index.jsx'
          },
        ]
      },
      {
        name: 'invitation-report',
        path: '/community-management/invitation-report',
        routes: [
          {
            name: 'invitation-report-untreated',
            path: '/community-management/invitation-report/invitation-report-untreated',
            component: './community-management/invitation-report/invitation-report-untreated/index.jsx'
          },
          {
            name: 'invitation-report-processed',
            path: '/community-management/invitation-report/invitation-report-processed',
            component: './community-management/invitation-report/invitation-report-processed/index.jsx'
          },
        ]
      },
      {
        name: 'community-advertising',
        path: '/community-management/community-advertising',
        component: './community-management/community-advertising/index.jsx',
      },
    ],
  }
  