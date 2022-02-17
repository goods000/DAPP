<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openbuyHero" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openbuyHero')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">购买海贼英雄</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__info">
							<view class="popupBox-info__header">
								<image class="popupBox-info__header-image" src="@/static/exchange/icon-buy-choice.png" mode="widthFix"></image>
								<view class="popupBox-info__header-name">挂卖英雄相关</view>
							</view>
							<view class="popupBox-info__news">
								<view class="myPackage-cardBox">
									<view class="myPackage-cardItem myPackage-cardItem--active">
										<view class="myPackage-cardItem__cardBox">
											<image src="@/static/package/icon-card.png" mode="widthFix"></image>
										</view>
										<view class="myPackage-cardItem__num">多弗朗明哥</view>
									</view>
								</view>
								<view class="popupBox-news__itemBox">
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">英雄品质：</view>
										<view class="popupBox-news__itemBox-item__num popupBox-news__itemBox-item__num--active">SS (红色)</view>
									</view>
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">英雄战力：</view>
										<view class="popupBox-news__itemBox-item__num">87620</view>
									</view>
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">英雄名称：</view>
										<view class="popupBox-news__itemBox-item__num">多弗朗明哥</view>
									</view>
									<view class="popupBox-news__itemBox-bg">交易</view>
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">出售数量：</view>
										<view class="popupBox-news__itemBox-item__num">10</view>
									</view>
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">交易单价：</view>
										<view class="popupBox-news__itemBox-item__num">240 Bili</view>
									</view>
								</view>
							</view>
						</view>
						<view class="popupBox-cardTitle">请选购买数量</view>
						<view class="popupBox-operate">
							<view class="popupBox-operate__btn" @click="reduceBtn()">
								<image src="@/static/public/icon-reduce.png" mode="widthFix"></image>
							</view>
							<view class="popupBox-operate__num">{{ quantity }}</view>
							<view class="popupBox-operate__btn" @click="plusBtn()">
								<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding--01">
						<view class="popupBox-btn__zore3">获取授权</view>
						<view class="popupBox-btn__zore2" @click="submit()">点击购买</view>
					</view>
					<view class="popupBox-data popupBox-btnPadding--01">
						<view class="popupBox-data__num">需支付：2400.00</view>
						<view class="popupBox-data__num">钱包余额：20000.000</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			checkActive: '',
			quantity: 10,
		};
	},
	methods: {
		submit(){
			this.$emit('openPopup', 'openBuySuccess');
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
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import 'scss/openbuyHero';
</style>
