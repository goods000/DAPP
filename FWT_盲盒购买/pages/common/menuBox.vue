<template>
	<!-- 菜单模块 -->
	<uni-popup ref="menuPopup" type="top" :animation="true">
		<view class="menuBox">
			<view class="menuBox-wrapper">
				<!-- <view class="menuBox-item" @click="$tools.jump('../index/index')">首页</view>
				<view class="menuBox-item" @click="$tools.jump('../team/team')">海贼派系</view>
				<view class="menuBox-item" @click="$tools.jump('../shop/shop')">海贼商店</view>
				<view class="menuBox-item" @click="$tools.jump('../package/package')">海贼包裹</view>
				<view class="menuBox-item" @click="$tools.jump('../exchange/exchange')">市场交易</view>
				<view class="menuBox-item" @click="$tools.jump('../list/list')">海贼榜单</view>
				<view class="menuBox-item" @click="$tools.jump('../mining/mining')">集卡挖矿</view>
				<view class="menuBox-item" @click="$tools.jump('../composite/composite')">海贼合成</view>
				<view class="menuBox-item" @click="$tools.jump('../myWealth/myWealth')">我的财富</view>-->
				
				<view class="menuBox-item" @click="goTo('../index/index')">首页</view>
				<view class="menuBox-item" @click="goTo('../team/team')">海贼派系</view>
				<view class="menuBox-item" @click="goTo('../shop/shop')">海贼商店</view>
				<view class="menuBox-item" @click="goTo('../package/package')">海贼包裹</view>
				<view class="menuBox-item" @click="goTo('../exchange/exchange')">市场交易</view>
				<view class="menuBox-item" @click="goTo('../list/list')">海贼榜单</view>
				<view class="menuBox-item" @click="goTo('../mining/mining')">集卡挖矿</view>
				<view class="menuBox-item" @click="goTo('../composite/composite')">海贼合成</view>
				<view class="menuBox-item" @click="goTo('../myWealth/myWealth')">我的财富</view>
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
		goTo(url){
			this.hidePopup('menuPopup');
			this.$tools.jump(url);
		},
		openPopup(e) {
			console.log("e：",e);
			console.log(this.$refs[e].$refs);
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		timer(e) {
			console.log(e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/menuBox';
</style>
