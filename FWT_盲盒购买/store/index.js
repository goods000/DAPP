import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		projectName: 'FWT森林世界',
		projectCurrencyName: 'FWT',
		initLanguage: uni.getStorageSync('initLanguage'),
		
		/* 登录状态 */
		isLogin: uni.getStorageSync('token') != '',
		token: uni.getStorageSync('token'),
		
		
		userWalletAddress: uni.getStorageSync('userWalletAddress') ? uni.getStorageSync('userWalletAddress') : '---',
		
		/* 测试合约地址 */
		usdtContractAddress: 'TH2hJ3jqcn6RtPGk3F2aqeA1fxpnD8EC4C', //USDT合约地址
		usdtContractDecimal: 8, //USDT的精度
		platmentContractAddress: 'TNdEYSyntM2g9fgyzLSnq6MkEYi4M2VGT4', //平台币合约地址
		platmentContractDecimal: 8,
		feeContractAddress: "TXR3F4BsmH1eMeujvAgThcivpqonrpRfkA", // 手续费收款地址
		feeContractDecimal: 6,  // 手续费
		
		incomeContractAddress: 'TKKDoADqRWKiFZCUu3M6URAX519RJAjrnp', //提取收益智能合约（盲盒购买收款地址）
		marketTradeContractAddress: "TPTHF9LVQKdYkNq662LhcQt9m4u2Cyz6CT", // 卡牌交易智能合约
		gangContractAddress: 'TYmPCScyEpEurkUBRqyW7LZMGFTwPZWVjm', //宗门认购收款地址
		blindboxContractAddress: "TMvj6pTguUnXoJ9jKmVBp8dHS4yE8XSuBU", // 盲盒购买收款地址
	},
	mutations: {
		changeToken(state, token) {
			uni.setStorageSync('token', token);
			state.token = token;
			state.isLogin = token != '';
		},
		changeUserWalletAddress(state, userWalletAddress) {
			uni.setStorageSync('userWalletAddress', userWalletAddress);
			state.userWalletAddress = userWalletAddress;
		},
		changeLanguage(state, type = 'cn') {
			uni.setStorageSync('initLanguage', type);
			state.initLanguage = type;
		},
		/* 处理链上数据 */
		setFunctionQueue(state, [postType, postData]) {
			console.log(postType, postData);
			
			//处理未执行的函数
			let storageData = {
				postType: postType,
				postData: postData
			};
		
			let functionQueue = JSON.parse(uni.getStorageSync('functionQueue'));
			functionQueue.push(storageData);
			uni.setStorageSync('functionQueue', JSON.stringify(functionQueue));
		},
		deleteFunctionQueue(state, type) {
			let functionQueue = JSON.parse(uni.getStorageSync('functionQueue'));
		
			functionQueue.forEach((item, index) => {
				if (item.postType == type) {
					functionQueue.splice(index, 1);
					uni.setStorageSync('functionQueue', JSON.stringify(functionQueue));
				}
			});
		},
	}
})

export default store
