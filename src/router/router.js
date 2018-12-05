import App from '../App'

export default [{
	path: '/',
	component: App,
	children: [
		{ path: 'home', component: r => require.ensure([], () => r(require('../page/home/home.vue')), 'home') },
		{ path: 'structure', component: r => require.ensure([], () => r(require('../page/structure/structure')), 'structure') },
		{ path: 'implement', component: r => require.ensure([], () => r(require('../page/implement/implement')), 'implement') },
		{ path: 'quality', component: r => require.ensure([], () => r(require('../page/quality/quality')), 'quality') },
		{ path: 'employee', component: r => require.ensure([], () => r(require('../page/employee/employee')), 'employee') },

		{ path: 'news', component: r => require.ensure([], () => r(require('../page/news/news')), 'news') },
	]
}]