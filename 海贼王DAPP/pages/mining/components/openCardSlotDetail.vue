<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openCardSlotDetail" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openCardSlotDetail')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image :src="require(`@/static/mining/icon-mining-title-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__info">
							<view class="popupBox-info__header" @click="check()">
								<image class="popupBox-info__header-image" src="@/static/exchange/icon-buy-choice.png" mode="widthFix"></image>
								<view class="popupBox-info__header-name">{{ i18n.mining.openCardSlotDetail.title }}（{{ chooseItemInfo.pokerId != 0 ? i18n.mining.openCardSlotDetail.status01 : i18n.mining.openCardSlotDetail.status02 }}）</view>
							</view>
							<view class="popupBox-info__news">
								<view class="myPackage-cardBox">
									<view class="myPackage-cardItem myPackage-cardItem--active">
										<view class="myPackage-cardItem__addBtn" v-if="chooseItemInfo.unlock == 0">
											<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
										</view>
										<view class="myPackage-cardItem__cardBox" :class="{'myPackage-cardItem__cardBox--grayscale' : chooseItemInfo.unlock == 0}">
											<image :src="chooseItemInfo.pic" mode="widthFix"></image>
										</view>
										<view class="myPackage-cardItem__num" :class="[
											{ 'myPackage-cardItem__num--noColor': chooseItemInfo.color == null },
											{ 'myPackage-cardItem__num--grey': chooseItemInfo.color == '灰色' },
											{ 'myPackage-cardItem__num--purple': chooseItemInfo.color == '紫色' },
											{ 'myPackage-cardItem__num--ashen': chooseItemInfo.color == '黑色' },
											{ 'myPackage-cardItem__num--red': chooseItemInfo.color == '红色' },
											{ 'myPackage-cardItem__num--yellow': chooseItemInfo.color == '黄色' }
										]">{{ chooseItemInfo.role }}</view>
									</view>
								</view>
								<view class="popupBox-news__itemBox">
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">{{ i18n.mining.openCardSlotDetail.tips01 }}：</view>
										<view class="popupBox-news__itemBox-item__num popupBox-news__itemBox-item__num--active">{{ chooseItemInfo.color != null ? chooseItemInfo.color : '----' }}</view>
									</view>
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">{{ i18n.mining.openCardSlotDetail.tips02 }}：</view>
										<view class="popupBox-news__itemBox-item__num">{{ chooseItemInfo.pokerId != 0 ? (chooseItemInfo.baseHashRate+'(+'+(chooseItemInfo.extra * 100)+'%)') : '----' }}</view>
									</view>
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">{{ i18n.mining.openCardSlotDetail.tips03 }}：</view>
										<view class="popupBox-news__itemBox-item__num">{{ chooseItemInfo.role }}</view>
									</view>
									<view class="popupBox-news__itemBox-bg">{{ i18n.mining.openCardSlotDetail.tips04 }}</view> 
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">{{ i18n.mining.openCardSlotDetail.tips05 }}：</view>
										<view class="popupBox-news__itemBox-item__num">LV.{{ chooseItemInfo.pokerId != 0 ? chooseItemInfo.stage : '0' }}</view>
									</view>
									<view class="popupBox-news__itemBox-item">
										<view class="popupBox-news__itemBox-item__title">{{ i18n.mining.openCardSlotDetail.tips06 }}：</view>
										<view class="popupBox-news__itemBox-item__num">+{{ chooseItemInfo.pokerId != 0 ? chooseItemInfo.extra * 100 : '0' }}%</view>
									</view>
								</view>
							</view>
						</view>
						
						<view class="popupBox-input">
							<view class="popupBox-input__item">
								<view class="popupBox-input__item-name">{{ i18n.mining.openCardSlotDetail.tips07 }}</view>
								<view class="popupBox-input__item-btnBg"  @click="toChooseCard(2)" :class="{'popupBox-input__item-btnBg--grey' : chooseItemInfo.unlock == 0}">{{ i18n.mining.openCardSlotDetail.tips08 }}</view>
							</view>
							<view class="popupBox-input-content">
								<view class="popupBox-input-content__chart">
									<view class="popupBox-input-content__chart-line" v-if="chooseItemInfo.pokerId == 0" :style="{ width: 0 + '%' }"></view>
									<view class="popupBox-input-content__chart-line" v-else :style="{ width: (chooseItemInfo.ex /  chooseItemInfo.nextEx * 100) + '%' }"></view>
								</view>
							</view>
							<view class="popupBox-input__item">
								<view class="popupBox-input__item-data">LV{{ chooseItemInfo.pokerId != 0 ? chooseItemInfo.stage : '0' }}</view>
								<view class="popupBox-input__item-data">{{ chooseItemInfo.pokerId != 0 ?  (chooseItemInfo.ex+ '/' +chooseItemInfo.nextEx) : ('0/'+chooseItemInfo.nextEx) }}</view>
							</view>
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding--01"  v-if="chooseItemInfo.pokerId == 0">
						<view class="popupBox-btn__zore3" @click="hidePopup('openCardSlotDetail')">{{ i18n.global.cancel }}</view>
						<view class="popupBox-btn__zore2" @click="toChooseCard(0)">{{ i18n.mining.openCardSlotDetail.btn01 }}</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding--01"  v-if="chooseItemInfo.pokerId != 0">
						<view class="popupBox-btn__zore3" @click="toChooseCard(1)">{{ i18n.mining.openCardSlotDetail.btn02 }}</view>
						<view class="popupBox-btn__zore2" @click="uninstallCard()">{{ i18n.mining.openCardSlotDetail.btn03 }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['chooseItemInfo', 'cardSlotStatus'],
	data() {
		return {
			checkActive: false,
			quantity: 10,
		};
	},
	methods: {
		init(e) {
			if (e.show) {
				console.log("chooseItemInfo：",this.chooseItemInfo);
			}
		},
		uninstallCard() {
			this.$Ajax(
				'/front/slot/uninstall/poker',
				{
					address: this.$store.state.userWalletAddress,
					slotId: this.chooseItemInfo.id
				},
				res => {
					this.$tools.toast(this.i18n.mining.openCardSlotDetail.toast01);
					this.$emit('hidePopup', 'openCardSlotDetail');
					this.$emit('refreshData');
					this.$store.commit('changeUserInfoRandom');
				}
			);
		},
		toChooseCard(type) {
			if (type == 2 && this.chooseItemInfo.pokerId == 0) {
				return this.$tools.toast(this.i18n.mining.openCardSlotDetail.toast02);
			}
			if (this.chooseItemInfo.unlock == 0) {
				return this.$tools.toast(this.i18n.mining.openCardSlotDetail.toast03);
			}
			if(type == 2){
				this.$emit('openPopup', 'openCardSlotUpgrade', this.chooseItemInfo);
			}else{
				this.$emit('openPopup', 'openHero', this.chooseItemInfo);
			}
			this.$emit('changeCardChooseStatus', type);
			this.$emit('hidePopup', 'openCardSlotDetail');
			// this.hidePopup('openCardSlotDetail');
			// this.$emit('openPopup', 'openHero');
			// let that = this;
			// that.$Bus.$emit('heroInfo',that.heroInfo);
		},
		// 卡槽升级
		submit(){
			this.$emit('openPopup', 'openHero', this.checkActive);
			console.log('this.checkActive：',this.checkActive);
			this.checkValue = this.checkActive;
			console.log('this.checkValue：',this.checkValue);
		},
		check(){
			this.checkActive = !this.checkActive;
		},
		openPopup(e) {
			this.$emit('openPopup', e);
		},
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'scss/cardSlotDetail';
</style>
