<template>
	<!-- 背景模块 -->
	<view class="bgBox">
		<scroll-view scroll-x="true" :scroll-left="scrollLeft" class="bgBox-wrapper">
			<view class="bgBox-plane" :style="{ height: bgHeight, width: bgWidth }">
				<!-- <view class="bgBox-land"><image :src="i18n.index.land" mode="widthFix"></image></view> -->
				<view class="bgBox-land"><image :src="require(`@/static/index/icon-land-${$store.state.initLanguage}.png`)" mode="widthFix"></image></view>
				
				<view class="bgBox-water">
					<image src="@/static/index/gif/gif-water.gif" mode="widthFix"></image>
				</view>
				<view class="bgBox-bird">
					<image src="@/static/index/gif/gif-bird.gif" mode="widthFix"></image>
				</view>
				<view class="bgBox-balloon">
					<image src="@/static/index/gif/gif-balloon.gif" mode="widthFix"></image>
				</view>
				
				<view class="bgBox-btn bgBox-btn--1" @click="$tools.jump('../list/list')"></view>
				<view class="bgBox-btn bgBox-btn--2" @click="$tools.jump('../composite/composite')"></view>
				<view class="bgBox-btn bgBox-btn--3" @click="$tools.jump('../mining/mining')"></view>
				<view class="bgBox-btn bgBox-btn--4" @click="$tools.jump('../team/team')"></view>
				<view class="bgBox-btn bgBox-btn--5" @click="$tools.jump('../shop/shop')"></view>
				<view class="bgBox-btn bgBox-btn--6" @click="$tools.jump('../exchange/exchange')"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bgHeight: 0,
			bgWidth: 0,
			scrollLeft: 0
		};
	},
	created() {
		this.getBgInfo();
		// (async () => {
		// 	var obj = setInterval(async () => {
		// 		clearInterval(obj);
		// 	}, 100);
		// })();
	},
	methods: {
		getBgInfo() {
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					// console.log(res);
					that.bgHeight = res.windowHeight + 'px';
					// console.log(that.bgHeight);
					uni.getImageInfo({
						src: '../../static/index/img-bg.jpg',
						success: function(imgRes) {
							that.bgWidth = (res.windowHeight * imgRes.width) / imgRes.height + 'px';

							(async () => {
								var obj = setInterval(async () => {
									clearInterval(obj);
									console.log((res.windowHeight * imgRes.width) / imgRes.height);
									that.scrollLeft = (((res.windowHeight * imgRes.width) / imgRes.height) / 2) - 60;
								}, 100);
							})();
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/bgBox';
</style>
