var App = require('./App.vue')
var waitProcess = require('./pages/waitProcess.vue')
var waitRepair = require('./pages/waitRepair.vue')
var repaired = require('./pages/repaired.vue')
var rejected = require('./pages/rejected.vue')
var commented = require('./pages/commented.vue')
var post = require('./pages/post.vue')
export default function(router) {
  router.map({
    '/': {
      name: 'app',
      component: App,
      subRoutes: {
        '/': {
          name: 'waitProcess',
          component: waitProcess
        },
        '/waitProcess': {
          name: 'waitProcess',
          component: waitProcess
        },
        '/waitRepair': {
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
    }
  })
}