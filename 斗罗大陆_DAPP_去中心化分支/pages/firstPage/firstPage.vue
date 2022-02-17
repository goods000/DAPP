<template>
	<view class="pages">
		<view class="itemBox">
			<view class="itemBox-item">
				<view class="itemBox-item__label">当前连接地址：</view>
				<view class="itemBox-item__data">{{ userWalletAddress }}</view>
			</view>
			<view class="itemBox-item">
				<view class="itemBox-item__label">getBalance() - 获取主网币TRX的余额：</view>
				<view class="itemBox-item__data">{{ trxBalance }}</view>
			</view>
			<view class="itemBox-item">
				<view class="itemBox-item__label">getContractBalance() - 获取代币USDT的余额：</view>
				<view class="itemBox-item__data">{{ usdtBalance }}</view>
			</view>
			<view class="itemBox-item">
				<view class="itemBox-item__label">getHashByTransfer() - 获取转账的交易哈希：</view>
				<view class="itemBox-item__data">{{ transferHash }}</view>
				<button class="itemBox-item__btn" type="default" @click="transfer()">发送</button>
			</view>
			<view v-for="(item,index) in gangList" :key="index">
				{{ $staticData.faction[item[0]] }}<br/>
				
				{{ item[2] | decimalValue(8) }}
			</view>
			
		</view>
	</view>
</template>

<script>
let usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
let testContractAddress = 'TX5JZUKdG3WPp7RDh7aymfawALA4xCeyBb';

export default {
	data() {
		return {
			accountResult: {},
			balance: 0,
			userWalletAddress: '非TRC地址',
			trxBalance: 0,
			usdtBalance: 0,
			transferHash: '---',
			
			gangList: [],
		};
	},
	onShow() {
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
					clearInterval(obj);

					// https://api.shasta.trongrid.io

					this.userWalletAddress = window.tronWeb.defaultAddress.base58; //获取地址
					// this.$tronWeb.getBalance(this.userWalletAddress, 6).then(result => {
					// 	this.trxBalance = result;
					// });
					// $tronWeb.getContractBalance(this.userWalletAddress, usdtContractAddress, 6).then(result => {
					// 	this.usdtBalance = result;
					// });
					
					
					

					this.getTestData()

					// this.main();
				}
			}, 10);
		})();
	},
	methods: {
		getTestData() {
			this.$tronWeb.triggerConstantContract(this.userWalletAddress, testContractAddress, 'getGangList()').then(result => {
				// console.log(result);
				/*
				 0：宗门ID
				 1: 66
				 2: 999
				 */
				this.gangList = this.$tronWeb.getFormatData(result.constant_result[0], 3);
				console.log(this.gangList)
			}).catch(error=>{
				console.log(error);
			});
			
			
			// const parameter1 = [];
			
			// return new Promise((resolve, reject) => {
			// 	window.tronWeb.transactionBuilder
			// 		.triggerConstantContract(window.tronWeb.address.toHex(testContractAddress), 'ss()', {}, parameter1, window.tronWeb.address.toHex(this.userWalletAddress))
			// 		.then(result => {
			// 			let content = result.constant_result[0];
			// 			console.log(this.$tronWeb.getFormatData(content, 3));
			// 			resolve(result);
			// 		});
			// });
		},

		// getFormatData(_HEX, _LENGTH) {
		// 	/*
		// 	_HEX：回调数据
		// 	_LENGTH：前后端定义的参数数量，根据数量整合数据
		// 	 */
		// 	var sliceArray = [];
		// 	let formatArray = [];
		// 	let childArray = [];
		// 	var sliceLength = 64; //ETH/TRON 地址 是256位，行业规则以64位截取

		// 	for (var i = 0, l = _HEX.length; i < l / sliceLength; i++) {
		// 		let sliceItem = _HEX.slice(sliceLength * i, sliceLength * (i + 1));
		// 		sliceArray.push(sliceItem);
		// 	}

		// 	for (var i = 0; i < sliceArray.length; i++) {
		// 		let itemData = tronWeb.toDecimal('0x' + sliceArray[i]);
		// 		childArray.push(itemData);

		// 		if (i % _LENGTH == _LENGTH - 1 && i !== 0) {
		// 			formatArray.push(childArray);
		// 			childArray = [];
		// 		}
		// 	}

		// 	return formatArray;
		// },

		transfer() {
			this.$tronWeb.getHashByTransfer(this.userWalletAddress, usdtContractAddress, 6, 'TAcSJQDoJXGuo2szkFGXguK7h8Kxh7aitw', 0.001).then(result => {
				console.log('交易哈希：', result);
				this.transferHash = result;
				// this.doExchange(result);
			});
			// window.tronWeb.trx.sendTransaction('TJJf81vfYvU7AC3USk3HVhXr9WfsJBEvYx', 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
.itemBox {
	&-item {
		padding: 30upx;
		border-bottom: 1upx dashed;

		&__label {
			font-size: 28upx;
			font-weight: 300;
			margin-bottom: 15upx;
		}

		&__data {
			word-break: break-all;
		}

		&__btn {
			margin-top: 30upx;
			font-size: 24upx;
		}
	}
}
</style>
