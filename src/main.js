import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VueRouter from 'vue-router'
import {NetworkHolder} from "@/internal/NetworkHolder";

Vue.use(VueRouter)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(PortalVue)
Vue.config.productionTip = false

Vue.prototype.$network = new NetworkHolder()

const router = new VueRouter({
  mode: 'history',
  base: '/hotexplorer/',
  routes: [
    { path: '/', component: App },
    { path: '*', redirect: '/' }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
