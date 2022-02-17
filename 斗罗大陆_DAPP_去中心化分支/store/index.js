import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		initLanguage: uni.getStorageSync('initLanguage'),

		/* 登录状态 */
		isLogin: uni.getStorageSync('token') != '',
		token: uni.getStorageSync('token'),
		
		/* 合约地址 */
		userWalletAddress: uni.getStorageSync('userWalletAddress') ? uni.getStorageSync('userWalletAddress') : '---',
		proContractAddress: 'TPf4edi7W35X729X4uNfrEjqUGXhs7V5Tu', //项目合约地址
		usdtContractAddress: 'TH2hJ3jqcn6RtPGk3F2aqeA1fxpnD8EC4C', //USDT合约地址
		platmentContractAddress: 'TBcgx5PwzqWTEaFfR8YkK37Qv1KBPj1xo1', //平台币合约地址
		bindboxContractAddress: 'TM8vJwB8uDtKxipy86gJhQvmZZ6CXQdZ5x', //盲盒合约地址
		cardContractAddress: 'TWGN1frmmraGKorMr4ZqknoV2uT9qw6aiB', //卡牌合约地址

		pageLazyLoading: {
			index: {
				loading: false
			},
			faction: {
				loading: false
			},
			ranking: {
				loading: false
			},
			backpack: {
				loading: false
			},
			shop: {
				loading: false
			},
			mining: {
				loading: false
			},
			market: {
				loading: false
			},
			synthesis: {
				loading: false
			}
		},
	},
	mutations: {
		changePageLazyLoading(state, type) {
			state.pageLazyLoading[type].loading = false;
		},
		changeToken(state, token) {
			state.token = token;
			state.isLogin = token != '';
		},
		changeUserWalletAddress(state, userWalletAddress) {
			uni.setStorageSync('userWalletAddress', userWalletAddress);
			state.userWalletAddress = userWalletAddress;
		},
		changeLanguage(state, type = 'cn') {
			state.initLanguage = type;
		}
	}
})

export default store
