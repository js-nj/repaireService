import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routerconfig from './router'
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.options.emulateJSON = true;

const router = new VueRouter({
	hashbang: true,
	history: false,
	saveScrollPosition: true,
	suppressTransitionError: true
})
routerconfig(router)

let Init = () => {
  var App = Vue.extend({});
  router.start(App, 'body');
};

if (process.env.NODE_ENV === 'production') {
  Hybrid.Init(() => {
    global.HOST = site_url;
    Init();
  });
} else {
  global.HOST = 'http://amptest.wisedu.com'
  Init();
}
