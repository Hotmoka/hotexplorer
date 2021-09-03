import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(PortalVue)
Vue.config.productionTip = false


const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/hotexplorer', component: App },
    { path: '/hotexplorer/:address', component: App },
    { path: '*', redirect: '/hotexplorer' }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
