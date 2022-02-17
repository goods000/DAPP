<template>
	<view class="pages">
		<!-- <view class="itemBox">
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
		</view> -->
	</view>
</template>

<script>
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
				if (window.tronWeb && window.tronWeb.defaultAddress.base58 && this.$store.state.token) {
					clearInterval(obj);
					
					if(window.location.search.indexOf('address=') > -1){
						this.locationSearch = window.location.search.split('?address=')[1].substring(0, 34);
					}
					this.init();
				}
			}, 10);
		})();
	},
	methods: {
		init(){
			this.getFactionalData();
		},
		getFactionalData() {
			this.$Ajax('/front/common/gang/data',{
					address: this.$store.state.userWalletAddress
				},
				res => {
					this.factionalData = res.obj;
					if(this.factionalData.myGang != '' || this.factionalData.myGang != null || this.factionalData.myGang != undefined){
						this.$tools.jump('../index/index');
					}
				}
			);
		},
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
