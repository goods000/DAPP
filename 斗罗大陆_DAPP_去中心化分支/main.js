import Vue from 'vue'
import App from './App'
import store from './store'
import tools from './common/js/tools.js'
import Ajax from './common/js/ajax.js'
import * as filters from './common/js/filters.js'
import './components/ican-H5Api/ican-H5Api.js' //H5支持API
import i18n from './common/js/index18.js';

import tronWeb from '@/common/js/tronWeb.js';
import staticData from '@/common/js/staticData.js';


// import ourLoading from '@/components/our-loading/our-loading.vue'
// Vue.component('ourLoading', ourLoading)

import userInfoBox from '@/pages/common/userInfoBox.vue';
Vue.component('userInfoBox', userInfoBox);
import menuBox from '@/pages/common/menuBox.vue';
Vue.component('menuBox', menuBox);
import headerInfoBox from '@/pages/common/headerInfoBox.vue';
Vue.component('headerInfoBox', headerInfoBox);
import planeBox from '@/pages/common/planeBox.vue';
Vue.component('planeBox', planeBox);
import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading.vue';
Vue.component('lowkeyLoading', lowkeyLoading);


Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]) //插入过滤器名和对应方法
})

Vue.config.productionTip = false

Vue.prototype.$tools = tools
Vue.prototype.$Ajax = Ajax
Vue.prototype.$filters = filters
Vue.prototype.$store = store

Vue.prototype.$tronWeb = tronWeb
Vue.prototype.$staticData = staticData

/* 动态更改原生Navbar文字 */
Vue.prototype.$setNarBar = function(title) {
	if (uni.getStorageSync('initLanguage') == 'en') {
		uni.setNavigationBarTitle({
			title: title
		})
	}
}



Vue.mixin({
	computed: {
		pageTheme() {
			return this.$store.state.pageTheme
		},
		i18n() {
			return this.$t('message')
		}
	},
	// onShow() {
	// 	// 如果UI没有设计单色背景的话可以使用全局
	// 	this.$setStatusBarStyle();
	// }
})

// console.log('当前主题是：' + store.state.pageTheme)

App.mpType = 'app'

const app = new Vue({
	i18n,
	store,
	...App
})

app.$mount()
