<template>
	<!-- 活跃度介绍 -->
	<uni-popup ref="activityPopup" type="center" :animation="true">
		<view class="initPopup">
			<view class="initPopup-wrapper">
				<view class="initPopup-picTitle"><image src="@/static/common/popup/icon-title.png" mode="widthFix"></image></view>
				<view class="initPopup-container initPopup-container--alignCenter">
					<view class="initPopup-title"><text>宗门活跃系数</text></view>
					<view class="initPopup-desc">今日宗门活跃系数=今日宗门打卡人数+宗门总人数+今日最低算力增量+昨日最低算力</view>
					<view class="initPopup-btn" @click="hidePopup('activityPopup')">好的，我知道啦</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
// @import '/scss/signInBox';
</style>
