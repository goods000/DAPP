<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openPopupBox" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openPopupBox')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.package.openPopupBox.title }}</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__titleName">{{ boxDetails.ubxName }}</view>
						<view class="popupBox-contentbg__boxImage">
							<image :src="boxDetails.pic" mode="widthFix"></image>
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__zore3" @click="hidePopup('openPopupBox')">{{ i18n.global.cancel }}</view>
						<view class="popupBox-btn__zore2" @click="getByFee()">{{ i18n.package.openPopupBox.btn01 }}</view>
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
		};
	},
	methods: {
		init(){
			console.log("boxDetails：",this.boxDetails);
		},
		getByFee() {
			// this.$emit('openPopup', 'openPopupBoxDetail');
			// this.$Bus.$emit('boxInfo',this.boxDetails);
			let feeQuantity = 3.514 * Math.pow(10, this.$store.state.feeContractDecimal);
		
			window.tronWeb.trx.sendTransaction(this.$store.state.feeContractAddress, feeQuantity).then(result => {
				uni.showLoading({
					title: this.i18n.toast.OnConfirmation,
					mask: true
				});
		
				let timer = setInterval(() => {
					this.$tronWeb.getTransactionInfo(result.txid).then(transcationInfo => {
						console.log('transcationInfo ---> ', transcationInfo);
						if (transcationInfo != null && transcationInfo.receipt != null) {
							clearInterval(timer);
							uni.hideLoading();
							this.openPopupBoxDetail();
						}
					});
				}, 1000);
			});
		},
		openPopupBoxDetail(){
			this.$Ajax('/front/ubx/open', {
				address: this.$store.state.userWalletAddress,
				id: this.boxDetails.id
			}, res => {
				// 关闭盲盒详情
				this.$emit('refreshData');
				this.hidePopup('openPopupBox');
				this.boxInfo = res.obj;
				// 获取开启盲盒详情
				this.$emit('openPopup', 'openPopupBoxDetail');
				this.$Bus.$emit('boxInfo',this.boxInfo);
				// 删除盒子
				this.$Bus.$emit('removeBoxById',this.boxDetails.id);
				// console.log("this.boxDetails.id：",this.boxDetails.id);
			})
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopupBox';
</style>
