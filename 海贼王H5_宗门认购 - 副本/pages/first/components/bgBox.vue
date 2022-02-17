<template>
	<!-- 背景模块 -->
	<view class="bgBox">
		<view class="bgBox-wrapper" style="position: absolute;z-index: 2;">
			<image src="@/static/buyBox/icon-buyBox-bg.png" mode="widthFix"></image>
		</view>
		<view class="bgBox-wrapper" style="visibility: hidden;">
			<image src="@/static/first/img-bg.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	}, 
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/bgBox';
</style>
