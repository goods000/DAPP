<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openWithdraw" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openWithdraw')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">提币</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">温馨提示：</view>
						<view class="popupBox-contentbg__tipsContent">请在提币前认真核对钱包地址是否有误，若因自己失误导致漏填、填错，其产生的财产损失须由自己承担，平台无法进行追回、无法进行赔偿。</view>
					</view>
					<view class="popupBox-input popupBox-input--flex">
						<view class="popupBox-input__title">{{ $store.state.projectCurrencyName }}</view>
						<input type="text" placeholder="请输入提币金额" v-model="price" placeholder-class="popupBox-input__style"/>
						<view class="popupBox-input__title">全部</view>
					</view>
					<view class="popupBox-cardTitle">当前可提：12.0000.00</view>
					<view class="popupBox-input">
						<input type="text" placeholder="请输入钱包地址" v-model="address" placeholder-class="popupBox-input__style"/>
					</view>
					<view class="popupBox-fee">手续费(Bili)：<text>210</text></view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="submit">提币</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			checkActive: '',
			quantity: 10,
			price:'',
			address:''
		};
	},
	methods: {
		submit(){
			this.$emit('openPopup', 'openSuccess');
			this.hidePopup('openWithdraw');
			this.price = '';
			this.address = '';
			// if (this.price == '') {
			// 	return this.$tools.toast('请输入提币金额');
			// }
			// if (this.address == '') {
			// 	return this.$tools.toast('请输入钱包地址');
			// }
			// this.$Ajax('',{
			// 		quantity: this.quantity,
			// 		address: this.address,
			// 	},
			// 	res => {
			// 		console.log(JSON.stringify(res));
			// 		if (res.code == 0) {
			// 			that.$tools.toastJump('修改成功', './safety');
			// 			this.$emit('openPopup', 'openSuccess');
			// 			this.hidePopup('openWithdraw');
			// 			this.address = '';
			// 		}
			// 	}
			// );
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
// @import '@/pages/package/components/scss/openPopupBox';
@import '/scss/openWithdraw';
@import '@/pages/exchange/components/scss/openSellingHeroes';
</style>
