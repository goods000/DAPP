<template>
	<!-- 菜单模块 -->
	<uni-popup ref="menuPopup" type="top" :animation="true">
		<view class="menuBox">
			<view class="menuBox-wrapper">
				<view class="menuBox-item">首页</view>
				<view class="menuBox-item" @click="$tools.jump('../team/team')">海贼派系</view>
				<view class="menuBox-item">卡牌商店</view>
				<view class="menuBox-item">我的卡包</view>
				<view class="menuBox-item">市场交易</view>
				<view class="menuBox-item">海贼榜单</view>
				<view class="menuBox-item">市场交易</view>
				<view class="menuBox-item">集卡挖矿</view>
				<view class="menuBox-item">卡牌合成</view>
				<view class="menuBox-item">系统通知</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		timer(e) {
			console.log(e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/menuBox';
</style>
