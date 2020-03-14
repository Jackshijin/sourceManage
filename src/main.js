// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import store from './store/store'
import md5 from 'js-md5'
import moment from 'moment'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:5050'
Vue.prototype.$axios = axios
// Vue.prototype.$baseURL = baseURL
Vue.prototype.$md5 = md5
Vue.prototype.$moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
