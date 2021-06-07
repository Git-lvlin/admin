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
        name: 'circleinterior-management',
        path: '/community-management/circleinterior-management',
        component: './community-management/circleinterior-management/index.jsx',
        hideInMenu: true,
      },
      {
        name: 'content-management',
        path: '/community-management/content-management',
        component: './community-management/content-management/index.jsx',
      },
      {
        name: 'add-content',
        path: '/community-management/content-management/add-content',
        component: './community-management/content-management/add-content',
        hideInMenu: true,
      },
      {
        name: 'dynamic-listlikes',
        path: '/community-management/content-management/dynamic-listlikes',
        component: './community-management/content-management/dynamic-listlikes',
        hideInMenu: true,
      },
      {
        name: 'dynamic-comment-replylist',
        path: '/community-management/content-management/dynamic-comment-replylist',
        component: './community-management/content-management/dynamic-comment-replylist',
        hideInMenu: true,
      },
      {
        name: 'dynamic-getdynamicdetail',
        path: '/community-management/content-management/dynamic-getdynamicdetail',
        component: './community-management/content-management/dynamic-getdynamicdetail',
        hideInMenu: true,
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
        component: './community-management/review-report/index.jsx'
      },
      {
        name: 'admin-report-detaillist',
        path: '/community-management/review-report/admin-report-detaillist',
        component: './community-management/review-report/admin-report-detaillist',
        hideInMenu: true,

      },
      {
        name: 'invitation-report',
        path: '/community-management/invitation-report',
        component: './community-management/invitation-report/index.jsx'
      },
      {
        name: 'community-advertising',
        path: '/community-management/community-advertising',
        component: './community-management/community-advertising/index.jsx',
      },
      {
        name: 'add-advertising',
        path: '/community-management/community-advertising/add-advertising',
        component: './community-management/community-advertising/add-advertising',
        hideInMenu: true,
      },
      {
        name: 'advertising-manage',
        path: '/community-management/community-advertising/advertising-manage',
        component: './community-management/community-advertising/advertising-manage',
        hideInMenu: true,
      },
    ],
  }
  