// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import BaiduMap from 'vue-baidu-map'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';  // 使用 CSS
Vue.use(ViewUI)

Vue.use(BaiduMap, {
  ak: '2lMRUPS4A1g1cHniwuHks0s1eUPnkew4'
})
Vue.config.productionTip = false
axios.defaults.withCredentials = true
axios.defaults.timeout = 1000 * 15
window.axios = axios;

axios.interceptors.response.use(response => {
  if(!response.data.state) {
    // Toast(response.data.error.join('，'))
}
return response
}, error => {
  switch (error.response.status) {
    case 500:
    this.$Message.info('服务器内部错误');
    // Toast('服务器内部错误')
    break;
    case 401:
    this.$Message.info('登录失效，请重新登录');
    // Toast('登录失效，请重新登录')
    break;
    case 403:
    this.$Message.info('禁止访问');
    // Toast('禁止访问')
    break;
}
return Promise.reject(error);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
