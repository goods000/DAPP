<template>
	<view class="initListBox-market">
		<view class="initListBox-header">
			<image src="@/static/shop/icon-shopTab-01.png" mode="widthFix"></image>
		</view>
		<view class="initListBox-wrapper">
			<view class="shop">
				<view class="shop-goodsBox">
					<view class="shop-goodsBox__btn" @click="upBtn()">
						<image src="@/static/shop/icon-shop-leftBtn.png" mode="widthFix"></image>
					</view>
					<view class="shop-goodsBox__item">
						<image src="@/static/shop/icon-goods-01.png" mode="widthFix" v-if="indexImage == 1"></image>
						<image src="@/static/shop/icon-goods-02.png" mode="widthFix" v-if="indexImage == 2"></image>
						<image src="@/static/shop/icon-goods-03.png" mode="widthFix" v-if="indexImage == 3"></image>
					</view>
					<view class="shop-goodsBox__btn" @click="nextBtn()">
						<image src="@/static/shop/icon-shop-rightBtn.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="shop-details">
					<view class="shop-details__nameZh" v-if="indexImage == 1">普通盲盒</view>
					<view class="shop-details__nameZh" v-if="indexImage == 2">中级盲盒</view>
					<view class="shop-details__nameZh" v-if="indexImage == 3">高级盲盒</view>
					<view class="shop-details__nameEn" v-if="indexImage == 1">Ordinary blind box</view>
					<view class="shop-details__nameEn" v-if="indexImage == 2">Intermediate blind box</view>
					<view class="shop-details__nameEn" v-if="indexImage == 3">Senior blind box</view>
					<view class="shop-details__titleBox">
						<text class="shop-details__titleBox-tips1">普通盲盒可随机开出灰色、紫色、黑色三种不同品质的海贼英雄，其中</text>
						<text class="shop-details__titleBox-tips2">灰色海贼英雄掉率为94%、</text>
						<text class="shop-details__titleBox-tips3">紫色海贼英雄掉率5%、</text>
						<text class="shop-details__titleBox-tips4">黑色海贼英雄掉率1%</text>
					</view>
				</view>
				
				<view class="popupBox-cardTips">购买数量</view>
				<view class="popupBox-operate">
					<view class="popupBox-operate__btn" @click="reduceBtn()">
						<image src="@/static/public/icon-reduce.png" mode="widthFix"></image>
					</view>
					<view class="popupBox-operate__num">{{ quantity }}</view>
					<view class="popupBox-operate__btn" @click="plusBtn()">
						<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
					</view>
				</view>
				
				<view class="popupBox-btn">
					<view class="popupBox-btn__zore3">点击授权</view>
					<view class="popupBox-btn__zore2" @click="submit()">点击购买</view>
				</view>
				<view class="shop-data">
					<view class="shop-data__num">需支付：2400.00</view>
					<view class="shop-data__num">钱包余额：20000.000</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props:{
		boxList: Array,
		tabActive: Number,
	},
	// props:['boxList'],
	data() {
		return {
			indexImage: 1,
			quantity: 10,
		};
	},
	onShow() {
		console.log("boxList.boxImage",this.boxList[0].boxImage);
	},
	methods: {
		submit(){
			this.$emit('openPopup', 'openShopBuySuccess');
		},
		upBtn() {
			if (this.indexImage == 1) {
				this.indexImage = 3;
			}else{
				this.indexImage --;
			}
		},
		nextBtn() {
			if(this.boxList.length == this.indexImage){
				this.indexImage = 1;
			}else{
				this.indexImage++;
			}
		},
		reduceBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			if(this.inventory == this.quantity){
				this.$tools.toast('库存达到最大数量');
				this.quantity = this.inventory;
			}else{
				this.quantity++;
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
@import 'scss/shopMarket';
</style>