<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openPopupBuyBox" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openPopupBuyBox')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.index.buyBox }}</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__titleName">{{ boxDetails.name }}</view>
						<view class="popupBox-contentbg__boxImage">
							<image :src="boxDetails.pic" mode="widthFix"></image>
							<!-- <view class="popupBox-contentbg__boxImage-title">盲盒数量：
								<view class="popupBox-contentbg__boxImage-title__num">{{ boxDetails.name }}</view>
							</view> -->
						</view>
					</view>
					<view class="popupBox-cardTitle">{{ i18n.index.tips01 }}</view>
					<view class="popupBox-operate">
						<view class="popupBox-operate__btn" @click="reduceBtn()">
							<image src="@/static/public/icon-reduce.png" mode="widthFix"></image>
						</view>
						<view class="popupBox-operate__num">{{ quantity }}</view>
						<view class="popupBox-operate__btn" @click="plusBtn()">
							<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__zore3" @click="hidePopup('openPopupBuyBox')">{{ i18n.status.cancelled }}</view>
						<view class="popupBox-btn__zore2" @click="getBuy()">{{ i18n.global.confirm }}</view>
					</view>
					<view class="popupBox-data">
						<view class="popupBox-data__num">{{ i18n.index.pay }}：{{ boxDetails.usdtPrice | number(2) }}USDT</view>
						<view class="popupBox-data__num">{{ i18n.index.balance }}：{{ total | number(2) }}USDT</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['boxDetails'],
	data() {
		return {
			checkActive: '',
			quantity: 1,
			total: 0,
			userWallet: '',
			boxCount: 0,
		};
	},
	watch:{
		quantity(newValue, oldValue) {
			console.log('newValue：',newValue);
			if(newValue == ''){
				this.total = this.quantity * this.boxDetails.usdtPrice;
				return
			}else{
				this.total = newValue * this.boxDetails.usdtPrice;
			}
		},
	},
	mounted() {
		// this.total = this.quantity * this.boxDetails.usdtPrice;
		// this.getBalance();
	},
	methods: {
		init(){
			this.quantity = 1;
			console.log("this.boxDetails",this.boxDetails);
			this.total = this.quantity * this.boxDetails.usdtPrice;
			this.getCardBoxCount();
			this.getBalance();
		},
		// 获取盲盒总数
		getCardBoxCount(){
			this.$Ajax('/front/ubx/resume', {}, res => {
				this.boxCount = res.obj;
			});
		},
		// 点击购买启动链上
		getBuy(){
			if (this.quantity > this.boxCount || this.quantity > this.boxDetails.total - this.boxDetails.qty) {
				return this.$tools.toast(this.i18n.index.toast01);
			}
			
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.blindboxContractAddress
				},
				{
					type: 'uint256',
					value: this.total * Math.pow(10, this.$store.state.usdtContractDecimal)
					// value: this.$BigNumber(this.total).times(Math.pow(10, this.$store.state.usdtContractDecimal)).toFixed()
				}
			];
			
			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.usdtContractAddress, 'transfer(address,uint256)', parameter).then(result => {
				this.$store.commit('setFunctionQueue', ['buyBox', {
					hash: result.txid,
					id: this.boxDetails.id,
					qty: this.quantity
				}])
				uni.showLoading({
					title: this.i18n.global.loading,
					mask: true
				});
			
				let timer = setInterval(() => {
					this.$tronWeb.getTransactionInfo(result.txid).then(transcationInfo => {
						console.log('transcationInfo ---> ', transcationInfo);
						if (transcationInfo != null && transcationInfo.receipt != null) {
							clearInterval(timer);
							uni.hideLoading();
			
							if (transcationInfo.receipt.result == 'SUCCESS') {
								this.submit(result.txid);
							} else {
								this.$tools.toast(this.i18n.shop.toast02);
								this.$store.commit('deleteFunctionQueue', 'buyBox');
							}
						}
					});
				}, 1000);
			});
		},
		submit(hash) {
			let that = this;
			let num = that.quantity;
			that.$Ajax('/front/ubx/buy',{
					hash: hash,
					id: that.boxDetails.id,
					qty: that.quantity
				},
				res => {
					this.$store.commit('deleteFunctionQueue', 'buyBox');
					
					that.hidePopup('openPopupBuyBox');
					that.$emit('openPopup', 'openSuccess');
					let successData = {
						num: num,
						name: that.boxDetails.name,
					}
					console.log("successData",successData);
					that.$Bus.$emit('successData',successData);
				}
			);
		},
		// 获取钱包余额
		getBalance(){
			this.$tronWeb.getContractBalance(this.$store.state.userWalletAddress, this.$store.state.usdtContractAddress, this.$store.state.usdtContractDecimal).then(result => {
				uni.showLoading({
					title: this.i18n.toast.InBalanceQuery,
					mask: true
				});
				console.log("result：",result);
				if(this.result != ''){
					this.userWallet = result;
					uni.hideLoading();
				}
			});
		},
		reduceBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			this.quantity++;
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {
			this.quantity = 1;			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
// @import '/scss/openPopupBox';
@import  '/scss/openbuyHero.scss';
.popupBox{
	&-btnPadding{
		padding: 0 0 20upx;
	}
	&-data{
		padding: 20upx 0 60upx;
	}
}
</style>
