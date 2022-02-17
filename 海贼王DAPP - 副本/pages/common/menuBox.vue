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
				<view class="menuBox-item" @click="$tools.jump('../mining/mining')">集卡锻造</view>
				<view class="menuBox-item" @click="$tools.jump('../composite/composite')">海贼合成</view>
				<view class="menuBox-item" @click="$tools.jump('../myWealth/myWealth')">我的财富</view>-->
				
				<view class="menuBox-item" @click="goTo('../index/index')">{{ i18n.menuBox.menuBox01 }}</view>
				<view class="menuBox-item" @click="goTo('../team/team')">{{ i18n.menuBox.menuBox02 }}</view>
				<view class="menuBox-item" @click="goTo('../shop/shop')">{{ i18n.menuBox.menuBox03 }}</view>
				<view class="menuBox-item" @click="goTo('../package/package')">{{ i18n.menuBox.menuBox04 }}</view>
				<view class="menuBox-item" @click="goTo('../exchange/exchange')">{{ i18n.menuBox.menuBox05 }}</view>
				<view class="menuBox-item" @click="goTo('../list/list')">{{ i18n.menuBox.menuBox06 }}</view>
				<view class="menuBox-item" @click="goTo('../mining/mining')">{{ i18n.menuBox.menuBox07 }}</view>
				<view class="menuBox-item" @click="goTo('../composite/composite')">{{ i18n.menuBox.menuBox08 }}</view>
				<!-- <view class="menuBox-item" @click="goTo('../myWealth/myWealth')">{{ i18n.menuBox.menuBox09 }}</view> -->
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
		};
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
