<template>
	<uni-popup ref="openSuccessPopup" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openSuccessPopup')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image :src="require(`@/static/mining/icon-buyWatie-${$store.state.initLanguage}.png`)"  mode="widthFix"></image>
						<!-- <image src="@/static/mining/icon-buySuccess.png" mode="widthFix"></image> -->
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">{{ i18n.mining.openSuccessPopup.tips01 }}</view>
						<view class="popupBox-contentbg__tips"> {{ available }} {{ $store.state.projectCurrencyName }}</view>
						<view class="popupBox-contentbg__colorContent">{{ i18n.mining.openSuccessPopup.tips02 }}</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openSuccessPopup')">{{ i18n.global.ISee }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['available'],
	data() {
		return {
		};
	},
	methods: {
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
// @import '/scss/openPopupBox';
.popupBox{
	&-contentbg{
		&__tipsContent{
			text-align: center;
		}
	}
}
</style>
