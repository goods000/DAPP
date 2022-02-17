<template>
	<view class="initListBox-market">
		<view class="initListBox-header">
			<image v-if="tabActive == 0" src="@/static/exchange/icon-exchangeTab-01.png" mode="widthFix"></image>
			<image v-if="tabActive == 1" src="@/static/exchange/icon-exchangeTab-02.png" mode="widthFix"></image>
		</view>
		<view class="initListBox-wrapper">
			<view class="market-operate" v-if="tabActive == 0" >
				<view class="market-operate__item">
					<image class="market-operate__item-searchImage" src="@/static/exchange/icon-exchange-search.png" mode="widthFix"></image>
					<input type="text" placeholder="请输入搜索关键词" placeholder-class="market-operate__item-input"/>
				</view>
				<view class="market-operate__item">
					<text class="market-operate__item-title">品质由高到低</text>
					<image class="market-operate__item-sort" src="@/static/exchange/icon-exchange-sort.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="market-listBox">
				<view class="market-listBox__header">
					<view class="market-listBox__header-name">名称</view>
					<view class="market-listBox__header-name">单价(Bili)</view>
					<view class="market-listBox__header-name">操作</view>
				</view>
				<scroll-view class="market-listBox__height" :class="{'market-listBox__heightTab' : tabActive == 1}" :scroll-y="true" :show-scrollbar="false">
					<view class="market-listBox__item" v-for="(item,index) in 5" :key="index">
						<view class="market-listBox__item-leftBox">
							<image v-if="index == 0" src="@/static/exchange/icon-exchange-01.png" mode="widthFix"></image>
							<image v-if="index == 1" src="@/static/exchange/icon-exchange-02.png" mode="widthFix"></image>
							<image v-if="index == 2" src="@/static/exchange/icon-exchange-03.png" mode="widthFix"></image>
							<image v-if="index == 3" src="@/static/exchange/icon-exchange-04.png" mode="widthFix"></image>
							<image v-if="index == 4" src="@/static/exchange/icon-exchange-05.png" mode="widthFix"></image>
							<view class="market-listBox__item-box">
								<view class="market-listBox__item-box__name">汉库克(SSS)</view>
								<view class="market-listBox__item-box__num">数量:2</view>
							</view>
						</view>
						<view class="market-listBox__item-centerBox">
							<image src="@/static/exchange/icon-level-01.png" mode="widthFix"></image>
							<view class="market-listBox__item-centerBox__num">120</view>
						</view>
						<view class="market-listBox__item-btn" v-if="tabActive == 0" @click="buy">购买</view>
						<view class="market-listBox__item-cancel" v-if="tabActive == 1">撤单</view>
					</view>
				</scroll-view>
				<view class="market-btn" v-if="tabActive == 0">
					<view class="market-btn__style" @click="sell">挂单</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	// 接受父组件的值
	props: {
	  tabActive: Number,
	},
	data() {
		return {
			
		};
	},
	onShow() {
		
	},
	methods: {
		// 购买
		buy(){
			this.$emit('openPopup', 'openbuyHero');
		},
		// 挂单
		sell(){
			this.$emit('openPopup', 'openSellingHeroes');
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
@import '/scss/exchangeMarket';
</style>