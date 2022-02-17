import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		projectName: '海贼王',
		projectCurrencyName: 'Bili',
		initLanguage: uni.getStorageSync('initLanguage'),
		
		/* 登录状态 */
		isLogin: uni.getStorageSync('token') != '',
		token: uni.getStorageSync('token'),
		userWalletAddress: '---',
	},
	mutations: {
		changeToken(state, token) {
			state.token = token;
			state.isLogin = token != '';
		},
		changeuserWalletAddress(state, userWalletAddress) {
			state.userWalletAddress = userWalletAddress;
		},
		changeLanguage(state, type = 'cn') {
			state.initLanguage = type;
		}
	}
})

export default store
