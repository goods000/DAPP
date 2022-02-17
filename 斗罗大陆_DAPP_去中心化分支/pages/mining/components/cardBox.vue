<template>
	<!-- 英雄卡组 -->
	<view class="cardBox">
		<scroll-view scroll-y="true" class="cardBox-wrapper">
			<view class="cardBox-plane">
				<view
					class="cardBox-item sprite"
					:class="[
						{ 'cardBox-item--grayscale': index % 3 == 1 || index % 3 == 2 },
						{ 'cardBox-item--equipped': index % 3 == 1 },
						{ 'cardBox-item--locked': index % 3 == 2 }
					]"
					v-for="(item, index) in 18"
					:key="index"
					@click="checkToPopup(index % 3)"
				>
					<view class="cardBox-item__header">
						<view class="cardBox-item__card"><image :src="demoImageList[index % 3]" mode="widthFix"></image></view>
						<view class="cardBox-item__gradBg" :class="index % 3 == 0 ? 'cardBox-item__gradBg--style5' : 'cardBox-item__gradBg--style4'" v-if="index % 3 == 0">
							<view class="cardBox-item__power">59432</view>
						</view>
						<view class="cardBox-item__btnText" v-if="index % 3 == 1">
							点击
							<br />
							装备
						</view>
						<view class="cardBox-item__locked" v-if="index % 3 == 2"></view>
					</view>
					<view class="cardBox-item__content"><view class="cardBox-item__title">阿银</view></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			demoImageList: [
				require('@/static/public/card/icon-card-demo1.png'),
				require('@/static/public/card/icon-card-demo2.png'),
				require('@/static/public/card/icon-card-demo3.png')
			]
		};
	},
	methods: {
		checkToPopup(type) {
			if (type == 0) {
				this.$emit('changeCardSlotStatus', 0);
				this.openPopup('cardSlotPopup');
			} else if (type == 1) {
				this.$emit('changeCardSlotStatus', 1);
				this.openPopup('cardSlotPopup');
			}
		},
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
