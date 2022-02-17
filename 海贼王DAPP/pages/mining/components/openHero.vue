<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openHero" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openHero')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header" v-if="cardChooseStatus == 0">{{ i18n.mining.openHero.btn01 }}</view>
					<view class="popupBox-header" v-if="cardChooseStatus == 1">{{ i18n.mining.openHero.btn02 }}</view>
					<view class="popupBox-cardTitle">{{ i18n.mining.openHero.title }}</view>
					<view class="popupBox-card">
						<view class="initNoData" v-if="slotCardList.length == 0">{{ i18n.global.noData }}</view>
						<view class="popupBox-cardBox" v-for="(item,index) in slotCardList" :key="index" :class="{'popupBox-cardBox--grayscale' : typeActive != index }"
						@click="checkType(index)">
							<!-- <view class="popupBox-cardBox__activeTitle" v-if="index == 0">
								<image src="@/static/package/icon-title-active.png" mode="widthFix"></image>
							</view> -->
							<image class="popupBox-cardBox__image" :src="item.pic" mode="widthFix"></image>
						</view>
					</view>
					<!-- <view class="popupBox-card" v-else>
						<view class="popupBox-cardBox">
							<image class="popupBox-cardBox__image" :src="chooseItemInfo.pic" mode="widthFix"></image>
						</view>
					</view> -->
					<view class="popupBox-nameBg">
						<view class="popupBox-content__name">{{ chooseItemInfo.role }}</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title popupBox-content__item-title--center" v-if="cardChooseStatus == 0">{{ i18n.mining.openHero.tips01 }}{{ chooseItemInfo.role }}（{{ slotCardList == '' ? chooseItemInfo.color : (slotCardList[typeActive] || {}).color }}）{{ i18n.mining.openHero.tips02 }}</view>
							<view class="popupBox-content__item-title popupBox-content__item-title--center" v-if="cardChooseStatus == 1">{{ i18n.mining.openHero.tips03 }}{{ chooseItemInfo.role }}（{{ slotCardList == '' ? chooseItemInfo.color : (slotCardList[typeActive] || {}).color }}）{{ i18n.mining.openHero.tips04 }}</view>
						</view>
						<view class="popupBox-content__item">
							<!-- <view class="popupBox-content__item-title">总战力值：</view> -->
							<view class="popupBox-content__item-info" v-if="cardChooseStatus == 1">{{ i18n.mining.openHero.heroTitle01 }}：{{ slotCardList == '' ? powerTotal : chooseItemInfo.baseHashRate }} → {{ slotCardList == '' ? chooseItemInfo.baseHashRate : (slotCardList[typeActive] || {}).baseHashRate }} 
							<image src="@/static/mining/icon-mining-up.png" mode="widthFix" v-if="chooseItemInfo.baseHashRate < (slotCardList[typeActive] || {}).baseHashRate"></image>
							<image src="@/static/mining/icon-mining-down.png" mode="widthFix" v-if="chooseItemInfo.baseHashRate > (slotCardList[typeActive] || {}).baseHashRate"></image></view>
							<view class="popupBox-content__item-info" v-if="cardChooseStatus == 0">{{ i18n.mining.openHero.heroTitle01 }}：{{ slotCardList == '' ? chooseItemInfo.baseHashRate : (slotCardList[typeActive] || {}).baseHashRate }}</view>
						</view>
					</view>
					<view class="popupBox-btn"  v-if="cardChooseStatus == 1">
						<view class="popupBox-btn__zore1" @click="hidePopup('openHero')">{{ i18n.global.cancel }}</view>
						<view class="popupBox-btn__zore2" @click="replaceCard()">{{ i18n.mining.openHero.btn02 }}</view>
					</view>
					<view class="popupBox-btn"  v-if="cardChooseStatus == 0">
						<view class="popupBox-btn__style" @click="insertCard()">{{ i18n.mining.openHero.btn01 }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['chooseItemInfo', 'cardChooseStatus', 'randomValue'],
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
	watch: {
		randomValue(newValue){
			this.init();
		},
		cardChooseStatus(newValue) {
			console.log('cardChooseStatus', newValue);
		},
		typeActive(newValue) {
			// this.powerTotal = this.slotCardList[newValue].baseHashRate + this.chooseItemInfo.baseHashRate;
		}
	},
	methods: {
		init(e) {
			console.log("openHero chooseItemInfo：",this.chooseItemInfo);
			this.slotCardList = [];
			this.getSlotCardList();
		},
		getSlotCardList() {
			this.$Ajax('/front/slot/optional/poker',
				{
					id: this.chooseItemInfo.id
				},
				res => {
					if (res.obj.length != 0) {
						this.slotCardList = res.obj;
					}
				}
			);
		},
		insertCard() {
			//插入卡牌
			if (this.slotCardList.length == 0) {
				return this.$tools.toast(this.i18n.mining.toast03);
			}
			this.$Ajax(
				'/front/slot/insert/poker',
				{
					address: this.$store.state.userWalletAddress,
					pokerId: this.slotCardList[this.typeActive].id,
					slotId: this.chooseItemInfo.id
				},
				res => {
					this.$tools.toast(this.i18n.mining.openHero.toast01);
					this.$emit('hidePopup', 'openHero');
					this.$emit('refreshData');
					this.$store.commit('changeUserInfoRandom');
				}
			);
		},
		replaceCard() {
			//替换卡牌
			if (this.slotCardList.length == 0) {
				return this.$tools.toast(this.i18n.mining.toast03);
			}
			this.$Ajax(
				'/front/slot/replace/poker',
				{
					address: this.$store.state.userWalletAddress,
					pokerId: this.slotCardList[this.typeActive].id,
					slotId: this.chooseItemInfo.id
				},
				res => {
					this.$tools.toast(this.i18n.mining.openHero.toast02);
					this.$emit('hidePopup', 'openHero');
					this.$emit('refreshData');
					this.$store.commit('changeUserInfoRandom');
				}
			);
		},
		config(){
			this.$on("myFun",(checkActive)=>{   
				//这里最好用箭头函数，不然this指向有问题
				this.checkValue = checkActive      
				// console.log('checkActive：',checkActive);
			})
		},
		openTransferHero(){
			this.$emit('openPopup', 'openTransferHero');
			this.hidePopup('openHero');
		},
		checkType(index){
			if (this.typeActive != index) {
				this.typeActive = index;
			}
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/pages/package/components/scss/openPopupDetail';
.popupBox{
	&-btn{
		margin: 78upx 50upx 0upx;
		& > view{
			width: 40%;
			padding: 20upx 0;
		}
		&__style{
			width: 100%;
		}
	}
}
</style>
