# 说明

>  非常简单的一个vue2 + vuex的项目，作为组织机构官网,比较合适。

>  前后端都有，后端用JAVA实现[后端项目](https://github.com/tangdada/homepage_backend)


## 项目运行（nodejs 6.0+）
``` bash
# 克隆到本地
git clone https://github.com/tangdada/homepage.git

# 进入文件夹
cd homepage

# 安装依赖
npm install

# 开启本地服务器localhost:8088
npm run dev

# 发布环境
npm run build
```


## 路由配置
```js
import App from '../App'

export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        component: r => require.ensure([], () => r(require('../page/home/home')), 'home')
    }, {
        path: '/item',
        component: r => require.ensure([], () => r(require('../page/quality/quality')), 'quality')
    }, {
        path: '/score',
        component: r => require.ensure([], () => r(require('../page/employee/employee')), 'employee')
    }]
}]

```


## 创建vue实例
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'

Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

new Vue({
	router,
	store,
}).$mount('#app')
```
