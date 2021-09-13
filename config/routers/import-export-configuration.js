export default {
  path: '/import-export-configuration',
  name: 'import-export-configuration',
  routes: [
    {
      name: 'export-configuration',
      path: '/import-export-configuration/export-configuration',
      component: './import-export-configuration/export-configuration',
    },
    {
      name: 'import-configuration',
      path: '/import-export-configuration/import-configuration',
      component: './import-export-configuration/import-configuration'
    }
  ]
}
