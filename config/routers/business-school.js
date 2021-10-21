export default {
  path: '/business-school',
  name: 'business-school',
  routes: [
    {
      name: 'article-list',
      path: '/business-school/article-list',
      component: './business-school/article-list',
    },
    {
      name: 'shopkeeper-disclose',
      path: '/business-school/article-list/shopkeeper-disclose',
      component: './business-school/shopkeeper-disclose',
      hideInMenu: true
    },
    {
      name: 'article-category-list',
      path: '/business-school/article-category-list',
      component: './business-school/article-category-list',
    },
  ]
}