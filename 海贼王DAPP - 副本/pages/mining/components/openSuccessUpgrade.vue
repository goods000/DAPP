<template>
	<uni-popup ref="openSuccessUpgrade" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openSuccessUpgrade')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image src="@/static/mining/icon-upgradeSuccess.png" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">{{ i18n.mining.openSuccessPopup.tips03 }}</view>
						<view class="popupBox-contentbg__tips"> {{ income }} {{ i18n.mining.openSuccessPopup.tips04 }}</view>
						<view class="popupBox-contentbg__colorContent">{{ i18n.mining.openSuccessPopup.tips05 }}</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openSuccessUpgrade')">{{ i18n.global.ISee }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['income',],
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
