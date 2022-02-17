<template>
	<view class="buyBox">
		<view class="buyBox-bg">
			<image class="buyBox-bg__image" src="@/static/buyBox/icon-buyBox-bg.png" mode="widthFix"></image>
			<view class="buyBox-address">
				<view class="buyBox-address__name">{{ $store.state.userWalletAddress | walletAddressConceal(6) }}</view>
				<view class="buyBox-address__name buyBox-address__lang">{{ $store.state.initLanguage.toUpperCase() }}</view>
				<image src="@/static/buyBox/icon-check.png" class="buyBox-address__image" @click="openPopup('openLanguage')"></image>
			</view>
		</view>
		<view class="buyBox-wrapper">
			<view class="buyBox-image">
				<image :src="i18n.index.firstImage" mode="widthFix"></image>
			</view>
			<view class="buyBox-flow">
				<image src="@/static/first/icon-first-flow.png" mode="widthFix"></image>
			</view>
			<view class="selection-box">
				<view class="selection-box__header">
					<image src="@/static/first/icon-first-headerBox.png" mode="widthFix"></image>
				</view>
				<view class="selection-box__item">
					<view class="buyBox-tabsBox" :class="{'buyBox-tabsBox--en' : $store.state.initLanguage == 'en'}">
						<view class="buyBox-tabsBox__title" :class="{'buyBox-tabsBox__title--active' : tabsActive == 1}" @click="changeTabsActive(1)">HBIC{{ i18n.index.purchase }}</view>
						<view class="buyBox-tabsBox__title" :class="{'buyBox-tabsBox__title--active' : tabsActive == 2}" @click="changeTabsActive(2)">USDT{{ i18n.index.purchase }}</view>
					</view>
					<view class="popupBox-titleTips">
						<view class="popupBox-titleTips__bg">{{ i18n.index.blindBox }}</view>
						<view class="popupBox-titleTips__line"></view>
					</view>
					<view class="openBuyBox">
						<scroll-view class="openBuyBox__height1" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<view class="openBuyBox-typeBox">
							<view class="openBuyBox-typeBox__item" v-for="(item,index) in boxList">
								<view class="typeBox-image">
									<image :src="item.pic" mode="widthFix"></image>
									<!-- <image src="@/static/package/icon-type-2.png" mode="widthFix" v-if="index ==1"></image> -->
									<!-- <image src="@/static/package/icon-type-3.png" mode="widthFix" v-if="index ==2"></image> -->
								</view>
								<view class="typeBox-details">
									<view class="typeBox-details__nameZh">{{ item.name }}</view>
									<view class="typeBox-details__nameEn">{{ item.name }}</view>
									<view class="typeBox-details__numBox">
										<view class="typeBox-details__numBox-numtitle">{{ i18n.index.purchasePrice }}：</view>
									</view>
									<view class="typeBox-details__btnBox">
										<view class="typeBox-details__numBox-num">{{ tabsActive == 1 ? item.dlbPrice : item.usdtPrice }}<view class="typeBox-details__numBox-usdt">{{ tabsActive == 1 ? 'HBIC' : 'USDT' }}</view></view>
										<view class="typeBox-details__btnBox-open" @click="openPopup('openPopupBuyBox', item, tabsActive)">{{ i18n.index.purchase }}</view>
									</view>
								</view>
							</view>
						</view>
						</scroll-view>	
					</view>
					<view class="openBuyBox-record" @click="openPopup('openRecord')">{{ i18n.index.record }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollInto: '',
			boxList:[],
			tabsActive:1,
		};
	},
	mounted() {
		this.getBoxList();
	},
	methods: {
		getBoxList() {
			this.$Ajax('/front/ubx/list', {}, res => {
				this.boxList = res.obj;
			});
		},
		changeTabsActive(index){
			if(this.tabsActive != index){
				this.tabsActive = index;
			}
		},
		openPopup(e, item, i) {
			this.$emit('openPopup', e, item, i);
		}
	}
} 
</script>

<style lang="scss" scoped>
@import '/scss/openBuyBox';
</style>
