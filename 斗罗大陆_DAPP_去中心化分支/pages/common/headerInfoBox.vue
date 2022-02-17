<template>
	<!-- 头部信息 -->
	<view class="headerInfoBox">
		<view class="headerInfoBox-wrapper">
			<!-- 背景 -->
			<view class="headerInfoBox-bg"><image :src="headerBg" mode="widthFix"></image></view>

			<!-- 标题 -->
			<view class="headerInfoBox-title"><image :src="titleBg" mode="widthFix"></image></view>
			
			<!-- 发布按钮 -->
			<view class="headerInfoBox-publish" @click="openPopup('publishCardPopup')" v-if="publishBtn"><image src="@/static/market/icon-publish.png" mode="widthFix"></image></view>

			<!-- 导航 -->
			<view class="headerInfoBox-tabs tabsBox">
				<view class="tabsBox-wrapper">
					<slot></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['tabsActive', 'headerBg', 'titleBg', 'publishBtn'],
	data() {
		return {
			
		};
	},
	methods: {
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.$emit('changeTabsActive', index);
			}
		},
		openPopup(e) {
			this.$emit('openPopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/headerInfoBox';
</style>
