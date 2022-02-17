<template>
	<!-- 头部 -->
	<view class="headerBox">
		<view class="headerBox-wrapper">
			<view class="headerBox-title">海贼包裹</view>
			<view class="headerBox-close" @click="$tools.pathBack('pages/index/index')"></view>
			<view class="headerBox-arrow" @click="openMenu"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		openMenu(){
			this.$emit('openPopup', 'menuPopup');
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/headerBox';
</style>
