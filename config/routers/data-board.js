export default {
  name: 'data-board',
  path: '/data-board',
  routes: [
    {
      name: 'data-board-detail',
      path: '/data-board/data-board',
      component: './data-board/data-board'
    },
    {
      name: 'sales-data',
      path: '/data-board/sales-data',
      component: './data-board/sales-data'
    },
    {
      name: 'class-of-view',
      path: '/data-board/class-of-view',
      component: './data-board/class-of-view',
      hidenMenu: true
    },
    {
      name: 'ranking',
      path: '/data-board/ranking',
      component: './data-board/ranking',
      hidenMenu: true
    },
    {
      name: 'order',
      path: '/data-board/order/:id',
      component: './data-board/order-list',
      hidenMenu: true
    },
    {
      name: 'GMV-detail',
      path: '/data-board/GMVDetail',
      component: './data-board/GMV-detail',
      hidenMenu: true
    },
    {
      name: 'sales-detail',
      path: '/data-board/sales-detail',
      component: './data-board/sales-detail',
      hidenMenu: true
    }
  ]
}