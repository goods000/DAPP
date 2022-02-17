<template>
	<!-- 菜单快捷栏 -->
	<view class="menuBox" :class="[{ 'menuBox--hasHolder': hasHolder }, { 'menuBox--hasShadow': hasShadow }]">
		<view class="menuBox-wrapper">
			<view class="menuBox-btn sprite sprite-icon-btn-01" @click="$tools.pathBack('pages/index/index')"></view>
			<view class="menuBox-btn sprite sprite-icon-btn-02" @click="$tools.jump('../faction/faction')"></view>
			<view class="menuBox-btn sprite sprite-icon-btn-03" @click="$tools.jump('../mining/mining')"></view>
			<view class="menuBox-btn sprite sprite-icon-btn-04" @click="$tools.jump('../synthesis/synthesis')"></view>
			<view class="menuBox-btn sprite sprite-icon-btn-05" @click="$tools.jump('../shop/shop')"></view>
			<view class="menuBox-btn sprite sprite-icon-btn-06" @click="$tools.jump('../market/market')"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		hasHolder: {
			type: Boolean,
			default: () => (false)
		},
		hasShadow: {
			type: Boolean,
			default: () => (false)
		}
	},
	data() {
		return {};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/menuBox';
</style>
