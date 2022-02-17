<template>
	<view class="worldData">
		<view class="worldData-wrapper">
			<view class="worldData-item">
				<view class="worldData-item__name worldData-item__name-1">{{ i18n.list.title01 }}</view>
				<view class="worldData-item__num">{{ worldDataList.totalHashRate }}</view>
			</view>
			<view class="worldData-item">
				<view class="worldData-item__name worldData-item__name-2">{{ i18n.list.title02 }}</view>
				<view class="worldData-item__num">{{ worldDataList.heroCount }}</view>
			</view>
			<!-- <view class="worldData-item">
				<view class="worldData-item__name worldData-item__name-3">{{ $store.state.projectCurrencyName }}($)</view>
				<view class="worldData-item__num">{{ usdtPrice*worldDataList.destroyDlt }}</view>
			</view> -->
			<view class="worldData-item">
				<view class="worldData-item__name worldData-item__name-4">{{ i18n.list.title03 }}($)</view>
				<view class="worldData-item__num">{{ worldDataList.destroyDlt }}</view>
			</view>
			<!-- <view class="worldData-item">
				<view class="worldData-item__name worldData-item__name-5">集卡平均APY</view>
				<view class="worldData-item__num">0</view>
			</view> -->
			<view class="worldData-box">
				<view class="worldData-box__headerTitle">{{ i18n.list.title04 }}</view>
			</view>
			<view class="worldData-box__bg">
				<view class="worldData-item">
					<view class="worldData-item__name worldData-item__name-6">{{ i18n.list.title05 }}</view>
					<view class="worldData-item__num">{{ worldDataList.totalTradeQty }}</view>
				</view>
				<view class="worldData-item">
					<view class="worldData-item__name worldData-item__name-7">{{ i18n.list.title06 }}</view>
					<view class="worldData-item__num">{{ worldDataList['24hTradeQty'] }}</view>
				</view>
				<!-- <view class="worldData-btn">进入</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			usdtPrice:'',
			worldDataList:{},
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init(){
			this.getCardList();
			this.getUsdtPrice();
		},
		getUsdtPrice() {
			this.$Ajax('/front/common/get/usdt/price',{},
				res => {
					this.usdtPrice = res.obj;
				}
			);
		},
		getCardList() {
			this.$Ajax('/front/common/land/data',{
					address: this.$store.state.userWalletAddress
				},
				res => {
					this.worldDataList = res.obj;
				}
			);
		},
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/worldData';
</style>

