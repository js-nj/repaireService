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
var App = Vue.extend({})
router.start(App, 'body')