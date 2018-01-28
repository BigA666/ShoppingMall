import './common/css/reset.css'
import './common/css/common.css'
import './common/css/style.css'
import './common/css/font-awesome.min.css'
import './common/css/swiper.min.css'
import './common/js/swiper-3.3.1.min'
import './http/axios'

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import message from './plugins/message'
import loading from './plugins/loading'

Vue.use(message)
Vue.use(loading)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
