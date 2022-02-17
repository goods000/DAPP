<template>
	<view class="myPackage">
		<view class="myPackage-box">
			<view class="myPackage-btnBox">
				<view class="myPackage-btnBox__item" :class="{ 'myPackage-btnBox__item--active': tabActive == 0 }" @click="changeTabsActive(0)">
					<view class="myPackage-btnBox__item-title" :class="{ 'myPackage-btnBox__item-title--active': tabActive == 0 }">已解锁卡槽18</view>
				</view>
				<view class="myPackage-btnBox__item" :class="{ 'myPackage-btnBox__item--active': tabActive == 1 }" @click="changeTabsActive(1)">
					<view class="myPackage-btnBox__item-title" :class="{ 'myPackage-btnBox__item-title--active': tabActive == 1 }">未解锁卡槽12</view>
				</view>
			</view>
			<template v-if="tabActive == 0">
				<view>
					<scroll-view class="myPackage__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<view class="myPackage-cardBox">
							<view class="myPackage-cardItem myPackage-cardItem--active" v-for="(item,index) in 10" :key="index"
							@click="openDetail">
							<!-- <view class="myPackage-cardItem"> -->
								<view class="myPackage-cardItem__addBtn" v-if="index > 4">
									<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
								</view>
								<view class="myPackage-cardItem__activeTitle" v-if="index < 5">
									<image src="@/static/package/icon-title-active.png" mode="widthFix"></image>
								</view>
								<view class="myPackage-cardItem__cardBox" :class="{'myPackage-cardItem__cardBox--grayscale' : index > 4 }">
									<image v-if="index == 1" src="@/static/package/icon-popupBox-card.png" mode="widthFix"></image>
									<image v-else src="@/static/package/icon-card.png" mode="widthFix"></image>
									<view class="myPackage-cardItem__cardBox-info" v-if="checkActive != index">
										<image src="@/static/package/icon.png" mode="widthFix"></image>
										<view class="myPackage-cardItem__cardBox-info__num">130087</view>
									</view>
								</view>
								<view class="myPackage-cardItem__num myPackage-cardItem__num--red" v-if="index == 1">月光</view>
								<view class="myPackage-cardItem__num myPackage-cardItem__num--ashen" v-else-if="index > 4">月光</view>
								<view class="myPackage-cardItem__num myPackage-cardItem__num--purple" v-else>多弗朗明哥</view>
							</view>
						</view>
					</scroll-view>	
				</view>
			</template>
			<template v-if="tabActive == 1">
				<view>
					<scroll-view class="myPackage__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<view class="myPackage-cardBox">
							<view class="myPackage-cardItem myPackage-cardItem--active" v-for="(item,index) in 15" :key="index">
								<view class="myPackage-cardItem__lockBg">
									<image src="@/static/mining/icon-mining-lock.png" mode="widthFix"></image>
								</view>
								<view class="myPackage-cardItem__cardBox myPackage-cardItem__cardBox--grayscale">
									<image v-if="index == 1" src="@/static/package/icon-popupBox-card.png" mode="widthFix"></image>
									<image v-else src="@/static/package/icon-card.png" mode="widthFix"></image>
								</view>
								<view class="myPackage-cardItem__num myPackage-cardItem__num--ashen">月光</view>
							</view>
						</view>
					</scroll-view>	
				</view>
			</template>
		</view>
		
		<view class="cardSlot">
			<view class="cardSlot-wrapper">
				<view class="cardSlot-contentBg">
					<view class="cardSlot-contentBg__item">
						<view class="cardSlot-contentBg__item-title">我的Bili：0%</view>
						<view class="cardSlot-contentBg__item-record" @click="openRecord()">领取记录</view>
					</view>
					<view class="cardSlot-contentBg__item-title">预估24H领矿量：0.0000.00 Bili</view>
					<view class="cardSlot-contentBg__item-title">当前可领取矿量：0.0000.00 Bili</view>
					<view class="cardSlot-contentBg__item-btn cardSlot-contentBg__item-btn__begin" v-if="tabActive == 0">领取</view>
					<view class="cardSlot-contentBg__item-btn cardSlot-contentBg__item-btn__end" v-if="tabActive == 1">已领取</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tabActive: 0,
				navigateFlag: false,
				scrollInto: "",
				checkActive: 5,
			}
		},
		onShow() {
			this.navigateFlag = false;
		},
		methods:{
			init(){
				this.tabActive == 0
				this.changeTabsActive(0);
			},
			// 查看卡片详情
			openDetail(){
				this.$emit('openPopup', 'openCardSlotDetail');
			},
			// 
			openRecord(){
				this.$emit('openPopup', 'openReceivingRecord');
			},
			triggerCollapse() {
				this.navigateFlag = !this.navigateFlag;
			},
			changeTabsActive(index){
				if (this.tabActive != index) {
					this.tabActive = index;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
@import '/scss/cardSlot';
</style>
