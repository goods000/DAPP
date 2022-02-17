<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openBuySuccess" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openBuySuccess')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image src="@/static/exchange/icon-buy-title.png" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">您已成功购买英雄：</view>
						<view class="popupBox-contentbg__tipsContent">紫色海贼汉库克英雄6张，可前往我的包裹中查看。</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openBuySuccess')">完成</view>
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
			address:'',
		};
	},
	methods: {
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
// @import '/scss/openPopupBox';
</style>
