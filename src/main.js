import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(PortalVue)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
