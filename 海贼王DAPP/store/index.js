import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		projectName: '海贼王',
		projectCurrencyName: 'HZIC',
		platmentCurrencyName: 'HBIC',
		USDTCurrencyName: 'USDT',
		initLanguage: uni.getStorageSync('initLanguage'),

		/* 登录状态 */
		isLogin: uni.getStorageSync('token') != '',
		token: uni.getStorageSync('token'),
		
		/* 音乐声音控制 */
		muteBgMusic: true, //false不禁用声音
		musicActive: false, //false不禁用声音
		
		/* 合约地址 */
		userWalletAddress: uni.getStorageSync('userWalletAddress') ? uni.getStorageSync('userWalletAddress') : '---',
		
		/* 正式合约地址 */
		loginContractAddress: 'THpiX3GCDbd2TvXDBoseAVCwpboYM1d2uS',
		HBICContractAddress: 'TJo5vJFgi2HF9YnH6tfYptaaYncWSVWqiX', //HBIC合约地址(Abi)
		HBICContractDecimal: 8, //HBIC的精度
		HBICContractAddress: 'TMq8Z632ZwHiHHRBXE8haXtSbQtB5ReTw3', //HBIC合约地址(Abi)
		HBICContractDecimal: 18, //HBIC的精度
		HZICContractAddress: 'TDbDKZyqbN5SVFYj6iXcsCvwp6ya3q3tNg', //HZIC平台币合约地址(Bbi)
		HZICContractDecimal: 16, //HZIC的精度
		
		marketTradeContractAddress: "TKHFBREFpMqbrx3kEmHdNJPubdASSLkifr", // 卡牌交易智能合约
		FeeContractAddress: 'TXao5aAM87r9DVppXT4qxWX4o8FqVRzBiu', //提取手续费地址
		incomeContractAddress: 'TB1BoWVKwRzXsL1B1dZA7tmcRzr8kdx2u3', //提取收益智能合约（盲盒购买收款地址）
		feeContractAddress: "TFL5tXPGUkSPkyuSe9UUjSeedTRbga6rNC", // 手续费收款地址
		feeContractDecimal: 6,  // 手续费精度
		miningContractAddress: 'TQqpE2usBnEaiLDQGkQ6FWAhGJBPs3FzZ9', //LP挖矿合约地址
		contractAddress_HZIC: 'TGSgoEA7CcWSjGK6s8tgL7FndARpymwkVR', //LP合约地址
		contractDecimal_HZIC: 18, //LP合约精度
		
		/* 测试合约地址 */
		// loginContractAddress: 'TAykNomv2FKQRqPmuKhiFGNNLn7hB9FWci',
		// HBICContractAddress: 'TLLDQoqTVXaENjZMyLi9p2ESXRRBK4Tj5z', //HBIC合约地址(Abi)
		// HBICContractDecimal: 8, //HBIC的精度
		// HZICContractAddress: 'TWJdBCCiAV1QrkLV5eAmjvr6VZYVdTx4aR', //HZIC平台币合约地址(Bbi)
		// HZICContractDecimal: 16, //HZIC的精度
		
		// gangContractAddress: 'TMvj6pTguUnXoJ9jKmVBp8dHS4yE8XSuBU', //宗门认购收款地址
		// marketTradeContractAddress: "TVV2zAEpUkZi5SibnN8ydDrygfEhKVWxh9", // 卡牌交易智能合约
		// FeeContractAddress: 'TMvj6pTguUnXoJ9jKmVBp8dHS4yE8XSuBU', //提取手续费地址
		// incomeContractAddress: 'TKBUdsoZkFUyNBSEiRq1i4qEEE1pbDQUWf', //提取收益智能合约（盲盒购买收款地址）
		// feeContractAddress: "TXR3F4BsmH1eMeujvAgThcivpqonrpRfkA", // 手续费收款地址
		// feeContractDecimal: 6,  // 手续费精度
		// // miningContractAddress: 'TYW4DxuhJqAisUXYrjV9bnmxXt5vNKHoKV', //LP挖矿合约地址
		// miningContractAddress: 'TCF8PsKrAqgZwKpvnDbYJSP2NnLPfDRdwP', //LP挖矿合约地址
		// contractAddress_HZIC: 'TArZbzm8cDaktPZcngXnHYZeQFQJniURwG', //LP合约地址
		// contractDecimal_HZIC: 6, //LP合约精度
		
		/* 测试合约地址 */
		// loginContractAddress: 'TAykNomv2FKQRqPmuKhiFGNNLn7hB9FWci',
		// usdtContractAddress: 'TH2hJ3jqcn6RtPGk3F2aqeA1fxpnD8EC4C', //USDT合约地址
		// usdtContractDecimal: 8, //USDT的精度
		// projectContractAddress: 'TH2hJ3jqcn6RtPGk3F2aqeA1fxpnD8EC4C', //HBIC合约地址(Abi)
		// projectContractDecimal: 8, //HBIC的精度
		// platmentContractAddress: 'TBcgx5PwzqWTEaFfR8YkK37Qv1KBPj1xo1', //HZIC平台币合约地址(Bbi)
		// platmentContractDecimal: 8, //HZIC的精度
		
		// cardContractAddress: 'TPTHF9LVQKdYkNq662LhcQt9m4u2Cyz6CT', //卡牌合约地址
		// gangContractAddress: 'TMvj6pTguUnXoJ9jKmVBp8dHS4yE8XSuBU', //宗门认购收款地址
		// marketTradeContractAddress: "TWW7bvBsCG5tGLv9B1DpFv7p8S5mesSWL3", // 卡牌交易智能合约
		// incomeContractAddress: 'TKKDoADqRWKiFZCUu3M6URAX519RJAjrnp', //提取收益智能合约
		// feeContractAddress: "TXR3F4BsmH1eMeujvAgThcivpqonrpRfkA", // 手续费收款地址
		// feeContractDecimal: 6,  // 手续费精度
		// miningContractAddress: 'TNdEYSyntM2g9fgyzLSnq6MkEYi4M2VGT4', //LP挖矿合约地址
		// dlwMiningContractAddress: 'TLUNjdh6sCtVsMPM5eQp1G5iRWUR9J4rWJ', //dlw合约地址
		// dlwMiningContractDecimal: 6, //dlw合约精度
		
		headerInfo: {}, //首页总信息
		userInfoRandom: 0,
		
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
			if (token == '') {
				uni.removeStorageSync('token')
			} else {
				uni.setStorageSync('token', token);
			}
			state.token = token;
			state.isLogin = token != '';
		},
		changeHeaderInfo(state, headerInfo){
			state.headerInfo = headerInfo;
		},
		changeMuteBgMusic(state, muteBgMusic){
			state.muteBgMusic = muteBgMusic;
		},
		changeMusicActive(state, musicActive){
			state.musicActive = musicActive;
		},
		changeUserWalletAddress(state, userWalletAddress) {
			uni.setStorageSync('userWalletAddress', userWalletAddress);
			state.userWalletAddress = userWalletAddress;
		},
		changeLanguage(state, type = 'cn') {
			uni.setStorageSync('initLanguage', type);
			state.initLanguage = type;
		},
		changeUserInfoRandom(state){
			state.userInfoRandom = Math.random();
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
