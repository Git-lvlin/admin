export default {
    path: '/community-management',
    name: 'community-management',
    routes: [
      {
        name: 'circle-management',
        path: '/community-management/circle-management',
        component: './community-management/circle-management/index.js',
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
        component: './community-management/circleinterior-management/index.js',
        hideInMenu: true,
      },
      {
        name: 'content-management',
        path: '/community-management/content-management',
        component: './community-management/content-management/index.js',
      },
      {
        name: 'add-content',
        path: '/community-management/content-management/add-content',
        component: './community-management/content-management/add-content',
        hideInMenu: true,
      },
      {
        name: 'dynamic-list-likes',
        path: '/community-management/content-management/dynamic-list-likes',
        component: './community-management/content-management/dynamic-list-likes',
        hideInMenu: true,
      },
      {
        name: 'dynamic-comment-reply-list',
        path: '/community-management/content-management/dynamic-comment-reply-list',
        component: './community-management/content-management/dynamic-comment-reply-list',
        hideInMenu: true,
      },
      {
        name: 'dynamic-get-dynamic-detail',
        path: '/community-management/content-management/dynamic-get-dynamic-detail',
        component: './community-management/content-management/dynamic-get-dynamic-detail',
        hideInMenu: true,
      },
      {
        name: 'consultation-management',
        path: '/community-management/consultation-management',
        component: './community-management/consultation-management/index.js',
      },
      {
        name: 'reporttype-management',
        path: '/community-management/reporttype-management',
        component: './community-management/reporttype-management/index.js',
      },
      {
        name: 'review-report',
        path: '/community-management/review-report',
        component: './community-management/review-report/index.js'
      },
      {
        name: 'admin-report-detail-list',
        path: '/community-management/review-report/admin-report-detail-list',
        component: './community-management/review-report/admin-report-detail-list',
        hideInMenu: true,

      },
      {
        name: 'invitation-report',
        path: '/community-management/invitation-report',
        component: './community-management/invitation-report/index.js'
      },
      {
        name: 'community-advertising',
        path: '/community-management/community-advertising',
        component: './community-management/community-advertising/index.js',
      },
      {
        name: 'add-advertising',
        path: '/community-management/community-advertising/add-advertising',
        component: './community-management/community-advertising/add-advertising',
        hideInMenu: true,
      },
      {
        name: 'advertising-manage',
        path: '/community-management/advertising-manage',
        component: './community-management/advertising-manage/index.js',
      },
    ],
  }
  