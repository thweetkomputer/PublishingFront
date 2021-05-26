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
//引入summernote
import 'bootstrap'
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'summernote'
import 'summernote/dist/summernote.css'
import 'summernote/lang/summernote-zh-CN'
import './assets/css/icon/iconfont.css'
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
