// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import myServer from './plugins/http'
import moment from 'moment'
import bread from './components/custom/bread.vue'
Vue.use(ElementUI)
Vue.use(myServer)

Vue.config.productionTip = false

/* eslint-disable no-new */
// 使用monet插件格式化
Vue.filter('DateFormat', value => {
  return moment(value).format('YYYY-MM-DD')
})
// 创建全局vue组件，必须在实力前创建
Vue.component(bread.name, bread) // 注册面包屑组件
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
