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
		<view class="explain">
			<view class="explain-image">
				<image :class="$store.state.initLanguage == 'cn' ? 'explain-image--cn' : 'explain-image--en'" :src="i18n.index.img_01" mode="widthFix"></image>
			</view>
			<!-- <view class="explain-box">
				<view class="explain-bg">
					<view class="explain-item">
						<view class="explain-item__box">
							<view class="explain-item__box-title">
								<image class="explain-item__box-title--cn" :class="{'explain-item__box-title--en' : $store.state.initLanguage == 'en' }" 
								:src="require(`@/static/first/icon-explainTitle-${$store.state.initLanguage}.png`)" mode=""></image>
							</view>
							<view class="explain-item__box-content">{{ i18n.index.tipsContent }}</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>
		<view class="buyBox-wrapper">
			<view class="buyBox-image">
				<image :src="i18n.index.firstImage" mode="widthFix"></image>
			</view>
			<view class="selection-box">
				<view class="selection-box__item">
					<!-- <view class="popupBox-titleTips">
						<view class="popupBox-titleTips__bg">{{ i18n.index.blindBox }}</view>
						<view class="popupBox-titleTips__line"></view>
					</view> -->
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
									<view class="typeBox-details__nameEn" v-if="index == 0">{{ item.name }}{{ i18n.index.typeTips01 }}</view>
									<view class="typeBox-details__nameEn" v-else>{{ item.name }}{{ i18n.index.typeTips02 }}</view>
									<view class="typeBox-details__numBox">
										<view class="typeBox-details__numBox-numtitle">{{ i18n.index.purchasePrice }}(USDT):</view>
									</view>
									<view class="typeBox-details__btnBox">
										<view class="typeBox-details__numBox-num">{{ item.usdtPrice }}<text class="typeBox-details__numBox-usdt">.00</text></view>
										<view class="typeBox-details__btnBox-open" @click="openPopup('openPopupBuyBox', item)">{{ i18n.index.purchase }}</view>
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
		openPopup(e, item) {
			this.$emit('openPopup', e, item);
		}
	}
} 
</script>

<style lang="scss" scoped>
@import '/scss/_explain';
@import '/scss/openBuyBox';
</style>
