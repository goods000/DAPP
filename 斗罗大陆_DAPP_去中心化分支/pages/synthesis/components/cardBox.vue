<template>
	<!-- 英雄卡组 -->
	<view class="cardBox">
		<scroll-view scroll-y="true" class="cardBox-wrapper">
			<view class="cardBox-plane">
				<view class="cardBox-dropdownBox dropdownBox">
					<view class="dropdownBox-header">
						<view class="dropdownBox-label">
							可合成
							<text class="dropdownBox-label--style1">金色</text>
							英雄
						</view>
						<view class="dropdownBox-arrow"></view>
					</view>
					<view class="dropdownBox-body">
						<view class="cardBox-item" v-for="(item, index) in 3" :key="index" @click="openPopup('syntheticCardPopup')">
							<view class="cardBox-item__header">
								<view class="cardBox-item__card"><image :src="index % 2 == 0 ? demoImg1 : demoImg2" mode="widthFix"></image></view>
								<view class="cardBox-item__gradBg" :class="index % 2 == 0 ? 'cardBox-item__gradBg--style5' : 'cardBox-item__gradBg--style4'">
									<view class="cardBox-item__power">59432</view>
								</view>
							</view>
							<view class="cardBox-item__content"><view class="cardBox-item__title">阿银*3</view></view>
						</view>
					</view>
				</view>
				<view class="cardBox-dropdownBox dropdownBox">
					<view class="dropdownBox-header">
						<view class="dropdownBox-label">
							可合成
							<text class="dropdownBox-label--style2">红色</text>
							英雄
						</view>
						<view class="dropdownBox-arrow"></view>
					</view>
					<view class="dropdownBox-body">
						<view class="cardBox-item" v-for="(item, index) in 5" :key="index" @click="openPopup('failPopup')">
							<view class="cardBox-item__header">
								<view class="cardBox-item__card"><image :src="index % 2 == 0 ? demoImg1 : demoImg2" mode="widthFix"></image></view>
								<view class="cardBox-item__gradBg" :class="index % 2 == 0 ? 'cardBox-item__gradBg--style5' : 'cardBox-item__gradBg--style4'">
									<view class="cardBox-item__power">59432</view>
								</view>
							</view>
							<view class="cardBox-item__content"><view class="cardBox-item__title">阿银*3</view></view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			demoImg1: require('@/static/public/card/icon-card-demo1.png'),
			demoImg2: require('@/static/public/card/icon-card-demo2.png')
		};
	},
	methods: {
		openPopup(e) {
			this.$emit('openPopup', e);
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/cardBox';
</style>
