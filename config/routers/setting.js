export default {
  path: '/setting',
  name: 'setting',
  routes: [
    {
      name: 'account-management',
      path: '/setting/account-management',
      component: './setting/account-management',
    },
    {
      name: 'role-management',
      path: '/setting/role-management',
      component: './setting/role-management',
    },
    {
      name: 'authority-management',
      path: '/setting/authority-management',
      component: './setting/authority-management',
    },
  ]
}
