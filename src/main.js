/*
 * @Author: xjh
 * @Date: 2021-12-03 09:46:51
 * @LastEditors: xjh
 * @LastEditTime: 2021-12-14 18:11:11
 * @Description:
 */
import Vue from 'vue'
import '../public/static/fonts/iconfont.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
// import './permission' // permission control
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

import XJHComponents from '../lib/xjh-components.common.js'
import '../lib/xjh-components.css'
Vue.use(XJHComponents)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
