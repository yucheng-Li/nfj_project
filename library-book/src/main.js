import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
Vue.config.productionTip = false
import axios from 'axios';
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
