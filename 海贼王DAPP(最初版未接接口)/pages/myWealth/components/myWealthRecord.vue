<template>
	<view class="initListBox-market">
		<view class="initListBox-header">
			<image v-if="tabActive == 1" src="@/static/myWealth/icon-wealthList-header--02.png" mode="widthFix"></image>
			<image v-if="tabActive == 2" src="@/static/myWealth/icon-wealthList-header--03.png" mode="widthFix"></image>
		</view>
		<view class="initListBox-wrapper">
			<template v-if="tabActive == 1">
				<scroll-view class="exchangeRecord-height" :scroll-y="true" :show-scrollbar="false">
					<view class="exchangeRecord-item" v-for="(item,index) in 12" :key="index">
						<view class="exchangeRecord-item__content">提币金额（{{ $store.state.projectCurrencyName }}）：10000.0000</view>
						<view class="exchangeRecord-item__content">手续费({{ $store.state.projectCurrencyName }})：2400</view>
						<view class="exchangeRecord-item__content">提币地址：hzw00026460024540004524</view>
						<view class="exchangeRecord-item__content">时间：2021/11/04 19:21:22</view>
					</view>
				</scroll-view>
			</template>
			<template v-if="tabActive == 2">
				<scroll-view class="exchangeRecord-height" :scroll-y="true" :show-scrollbar="false">
					<view class="exchangeRecord-item" v-for="(item,index) in 15" :key="index">
						<view class="exchangeRecord-item__content">释放金额（{{ $store.state.projectCurrencyName }}）：10000.0000</view>
						<view class="exchangeRecord-item__content">时间：2021/11/04 19:21:22</view>
					</view>
				</scroll-view>
			</template>
		</view>
	</view>
</template>

<script>
export default {
	// 接受父组件的值
	props:{
		tabActive: Number
	},
	data() {
		return {
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
@import '/scss/myWealthRecord';
</style>