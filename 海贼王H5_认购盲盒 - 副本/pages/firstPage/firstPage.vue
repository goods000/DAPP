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
		</view>
	</view>
</template>

<script>
import $tronWeb from '@/common/js/tronWeb.js';

let usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

export default {
	data() {
		return {
			accountResult: {},
			balance: 0,
			userWalletAddress: '非TRC地址',
			trxBalance: 0,
			usdtBalance: 0,
			transferHash: '---'
		};
	},
	onShow() {
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
					clearInterval(obj);
					this.userWalletAddress = window.tronWeb.defaultAddress.base58; //获取地址
					$tronWeb.getBalance(this.userWalletAddress, 6).then(result => {
						this.trxBalance = result;
					});
					$tronWeb.getContractBalance(this.userWalletAddress, usdtContractAddress, 6).then(result => {
						this.usdtBalance = result;
					});
				}
			}, 10);
		})();
	},
	methods: {
		transfer() {
			$tronWeb.getHashByTransfer(this.userWalletAddress, usdtContractAddress, 6, 'TAcSJQDoJXGuo2szkFGXguK7h8Kxh7aitw', 0.001).then(result => {
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
		
		&__data{
			word-break: break-all;
		}
		
		&__btn{
			margin-top: 30upx;
			font-size: 24upx;
		}
	}
}
</style>
