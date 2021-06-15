export default {
  path: '/cms',
  name: 'cms',
  routes: [
    {
      name: 'banner-admin',
      path: '/cms/banner-admin',
      component: './cms/banner-admin',
    },
    {
      name: 'goos-reg',
      path: '/cms/goos-reg',
      routes: [
        {
          name: 'member',
          path: '/cms/goos-reg/member',
          component: './cms/goos-reg/member'
        },
        {
          name: 'hot-goos',
          path: '/cms/goos-reg/hot-goos',
          component: './cms/goos-reg/hot-goos'
        },
        {
          name: 'crazy-date',
          path: '/cms/goos-reg/crazy-date',
          component: './cms/goos-reg/crazy-date'
        },
        {
          name: 'save-money',
          path: '/cms/goos-reg/save-money',
          component: './cms/goos-reg/save-money',
        },
        {
          name: 'strategy-today',
          path: '/cms/goos-reg/strategy-today',
          component: './cms/goos-reg/strategy-today',
        }
      ]
    },
    {
      name: 'home-suspension',
      path: '/cms/home-suspension',
      component: './cms/home-suspension',
    },
    {
      name: 'express-news',
      path: '/cms/express-news',
      component: './cms/express-news',
    },
    {
      name: 'king-kong-district',
      path: '/cms/king-kong-district',
      component: './cms/king-kong-district',
    },
    {
      name: 'price-comparsion',
      path: '/cms/price-comparsion',
      routes: [
        {
          name: 'home-list',
          path: '/cms/price-comparsion/home-list',
          component: './cms/price-comparsion/home-list',
        },
        {
          name: 'low-goods',
          path: '/cms/price-comparsion/low-goods',
          component: './cms/price-comparsion/low-goods',
        },
      ],
    },
    {
      name: 'route-url-deploy',
      path: '/cms/route-url-deploy',
      component: './cms/route-url-deploy',
    },
    {
      name: 'hot-search',
      path: '/cms/hot-search',
      component: './cms/hot-search',
    }
  ]
}