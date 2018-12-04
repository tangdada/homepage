import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import iView from 'iview'
import './style/common'
import './config/rem'

import 'iview/src/styles/index.less';
// 注册iView的组件为全局组件
Vue.use(iView)

// 富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

import filters from './config/filters'
Vue.use(filters)

Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

new Vue({
	router,
	store,
}).$mount('#app')