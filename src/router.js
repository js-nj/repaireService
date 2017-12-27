// import Vue from 'vue';
// import VueRouter from 'vue-router';
import App from './App.vue';
import waitProcess from './pages/waitProcess.vue';
import waitRepair from './pages/waitRepair.vue';
import repaired from './pages/repaired.vue';
import rejected from './pages/rejected.vue';
import commented from './pages/commented.vue';
import post from './pages/post.vue';
import repairInfo from './pages/repairInfo.vue';
import workerIndex from './pages/workerIndex.vue';
import comment from './pages/comment.vue';
//import debug from './pages/debug.vue';

// Vue.use(VueRouter);
// let router = new VueRouter({
//   history: false
// })
export default {
	routes: [{
		path: '/waitProcess',
		name: 'waitProcess',
		component: waitProcess
	},{
		path: '/waitRepair',
		name: 'waitRepair',
		component: waitRepair
	},{
		path: '/repaired',
		name: 'repaired',
		component: repaired
	},{
		path: '/rejected',
		name: 'rejected',
		component: rejected
	},{
		path: '/commented',
		name: 'commented',
		component: commented
	},{
		path: '/post',
		name: 'post',
		component: post
	},{
		path: '/repairInfo/:info',
		name: 'repairInfo',
		component: repairInfo
	},{
		path: '/workerIndex',
		name: 'workerIndex',
		component: workerIndex
	},{
		path: '/comment',
		name: 'comment',
		component: comment
	}]
};
// export default function(router) {
// debugger
//   router.map({
//     '/': {
//       name: 'app',
//       component: App,
//       subRoutes: {
//         '/waitProcess': {
//           name: 'waitProcess',
//           component: waitProcess
//         },
//         '/waitRepair/:iswork': {
//           name: 'waitRepair',
//           component: waitRepair
//         },
//         '/repaired': {
//           name: 'repaired',
//           component: repaired
//         },
//         '/rejected': {
//           name: 'rejected',
//           component: rejected
//         },
//         '/commented': {
//           name: 'commented',
//           component: commented
//         }
//       }
//     },
//     '/post': {
//       name: 'post',
//       component: post,
//     },
//     '/repairInfo/:info': {
//       name: 'repairInfo',
//       component: repairInfo
//     },
//     '/debug': {
//       name: 'debug',
//       component: debug
//     }
//   })
// }
