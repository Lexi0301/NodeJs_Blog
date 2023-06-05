import Vue from 'vue'
import App from '@/App.vue'
// element ui 完全引入
import ElementUI from 'element-ui'
import '@/assets/css/element-variables.scss'
import '@/assets/css/style.scss'

import router from '@/router/router-static.js';
// 面包屑导航，注册为全局组件
import BreadCrumbs from '@/components/common/BreadCrumbs'
// 引入echart
import echarts from 'echarts'

import 'echarts/theme/macarons.js'
// ajax
import http from '@/utils/http.js'
// 基础配置
import base from '@/utils/base'
// 工具类
import { isAuth, getCurDate, getCurDateTime } from '@/utils/utils'
// storage 封装
import storage from "@/utils/storage";
// 上传组件
import FileUpload from "@/components/common/FileUpload";
// 富文本编辑组件
import Editor from "@/components/common/Editor";
// api 接口
import api from '@/utils/api'
// 数据校验工具类
import * as validate from '@/utils/validate.js'
import '@/icons'

Vue.prototype.$validate = validate
Vue.prototype.$http = http // ajax请求方法
Vue.prototype.$echarts = echarts  
Vue.prototype.$base = base.get()
Vue.prototype.$storage = storage
Vue.prototype.$api = api
// 判断权限方法
Vue.prototype.isAuth = isAuth
Vue.use(ElementUI, { size: 'medium', zIndex: 3000 });
Vue.config.productionTip = false
// 组件全局组件
Vue.component('bread-crumbs', BreadCrumbs)
Vue.component('file-upload', FileUpload)
Vue.component('editor', Editor)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
