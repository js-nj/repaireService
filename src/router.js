var App = require('./App.vue')
var repairList = require('./pages/repairList.vue')
export default function(router) {
  router.map({
    '/': {
      name: 'app',
      component: App,
      subRoutes: {
        '/': {
          name: 'repairList',
          component: repairList
        }
      }
    }
  })
}