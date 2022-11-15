import Vue from 'vue'
import App from './App.vue'
import './utils/rem.js'

import VueRouter from 'vue-router'
import router from './router/index.js'
// 挂载全局api
import api from './request/api'
// 引入ElementUI组件库
import ElementUI from 'element-ui';
//引入ElementUI的所有样式
import 'element-ui/lib/theme-chalk/index.css';
//使用ElementUI
import config from './request/config'

Vue.use(ElementUI)

Vue.prototype.$api = api
Vue.prototype.$config_upLoad = config.url + "Base/upload"//封装上传的接口
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
