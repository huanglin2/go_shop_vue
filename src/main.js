/*
入口js
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockServer' // 加载mockServer即可
import VueLazyload from 'vue-lazyload'
import loading from './common/image/loading.gif'
import './filter' // 加载过滤器
// 注册全局组件标签
Vue.use(VueLazyload, {  // 内部多了一个lazy指令
  loading
})
Vue.component(Button.name, Button)
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
