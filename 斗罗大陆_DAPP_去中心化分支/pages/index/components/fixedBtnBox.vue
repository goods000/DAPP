<template>
	<!-- 右上角按钮集群 -->
	<view class="fixedBtnBox">
		<view class="fixedBtnBox-wrapper">
			<view class="fixedBtnBox-btn sprite sprite-icon-fixedBtn-setting" @click="openPopup('settingPopup')"></view>
			<view class="fixedBtnBox-btn sprite sprite-icon-fixedBtn-notice"></view>
			<view class="fixedBtnBox-btn sprite sprite-icon-fixedBtn-backpack" @click="$tools.jump('../backpack/backpack')"></view>
			<view class="fixedBtnBox-btn sprite sprite-icon-fixedBtn-ranking" @click="$tools.jump('../ranking/ranking')"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		openPopup(e) {
			this.$emit('openPopup', e);
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/fixedBtnBox';
</style>
