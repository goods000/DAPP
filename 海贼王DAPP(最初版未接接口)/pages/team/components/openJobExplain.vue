<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openJobExplain" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openJobExplain')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-header">派系职位说明</view>
				<view class="popupBox-container">
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">‘海大将’</view>
						<view class="popupBox-contentbg__tipsName">共一位,持有召集令的用户</view>
						<view class="popupBox-contentbg__tips">‘海军副手’</view>
						<view class="popupBox-contentbg__tipsName">共四位,为个体总战力派系排名前四的用户</view>
						<view class="popupBox-contentbg__tips">‘海军水手’</view>
						<view class="popupBox-contentbg__tipsName">共八位,为个体总战力派系排名第5~12位的用户</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openJobExplain')">我知道了</view>
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
