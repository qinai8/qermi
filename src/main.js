import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import '@/global.js'//全局
// 控制路由表的js文件
import '@/permission.js'
import Cookie from "js-cookie"
Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
