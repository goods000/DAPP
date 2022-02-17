<template>
	<!-- 收益详情 -->
	<view class="rewardBox">
		<view class="rewardBox-wrapper">
			<view class="rewardBox-icon sprite sprite-icon-fixedBtn-reward"></view>
			<view class="rewardBox-data">6509.47</view>
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
@import '/scss/rewardBox';
</style>
