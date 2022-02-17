<template>
	<!-- 头部 -->
	<view class="footerBox">
		<view class="footerBox-wrapper">
			<view class="footerBox-attributes">
				<view class="footerBox-attributes__item footerBox-attributes__item--power">
					<view class="footerBox-attributes__item-icon"></view>
					<view class="footerBox-attributes__item-data">59432</view>
				</view>
				<view class="footerBox-attributes__item footerBox-attributes__item--using">
					<view class="footerBox-attributes__item-data">594</view>
					<view class="footerBox-attributes__item-icon"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {
		console.log('底部触发');
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
@import '/scss/footerBox';
</style>
