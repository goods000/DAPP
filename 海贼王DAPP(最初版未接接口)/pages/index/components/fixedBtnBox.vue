<template>
	<!-- 右上角按钮集群 -->
	<view class="fixedBtnBox">
		<view class="fixedBtnBox-wrapper">
			<view class="fixedBtnBox-btn"><image src="@/static/index/fixedBtn/icon-fixedBtn-setting.png" mode="widthFix"></image></view>
			<view class="fixedBtnBox-btn"><image src="@/static/index/fixedBtn/icon-fixedBtn-notice.png" mode="widthFix"></image></view>
			<view class="fixedBtnBox-btn"><image src="@/static/index/fixedBtn/icon-fixedBtn-backpack.png" mode="widthFix"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
@import '/scss/fixedBtnBox';
</style>
