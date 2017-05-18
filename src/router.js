import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import waitProcess from './pages/waitProcess.vue';
import waitRepair from './pages/waitRepair.vue';
import repaired from './pages/repaired.vue';
import rejected from './pages/rejected.vue';
import commented from './pages/commented.vue';
import post from './pages/post.vue';
import repairInfo from './pages/repairInfo.vue';
import debug from './pages/debug.vue'

Vue.use(VueRouter);
let router = new VueRouter({
  history: false
})

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
  // router.beforeEach(function(transition) {
  //   if ((transition.from.name == 'waitProcess' || transition.from.name == 'waitRepair' || transition.from.name == 'repaired' || transition.from.name == 'rejected' || transition.from.name == 'commented') && transition.to.name == 'app') {
  //     alert("=======>")
  //     BH_MOBILE_SDK.UI.closeWebView()
  //   } else {
  //     transition.next()
  //   }
  // })
}
