var App = require('./App.vue')
var waitProcess = require('./pages/waitProcess.vue')
var waitRepair = require('./pages/waitRepair.vue')
var repaired = require('./pages/repaired.vue')
var rejected = require('./pages/rejected.vue')
var commented = require('./pages/commented.vue')
var post = require('./pages/post.vue')
var repairInfo = require('./pages/repairInfo.vue')
var debug = require('./pages/debug.vue')
export default function(router) {
  router.map({
    '/': {
      name: 'app',
      component: App,
      subRoutes: {
        '/waitProcess': {
          name: 'waitProcess',
          component: waitProcess
        },
        '/waitRepair/:iswork': {
          name: 'waitRepair',
          component: waitRepair
        },
        '/repaired': {
          name: 'repaired',
          component: repaired
        },
        '/rejected': {
          name: 'rejected',
          component: rejected
        },
        '/commented': {
          name: 'commented',
          component: commented
        }
      }
    },
    '/post': {
      name: 'post',
      component: post,
    },
    '/repairInfo/:info': {
      name: 'repairInfo',
      component: repairInfo
    },
    '/debug': {
      name: 'debug',
      component: debug
    }
  })
}
