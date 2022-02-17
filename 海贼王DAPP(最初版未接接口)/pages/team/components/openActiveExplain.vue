<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openActiveExplain" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openActiveExplain')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-header">派系活跃说明</view>
				<view class="popupBox-container">
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips"></view>
						<view class="popupBox-contentbg__tipsContent">每日进行派系签到即可获得一定值的活跃</view>
						<view class="popupBox-contentbg__tipsTitle">‘今日派系活跃系数’</view>
						<view class="popupBox-contentbg__tipsTitle">+</view>
						<view class="popupBox-contentbg__tipsTitle">今日最低战力增量÷昨日最低战力</view>
						<view class="popupBox-contentbg__tipsTitle">=</view>
						<view class="popupBox-contentbg__tipsContent">‘今日派系活跃系数’</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openActiveExplain')">我知道了</view>
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
