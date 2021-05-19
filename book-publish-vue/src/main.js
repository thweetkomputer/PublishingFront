import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/mystyle.css'
import axios from 'axios'
import './axios'
import Iview from 'iview'
import 'iview/dist/styles/iview.css'

router.beforeEach((to, from, next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

Vue.use(Iview)
Vue.use(Element)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/json';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
