<template>
	<!-- 面板 -->
	<view class="planeBox">
		<view class="planeBox-wrapper" :style="`background-image: url(${planeBg})`">
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	props: ['planeBg'],
	data() {
		return {};
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/planeBox';
</style>
