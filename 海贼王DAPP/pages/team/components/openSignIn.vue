<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openSignIn" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openSignIn')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image src="@/static/team/icon-team-signIn.png" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">恭喜您</view>
						<view class="popupBox-contentbg__tipsContent">今日已完成海贼派系签到</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openSignIn')">我知道了</view>
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
// @import '/scss/openPopupBox';
.popupBox{
	&-contentbg{
		&__tipsContent{
			text-align: center;
		}
	}
}
</style>
