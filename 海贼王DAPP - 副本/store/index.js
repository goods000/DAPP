import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		projectName: '海贼王',
		projectCurrencyName: 'OPC',
		platmentCurrencyName: 'BILI',
		USDTCurrencyName: 'USDT',
		initLanguage: uni.getStorageSync('initLanguage'),

		/* 登录状态 */
		isLogin: uni.getStorageSync('token') != '',
		token: uni.getStorageSync('token'),

		/* 音乐声音控制 */
		muteBgMusic: true, //false不禁用声音
		musicActive: false, //false不禁用声音

		/* 合约地址 */
		userWalletAddress: uni.getStorageSync('userWalletAddress') ? uni.getStorageSync('userWalletAddress') :
			'---',

		/* 正式合约地址 */
		loginContractAddress: 'THpiX3GCDbd2TvXDBoseAVCwpboYM1d2uS',
		HBICContractAddress: 'TFv8tJTRerBZnLZNuL1K9xD9zuDrdrVbFr', //HBIC合约地址(Abi)
		HBICContractDecimal: 18, //HBIC的精度
		OPCContractAddress: 'TDxLUaQUmNYuTtnqMyx4H9cr38hcV8vdWT', //OPC平台币合约地址(Bbi)
		OPCContractDecimal: 10, //OPC的精度

		gangContractAddress: "TAz6QpHfUnfXJN6bbrtzV7VhQ3jHC8g6a9", // 宗门收款地址
		marketTradeContractAddress: "TGuojUbpCqcR9suXhxSnBhCBjB6psxo6yf", // 卡牌交易智能合约
		incomeContractAddress: 'TSSajcGpMq69VBxdADKDGYUDPU9VqRriUA', //提取收益智能合约（盲盒购买收款地址）
		receiveFeeContractAddress: "TWkkWtebvj9FryJnKSJycthn81Qx3Xn2aV", // 提取手续费收款地址
		feeContractAddress: "TWkkWtebvj9FryJnKSJycthn81Qx3Xn2aV", // 手续费收款地址(开盲盒)
		feeContractDecimal: 6, // 手续费精度   
		miningContractAddress: 'TRPzZ7QDq6UL6yJrsqWRiCe7r4ShCetxK6', //LP挖矿合约地址
		contractAddress_OPC: 'TBLxYMP1SdPSwyNVa8FaGycPsimaaCEJbo', //LP合约地址
		contractDecimal_OPC: 6, //LP合约精度

		/* 测试合约地址 */
		// loginContractAddress: 'TAykNomv2FKQRqPmuKhiFGNNLn7hB9FWci',
		// HBICContractAddress: 'TEQNrYMveQLf8VR2w5bCVrRxagCPBinB7Z', //HBIC合约地址(Abi)
		// HBICContractDecimal: 18, //HBIC的精度
		// OPCContractAddress: 'TETCZMofJZGbfnaUXxnXc4atrGBkLyzqDT', //OPC平台币合约地址(Bbi)
		// OPCContractDecimal: 16, //OPC的精度

		// marketTradeContractAddress: "TJwoC2mG3uqEzkE48VfoUQPMMkYsxTJsF2", // 卡牌交易智能合约
		// incomeContractAddress: 'TMvj6pTguUnXoJ9jKmVBp8dHS4yE8XSuBU', //提取收益智能合约（盲盒购买收款地址）
		// receiveFeeContractAddress: "TMvj6pTguUnXoJ9jKmVBp8dHS4yE8XSuBU", // 手续费收款地址
		// feeContractAddress: "TW5tivdd86xasVmkEZ8RYHkJ8VoLFarTW8", // 手续费收款地址
		// feeContractDecimal: 6,  // 手续费精度
		// miningContractAddress: 'TCXMfpS8YuXXruacJ4Vm8xMEdbwBxomxQz', //LP挖矿合约地址
		// contractAddress_OPC: 'TCxpCet7N9PgpiWWoxPmcZczqDQtGSfJqJ', //LP合约地址
		// contractDecimal_OPC: 6, //LP合约精度

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
		changeHeaderInfo(state, headerInfo) {
			state.headerInfo = headerInfo;
		},
		changeMuteBgMusic(state, muteBgMusic) {
			state.muteBgMusic = muteBgMusic;
		},
		changeMusicActive(state, musicActive) {
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
		changeUserInfoRandom(state) {
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
