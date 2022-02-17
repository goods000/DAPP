<template>
	<view class="footerBox">
		<view class="footerBox-wrapper">
			<view class="footerBox-attributes">
				<view class="footerBox-attributes__item footerBox-attributes__item--power">
					<view class="footerBox-attributes__item-icon"></view>
					<view class="footerBox-attributes__item-data">{{ $store.state.headerInfo.totalHash }}</view>
				</view>
				<view class="footerBox-attributes__item footerBox-attributes__item--using">
					<view class="footerBox-attributes__item-data">{{ platmentBalance }}</view>
					<view class="footerBox-attributes__item-icon"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			totalHash: 0,
			platmentBalance: 0
		};
	},
	watch: {
		'$store.state.userInfoRandom': function() {
			this.getTotalHash();
			this.getPlatmentBalance();
		}
	},
	mounted() {
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58 && this.$store.state.token) {
					clearInterval(obj);
	
					/* 事件 */
					this.getTotalHash();
					this.getPlatmentBalance();
				}
			}, 100);
		})();
	},
	methods: {
		getPlatmentBalance() {
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.userWalletAddress
				}
			];
			this.$tronWeb.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.HZICContractAddress, 'balanceOf(address)', parameter).then(result => {
				let balance = window.tronWeb.toDecimal('0x' + result.constant_result[0]) / Math.pow(10, this.$store.state.HZICContractDecimal);
				if(!/.*\..*/.test(balance)){
					this.platmentBalance = balance;
					// console.log("this.platmentBalance---1：",this.platmentBalance);
				}else{
					this.platmentBalance = balance.toFixed(6);
					// console.log("this.platmentBalance---2：",this.platmentBalance);
				}
				
			});
		},
		getTotalHash() {
			this.$Ajax('/front/common/total/hash', {}, res => {
				this.$store.commit('changeHeaderInfo', res.obj);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/footerBox';
</style>
