<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openCardSlotUpgrade" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openCardSlotUpgrade')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.mining.openCardSlotUpgrade.title }}</view>
					<view class="popupBox-contentbg">
						<view class="upgrade">
							<view class="upgrade-header">
								<!-- <view class="upgrade-header__image">
									<image src="@/static/mining/icon-mining-header.png" mode="widthFix"></image>
								</view> -->
								<view class="upgrade-box">
									<view class="upgrade-box__item">
										<view class="upgrade-box__item-name">{{ chooseItemInfo.role }}</view>
										<view class="upgrade-box__item-dataBox">
											<view class="upgrade-box__item-dataBox__num">+{{ slotCardList == '' ? '----' : (slotCardList[typeActive] || {}).ex }}</view>
											<image src="@/static/mining/icon-mining-level.png" mode="widthFix"></image>
										</view>
									</view>
									<view class="upgrade-box__item">
										<view class="upgrade-box__item-num">LV{{ chooseItemInfo.pokerId != 0 ? chooseItemInfo.stage : '0' }}<text>/10</text></view>
										<view class="upgrade-box__item-num">{{ chooseItemInfo.pokerId != 0 ?  (chooseItemInfo.ex + '/' +chooseItemInfo.nextEx) : ('0/'+chooseItemInfo.nextEx) }}</view>
									</view>
									<view class="upgrade-box__item">
										<view class="upgrade-box__item-content">
											<view class="upgrade-box__item-content__chart">
												<view class="upgrade-box__item-content__chart-line" :style="{ width: (chooseItemInfo.ex /  chooseItemInfo.nextEx * 100) + '%' }"></view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<!-- <view class="popupBox-titleTips">
								<view class="popupBox-titleTips__bg">海贼库</view>
								<view class="popupBox-titleTips__line"></view>
							</view> -->
							<!-- <view class="popupBox-titleTips">
								<view class="popupBox-titleTips__bg">已选择</view>
								<view class="popupBox-titleTips__line"></view>
							</view>
							<view class="upgrade-levelBox">
								<view class="upgrade-levelBox__image" v-for="(item,index) in uploadList" :key="index" v-if="uploadList != ''">
									<view class="upgrade-levelBox__image-bg" 
									:style="'background-image: url( '+ item +');background-size: 100% 100%;background-repeat: no-repeat;'"
									 @click="chooseImg(item)">
										<image :src="item" mode="widthFix" @click="chooseImg(item)"></image>
									</view>
									<view class="upgrade-levelBox__image-num" v-if="index < 3">X0</view>
								</view>
								<view class="upgrade-levelBox__image" v-if="uploadList.length < 5">
									<view class="upgrade-levelBox__image-bg" :style="'background-image: url( '+ upload +');background-size: 100% 100%;background-repeat: no-repeat;'"
									 @click="chooseImg()">
									</view>
								</view>
							</view> -->
						</view>
					</view>
					<view class="popupBox-contentbg__tips">{{ i18n.mining.openCardSlotUpgrade.tips01 }}</view>
					<view class="">
						<view class="initNoData" v-if="slotCardList.length == 0">{{ i18n.global.noData }}</view>
						<scroll-view class="myPackage__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
							<view class="myPackage-cardBox">
								<view class="myPackage-cardItem" :class="{'myPackage-cardItem--active': typeActive == index }" v-for="(item,index) in slotCardList" :key="index"
								@click="checkType(index)" >
									<!-- <image v-if="index < 3" src="@/static/public/icon-reduce.png" mode="widthFix" class="myPackage-cardItem--close"></image> -->
									<view class="myPackage-cardItem__cardBox">
										<image :src="item.pic" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</scroll-view>	
					</view>
					<!-- <view class="popupBox-cardTitle">请选择消耗海贼数量</view>
					<view class="popupBox-operate">
						<view class="popupBox-operate__btn" @click="reduceBtn()">
							<image src="@/static/public/icon-reduce.png" mode="widthFix"></image>
						</view>
						<view class="popupBox-operate__num">{{ quantity }}</view>
						<view class="popupBox-operate__btn" @click="plusBtn()">
							<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="popupBox-contentbg__boxImage-title popupBox-contentbg__boxImage-title__margin">当前海贼数量：{{ slotCardList.length }}</view> -->
					<view class="popupBox-btn popupBox-btnPadding--01">
						<view class="popupBox-btn__zore3" @click="hidePopup('openCardSlotUpgrade')">{{ i18n.global.cancel }}</view>
						<view class="popupBox-btn__zore2" @click="submit()">{{ i18n.mining.openCardSlotUpgrade.btn01 }}</view>
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
			scrollInto: '',
			cardType: 0,
			typeActive:0,
			quantity:1,
			upload: [
				'@/static/public/img-upload-2.png',
			],
			uploadList: [
				'../../static/mining/icon-mining-01.png',
				'../../static/mining/icon-mining-02.png',
				'../../static/mining/icon-mining-03.png',
				'../../static/mining/icon-mining-04.png',
				// '../../static/mining/icon-mining-05.png',
				'../../static/mining/icon-mining-addBtn.png',
			],
			slotCardList:[],
		};
	},
	watch: {
		randomValue(newValue){
			this.init();
		}
	},
	methods: {
		init(e) {
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
		submit() {
			// let exp = (this.slotCardList[this.typeActive].baseHashRate * this.slotCardList[this.typeActive].ex)
			let exp = this.slotCardList[this.typeActive].ex;
			// this.$emit('openPopup', 'openSuccessUpgrade',exp);
			//升级卡牌
			if (this.slotCardList.length == 0) {
				return this.$tools.toast(this.i18n.mining.openCardSlotUpgrade.toast01);
			}
			this.$Ajax('/front/slot/upgrade',{
					pokerId: this.slotCardList[this.typeActive].id,
					slotId: this.chooseItemInfo.id
				},
				res => {
					if(res.code == 0){
						this.$emit('hidePopup', 'openCardSlotUpgrade');
						// this.$emit('openPopup', 'openSuccessUpgrade',res.obj);
						this.$emit('openPopup', 'openSuccessUpgrade',exp);
						this.$emit('refreshData');
						this.$store.commit('changeUserInfoRandom');
					}
				}
			);
		},
		reduceBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			if(this.slotCardList.length != 0){
				if(this.slotCardList.length == this.quantity){
					this.quantity = this.slotCardList.length;
				}else{
					this.quantity++;
				}
			}
		},
		checkType(index){
			if (this.typeActive != index) {
				this.typeActive = index;
			}
		},
		openPopup(e) {
			console.log(e)			
			this.$refs[e].$refs[e].open();		
		},		
		hidePopup(e) {			
			this.$refs[e].close();		
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'scss/openCardSlotUpgrade';
</style>
