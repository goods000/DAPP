<template>
	<view class="initListBox-market">
		<view class="initListBox-header">
			<image src="@/static/exchange/icon-exchangeTab-03.png" mode="widthFix"></image>
		</view>
		<view class="initListBox-wrapper">
			<view class="initTabs">
				<view class="initTabs-records">
					<view class="initTabs-records__item" :class="{'initTabs-records__item--active' : typeActive == 0}" @click="changeTypeActive(0)">买入记录</view>
					<view class="initTabs-records__item" :class="{'initTabs-records__item--active' : typeActive == 1}" @click="changeTypeActive(1)">卖出记录</view>
				</view>
			</view>
			<scroll-view class="exchangeRecord-height" :scroll-y="true" :show-scrollbar="false">
				<view class="exchangeRecord-item" v-for="(item,index) in 5" :key="index">
					<view class="exchangeRecord-item__box">
						<view class="exchangeRecord-item__content">交易海贼英雄：月光</view>
						<view class="exchangeRecord-item__content">品质：SS</view>
					</view>
					<view class="exchangeRecord-item__content">交易总金额(Bili)：2400</view>
					<view class="exchangeRecord-item__content">交易数量(张)：10</view>
					<view class="exchangeRecord-item__content">交易时间：2021/11/04 19:21:22</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	// 接受父组件的值
	data() {
		return {
			typeActive: 0,
		};
	},
	onShow() {
		
	},
	methods: {
		init(){
			this.typeActive == 0
			this.changeTabsActive(0);
		},
		changeTypeActive(index){
			if (this.typeActive != index) {
				this.typeActive = index;
			}
		},
		openPopup(e) {
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/exchangeRecord';
</style>