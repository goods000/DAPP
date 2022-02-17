<template>
	<!-- 成交记录 -->
	<view class="transactionOrderBox">
		<scroll-view scroll-y="true" class="transactionOrderBox-wrapper">
			<view class="transactionOrderBox-plane">
				<view class="transactionOrderBox-tabsBox initTabs">
					<view class="initTabs-wrapper">
						<view class="initTabs-item" :class="{ 'initTabs-item--active': tabsActive == 0 }" @click="changeTabsActive(0)">买单</view>
						<view class="initTabs-item" :class="{ 'initTabs-item--active': tabsActive == 1 }" @click="changeTabsActive(1)">卖单</view>
					</view>
				</view>
				<view class="transactionOrderBox-orderBox orderBox">
					<scroll-view scroll-y="true" class="orderBox-wrapper">
						<view class="orderBox-list" v-for="(item, index) in 20" :key="index">
							<view class="orderBox-list__header"><view class="orderBox-list__date">2020.11.11 14:43:52</view></view>
							<view class="orderBox-list__body">
								<view class="orderBox-list__item">
									<view class="orderBox-list__item-label">英雄</view>
									<view class="orderBox-list__item-data">小舞</view>
								</view>
								<view class="orderBox-list__item">
									<view class="orderBox-list__item-label">品质</view>
									<view class="orderBox-list__item-data">金</view>
								</view>
								<view class="orderBox-list__item orderBox-list__item--flex2">
									<view class="orderBox-list__item-label">总价/单价(WHL)</view>
									<view class="orderBox-list__item-data">240/240</view>
								</view>
								<view class="orderBox-list__item">
									<view class="orderBox-list__item-label">数量</view>
									<view class="orderBox-list__item-data">1</view>
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
@import '/scss/transactionOrderBox';
</style>
