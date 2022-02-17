<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openRewardExplain" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openRewardExplain')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-header">俱乐部奖励说明</view>
				<view class="popupBox-container">
					<view class="popupBox-contentbg popupBox-contentBox">
						<view class="popupBox-contentbg__tipsBox">
							<text class="popupBox-contentbg__icon"></text>
							<text class="popupBox-contentbg__tipsType">派系奖励每日共15000枚,持续2000天,共计300000000枚</text>。
						</view>
						<view class="popupBox-contentbg__tipsBox">
							<text class="popupBox-contentbg__icon"></text>
							<text class="popupBox-contentbg__tipsType">每日共15000枚派系奖励,根据各派系的今日派系奖励核算战力占全网今日派系奖励核算战力的比例进行分配</text>
						</view>
						<view class="popupBox-contentbg__tipsBox">
							<text class="popupBox-contentbg__icon"></text>
							<text class="popupBox-contentbg__tipsType">派系内部根据职位进行分配： 1）海大将获取10%为派系税收奖励</text>
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openRewardExplain')">我知道了</view>
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
