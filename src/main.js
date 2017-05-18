import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routerconfig from './router'
import init from 'bh-mixin-sdk/lib/index.js';
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.options.emulateJSON = true;
Vue.http.options.credentials = true;

const router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  suppressTransitionError: true
})
routerconfig(router)

localStorage.removeItem("indexData")

let Init = () => {
  var App = Vue.extend({});
  router.start(App, 'body');
};

if (process.env.NODE_ENV === 'production') {
  init(() => {
    //var sdk = SDK();
    global.HOST = location.origin + "/publicapp";
    global.IMGHOST = location.origin;
    if (BH_MIXIN_SDK && BH_MIXIN_SDK.toggleNavBar) {
      BH_MIXIN_SDK.toggleNavBar(false);
    }
    Init()
  })
} else {
  global.HOST = 'http://amptest.wisedu.com/publicapp'
  global.IMGHOST = 'http://amptest.wisedu.com'
    // Init();
  init(() => {
    //var sdk = SDK();
    //global.HOST = 'http://amptest.wisedu.com/publicapp'
    //global.IMGHOST = 'http://amptest.wisedu.com'
    if (BH_MIXIN_SDK && BH_MIXIN_SDK.toggleNavBar) {
      BH_MIXIN_SDK.toggleNavBar(false);
    }
    Init()
  }, {
    wx: {
      debug: false,
      url: 'http://res.wisedu.com:8888/checkSign'
    },
    dd: 22
  })
}
