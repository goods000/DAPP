<template>
	<view class="myPackage">
		<view class="myPackage-header">
			<!-- <image :src="require(`@/static/composite/icon-header-${$store.state.initLanguage}.png`)" mode="widthFix"></image> -->
			<!-- <image src="@/static/composite/icon-header.png" mode="widthFix"></image> -->
		</view>
		<view class="myPackage-box">
			<view>
				<!-- <view class="myPackage-tipsBox">
					<view class="myPackage-tipsBox__item">
						<view class="myPackage-tipsBox__item-title">我的海贼收集：</view>
						<view class="myPackage-tipsBox__item-num">24/60</view>
					</view>
					<view class="myPackage-tipsBox__item">
						<view class="myPackage-tipsBox__item-title">海贼筛选：</view>
						<view class="myPackage-tipsBox__item-num">已装备</view>
						<view class="myPackage-tipsBox__item-open" :class="navigateFlag ? 'myPackage-tipsBox__item-open--active' : ''">
							<image src="@/static/package/sort.png" mode="widthFix" @click="triggerCollapse()"></image>
						</view>
					</view>
				</view> -->
				<view class="myHero-recordTips" @click="openRecords">{{ i18n.composite.recordBtn01 }}</view>
				<view class="initNoData" v-if="cardList.length ==0">{{ i18n.global.noData }}</view>
				<scroll-view class="myPackage__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
					<view class="myPackage-cardBox" v-for="(item,index) in cardList" :key="index">
						<view class="myHero-cardItem" v-for="(subItem, subIndex) in item.pokerList" :key="subIndex" @click="openPopup('openCompositeDetail', item, subIndex)">
							<view class="myPackage-cardItem myPackage-cardItem--active">
							 <!-- v-for="(subItem, subIndex) in item.pokerList" :key="subIndex" @click="openPopup('syntheticCardPopup', item, subIndex)"> -->
								<!-- <view class="myPackage-cardItem__activeTitle">
									<image src="@/static/package/icon-title-active.png" mode="widthFix"></image>
								</view> -->
								<view class="myPackage-cardItem__cardBox">
									<image :src="subItem.pic" mode="widthFix"></image>
									<view class="myPackage-cardItem__cardBox-info">
										<image src="@/static/package/icon.png" mode="widthFix"></image>
										<view class="myPackage-cardItem__cardBox-info__num">{{ item.currencyHashRate }}</view>
									</view>
								</view>
								<view class="myPackage-cardItem__num" :class="[
									{ 'myPackage-cardItem__num--grey': item.color == '灰色' },
									{ 'myPackage-cardItem__num--purple': item.color == '紫色' },
									{ 'myPackage-cardItem__num--ashen': item.color == '黑色' },
									{ 'myPackage-cardItem__num--red': item.color == '红色' },
									{ 'myPackage-cardItem__num--yellow': item.color == '黄色' }
								]">X{{ subItem.count }}</view>
							</view>
							<view class="myHero-btn">{{ i18n.composite.btn01 }}</view>
						</view>
					</view>
				</scroll-view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: ['randomValue'],
		data(){
			return{
				navigateFlag: false,
				scrollInto: "",
				cardList: []
			}
		},
		onShow() {
			this.navigateFlag = false;
		},
		watch: {
			randomValue(newValue) {
				this.init();
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.getCardList();
			},
			getCardList() {
				this.$Ajax('/front/poker/combinal',
					{
						address: this.$store.state.userWalletAddress
					},
					res => {
						// console.log(res);
						this.cardList = res.obj;
						this.$emit('refreshData');
						// this.cardList.forEach(item => {
						// 	this.$set(item, 'show', true);
						// });
					}
				);
			},
			// 查看合成失败记录
			openRecords(){
				this.$emit('openPopup', 'openfailureRecord');
			},
			triggerCollapse() {
				this.navigateFlag = !this.navigateFlag;
			},
			openPopup(e, item, index) {
				this.$emit('openPopup', e, item, index);
			},
			hidePopup(e) {
				this.$refs[e].close();
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '@/pages/package/components/scss/myPackage';
@import '/scss/myHero'
</style>
