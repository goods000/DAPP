<template>
	<!-- 头部 -->
	<view class="headerBox">
		<view class="headerBox-wrapper">
			<!-- <view class="headerBox-title">{{ i18n.menuBox.menuBox06 }}</view> -->
			<image class="headerBox-title" :src="require(`@/static/list/img-header-bg-${$store.state.initLanguage}.png`)" mode=""></image>
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
