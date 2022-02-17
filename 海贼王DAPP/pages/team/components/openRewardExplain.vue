<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openRewardExplain" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openRewardExplain')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-header">{{ i18n.team.rewardTitle }}</view>
				<view class="popupBox-container">
					<view class="popupBox-contentbg popupBox-contentBox">
						<view class="popupBox-contentbg__tipsBox">
							<text class="popupBox-contentbg__icon"></text>
							<text class="popupBox-contentbg__tipsType">{{ i18n.team.rewardTips01 }}</text>。
						</view>
						<view class="popupBox-contentbg__tipsBox">
							<text class="popupBox-contentbg__icon"></text>
							<text class="popupBox-contentbg__tipsType">{{ i18n.team.rewardTips02 }}</text>
						</view>
						<!-- <view class="popupBox-contentbg__tipsBox">
							<text class="popupBox-contentbg__icon"></text>
							<text class="popupBox-contentbg__tipsType">{{ i18n.team.rewardTips03 }}</text>
						</view> -->
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openRewardExplain')">{{ i18n.global.ISee }}</view>
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
		};
	},
	methods: {
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopup';
</style>
