<template>
	<!-- 成交记录 -->
	<view class="recordBox">
		<scroll-view scroll-y="true" class="recordBox-wrapper">
			<view class="recordBox-plane">
				<view class="recordBox-orderBox orderBox">
					<scroll-view scroll-y="true" class="orderBox-wrapper">
						<view class="orderBox-list" v-for="(item, index) in 20" :key="index">
							<view class="orderBox-list__date initTitle"><view class="initTitle-label">2021.11.02 10:24:20</view></view>
							<view class="orderBox-list__body">
								<view class="orderBox-list__item">
									<view class="orderBox-list__item-label">英雄品质</view>
									<view class="orderBox-list__item-data">红色</view>
								</view>
								<view class="orderBox-list__item">
									<view class="orderBox-list__item-label">基础英雄价值</view>
									<view class="orderBox-list__item-data">10000*2</view>
								</view>
								<view class="orderBox-list__item">
									<view class="orderBox-list__item-label">立即返还</view>
									<view class="orderBox-list__item-data">10000</view>
								</view>
								<view class="orderBox-list__item">
									<view class="orderBox-list__item-label">分期返还</view>
									<view class="orderBox-list__item-data">100</view>
								</view>
								<view class="orderBox-list__item">
									<view class="orderBox-list__item-label">销毁价值</view>
									<view class="orderBox-list__item-data">2000</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsActive: 0
		};
	},
	methods: {
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
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
@import '/scss/recordBox';
</style>
