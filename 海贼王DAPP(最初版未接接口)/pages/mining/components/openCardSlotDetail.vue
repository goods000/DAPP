<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openCardSlotDetail" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openCardSlotDetail')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image src="@/static/mining/icon-mining-title.png" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__info">
							<view class="popupBox-info__header" @click="check()">
								<image class="popupBox-info__header-image" src="@/static/exchange/icon-buy-choice.png" mode="widthFix"></image>
								<view class="popupBox-info__header-name">当前装备（已激活战力）</view>
							</view>
							<view class="popupBox-info__news">
								<view class="myPackage-cardBox">
									<view class="myPackage-cardItem myPackage-cardItem--active">
										<view class="myPackage-cardItem__addBtn" v-if="!checkActive">
											<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
										</view>
										<view class="myPackage-cardItem__cardBox" :class="{'myPackage-cardItem__cardBox--grayscale' : !checkActive}">
											<image src="@/static/package/icon-card.png" mode="widthFix"></image>
										</view>
										<view class="myPackage-cardItem__num myPackage-cardItem__num--ashen">多弗朗明哥</view>
									</view>
								</view>
								<view class="popupBox-news__itemBox">
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">英雄品质：</view>
										<view class="popupBox-news__itemBox-item__num popupBox-news__itemBox-item__num--active">{{ checkActive ? 'SS (红色)' : '----' }}</view>
									</view>
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">英雄战力：</view>
										<view class="popupBox-news__itemBox-item__num">{{ checkActive ? '87620(+20%)' : '----' }}</view>
									</view>
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">英雄名称：</view>
										<view class="popupBox-news__itemBox-item__num">多弗朗明哥</view>
									</view>
									<view class="popupBox-news__itemBox-bg">卡槽</view>
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">卡槽等级：</view>
										<view class="popupBox-news__itemBox-item__num">LV.{{ checkActive ? '2' : '0' }}</view>
									</view>
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">战力加成：</view>
										<view class="popupBox-news__itemBox-item__num">+{{ checkActive ? '20' : '0' }}%</view>
									</view>
								</view>
							</view>
						</view>
						
						<view class="popupBox-input">
							<view class="popupBox-input__item">
								<view class="popupBox-input__item-name">卡槽经验值</view>
								<view class="popupBox-input__item-btnBg" @click="upgrade" :class="{'popupBox-input__item-btnBg--grey' : !checkActive}">升级</view>
							</view>
							<view class="popupBox-input-content">
								<view class="popupBox-input-content__chart">
									<view class="popupBox-input-content__chart-line" v-if="!checkActive" :style="{ width: 0 + '%' }"></view>
									<view class="popupBox-input-content__chart-line" v-else :style="{ width: ((100 / 200) *100) + '%' }"></view>
								</view>
							</view>
							<view class="popupBox-input__item">
								<view class="popupBox-input__item-data">LV{{ checkActive ? '2' : '0' }}</view>
								<view class="popupBox-input__item-data">{{ checkActive ? '100/200' : '0/100' }}</view>
							</view>
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding--01">
						<view class="popupBox-btn__zore3" @click="hidePopup('openCardSlotDetail')">{{ checkActive ? '替换英雄' : '取消' }}</view>
						<view class="popupBox-btn__zore2" @click="submit()">{{ checkActive ? '拆卸英雄' : '装备英雄' }}</view>
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
			checkActive: false,
			quantity: 10,
		};
	},
	methods: {
		// 卡槽升级
		upgrade(){
			this.$emit('openPopup', 'openCardSlotUpgrade',);
		},
		submit(){
			this.$emit('openPopup', 'openHero', this.checkActive);
			console.log('this.checkActive：',this.checkActive);
			this.checkValue = this.checkActive;
			console.log('this.checkValue：',this.checkValue);
		},
		check(){
			this.checkActive = !this.checkActive;
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import 'scss/cardSlotDetail';
</style>
