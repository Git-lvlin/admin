const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/product-performance-management',
  name: 'product-performance-management',
  routes: [
    {
      name: 'new-intensive-performance',
      path: '/product-performance-management/new-intensive-performance',
      component: './product-performance-management/new-intensive-performance',
      wrappers: [RouteWatcher],
    }
  ]
}