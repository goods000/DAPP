<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openPopupDetail" type="top" :animation="true" @change="init">
		<view class="popupBox"> 
			<view class="popupBox-wrapper" style="background: none;">
				<view class="popupBox-close" @click="hidePopup('openPopupDetail')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image :src="require(`@/static/mining/icon-hreoDetail-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
					</view>
					<view class="popupBox-card">
						<view class="popupBox-cardBox" >
							<image class="popupBox-cardBox__image" :src="cardDetails.pic" mode="widthFix"></image>
						</view>
					</view>
					<view class="">
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title popupBox-content__item-title--center">{{ cardDetails.role }}（{{ cardDetails.color }}）{{ i18n.package.openPopupBoxDetail.heroTitle }}</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-info">{{ i18n.package.openPopupBoxDetail.heroTitle01 }}：{{ cardDetails.baseHashRate }} </view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-info">{{ i18n.package.openPopupBoxDetail.heroTitle02 }}：{{ cardDetails.ex }} </view>
						</view>
					</view>
					<view class="popupBox-btn">
						<view class="popupBox-btn__zore2" @click="destroyCard()">{{ i18n.package.openPopupBoxDetail.btn01 }}</view>
						<view class="popupBox-btn__zore2" @click="openTransferHero()">{{ i18n.package.openPopupBoxDetail.btn02 }}</view>
						<!-- <view class="popupBox-btn__zore2" @click="replaceCard()">转赠</view> -->
						<view class="popupBox-btn__zore2" @click="toMining()">{{ i18n.package.openPopupBoxDetail.btn03 }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['cardDetails', 'randomValue'],
	data() {
		return {
			slotCardList: [],
			
			quantity: 1,
			address: '',
			typeActive:0,
			// heroInfo:'',
			powerTotal: 0,
		};
	},
	mounted() {
		// var that = this;
		// that.$Bus.$on('heroInfo',function(heroInfo){
		// 	that.heroInfo = heroInfo;
		// })
		console.log("---：",this.cardDetails);
	},
	watch: {
		randomValue(newValue) {
			this.init();
		},
		typeActive(newValue) {
			this.powerTotal = this.slotCardList[newValue].baseHashRate + this.cardDetails.baseHashRate;
		}
	},
	methods: {
		init() {
			console.log("---------cardDetails：",this.cardDetails);
		},
		toMining() {
			this.$emit('hidePopup', 'openPopupDetail');
			this.$tools.jump('../mining/mining');
		},
		// 销毁卡牌
		destroyCard(){
			// this.$emit('openPopup', 'openDestroySuccess',this.cardDetails);
			this.$Ajax('/front/poker/destroy', {
				pokerId: this.cardDetails.id
			}, res=>{
				this.$emit('refreshData');
				this.hidePopup('openPopupDetail');
				this.$emit('openPopup', 'openDestroySuccess',this.cardDetails);
			})
		},
		openTransferHero(){
			this.$emit('openPopup', 'openTransferHero',this.cardDetails);
			this.hidePopup('openPopupDetail');
		},
		checkType(index){
			if (this.typeActive != index) {
				this.typeActive = index;
			}
		},
		openPopup(e,item) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopupDetail';
</style>
