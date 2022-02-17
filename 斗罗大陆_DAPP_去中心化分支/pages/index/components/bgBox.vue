<template>
	<!-- 背景模块 -->
	<view class="bgBox">
		<scroll-view
			:scroll-x="scrollX"
			:scroll-y="false"
			refresher-background="#ffee00"
			:scroll-with-animation="true"
			:scroll-left="scrollLeft"
			class="bgBox-wrapper"
			@scroll="scroll"
			@scrolltoupper="scrolltoupper"
			@scrolltolower="scrolltolower"
		>
			<view class="bgBox-plane" :style="{ height: bgHeight, width: bgWidth }">
				<view class="bgBox-btn bgBox-btn--1" @click="$tools.jump('../faction/faction')"></view>
				<view class="bgBox-btn bgBox-btn--2" @click="$tools.jump('../ranking/ranking')"></view>
				<view class="bgBox-btn bgBox-btn--3" @click="$tools.jump('../synthesis/synthesis')"></view>
				<view class="bgBox-btn bgBox-btn--4" @click="$tools.jump('../shop/shop')"></view>
				<view class="bgBox-btn bgBox-btn--5" @click="$tools.jump('../market/market')"></view>
				<view class="bgBox-btn bgBox-btn--6" @click="$tools.jump('../mining/mining')"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollX: true,
			bgHeight: 0,
			bgWidthNum: 0,
			bgWidth: 0,
			// scrollLeft: 0,

			scrollLeft: 0,
			old: {
				scrollLeft: 0
			}
		};
	},
	created() {
		this.getBgInfo();
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
							that.bgWidthNum = (res.windowHeight * imgRes.width) / imgRes.height;
							that.bgWidth = (res.windowHeight * imgRes.width) / imgRes.height + 'px';
						}
					});
				}
			});
		},
		scroll(e) {
			this.old.scrollLeft = e.detail.scrollLeft;
		},
		scrolltoupper(e) {
			this.scrollLeft = this.old.scrollLeft;

			this.$nextTick(() => {
				this.scrollLeft = 0;
			});
			setTimeout(() => {
				this.scrollLeft = 0;
			}, 200);
		},
		scrolltolower(e) {
			this.scrollLeft = this.old.scrollLeft;

			this.$nextTick(() => {
				this.scrollLeft = this.bgWidthNum;
			});
			setTimeout(() => {
				this.scrollLeft = this.bgWidthNum;
			}, 200);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/bgBox';
</style>
