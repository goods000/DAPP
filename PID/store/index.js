import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		projectName: 'PID',
		projectCurrencyName: 'PID',
		initLanguage: uni.getStorageSync('initLanguage'),
		/* 登录状态 */
		isLogin: uni.getStorageSync('token') != '',
		token: uni.getStorageSync('token'),
		userWalletAddress: uni.getStorageSync('userWalletAddress'),
		// currencyInfo: uni.getStorageSync('currencyInfo'),
		currencyInfo_USDT: uni.getStorageSync('currencyInfo_USDT'),
		currencyInfo_PID: uni.getStorageSync('currencyInfo_PID'),
		
		web3: undefined,
	},
	mutations: {
		changeToken(state, token) {
			state.token = token;
			state.isLogin = token != '';
		},
		changeuserWalletAddress(state, userWalletAddress) {
			state.userWalletAddress = userWalletAddress;
		},
		// changecurrencyInfo(state, currencyInfo) {
		// 	state.currencyInfo = currencyInfo;
		// },
		changecurrencyInfo_USDT(state, currencyInfo_USDT) {
			state.currencyInfo_USDT = currencyInfo_USDT;
		},
		changecurrencyInfo_PID(state, currencyInfo_PID) {
			state.currencyInfo_PID = currencyInfo_PID;
		},
		changeLanguage(state, type = 'cn') {
			state.initLanguage = type;
		}
	}
})

export default store
