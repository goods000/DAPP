<template>
	<view class="myPackage">
		<view class="myPackage-box">
			<view class="myPackage-btnBox">
				<view class="myPackage-btnBox__item" :class="{ 'myPackage-btnBox__item--active': tabActive == 0 }" @click="changeTabsActive(0)">
					<view class="myPackage-btnBox__item-title" :class="{ 'myPackage-btnBox__item-title--active': tabActive == 0 }">{{ i18n.mining.tabTitle01 }}{{ lockNum }}</view>
				</view>
				<view class="myPackage-btnBox__item" :class="{ 'myPackage-btnBox__item--active': tabActive == 1 }" @click="changeTabsActive(1)">
					<view class="myPackage-btnBox__item-title" :class="{ 'myPackage-btnBox__item-title--active': tabActive == 1 }">{{ i18n.mining.tabTitle02 }}{{ unlockNum }}</view>
				</view>
			</view>
			<template>
				<view>
					<scroll-view class="myPackage__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<view class="myPackage-cardBox">
							<view class="myPackage-cardItem myPackage-cardItem--active" v-for="(item,index) in slotList" :key="index"
							v-if="(tabActive == 0 && item.unlock != 0) || (tabActive == 1 && item.unlock == 0)"
							@click="openPopup('openCardSlotDetail', item)">
							<!-- unlock 1 解锁 pokerId == 0 可装备 -->
								<view class="myPackage-cardItem__lockBg" v-if="tabActive == 1 && item.unlock == 0">
									<image src="@/static/mining/icon-mining-lock.png" mode="widthFix"></image>
								</view>
								<view class="myPackage-cardItem__addBtn" v-if="tabActive == 0 && item.pokerId == 0">
									<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
								</view>
								<view class="myPackage-cardItem__activeTitle" v-if="tabActive == 0 && item.pokerId != 0">
									<image src="@/static/package/icon-title-active.png" mode="widthFix"></image>
								</view>
								<view class="myPackage-cardItem__cardBox" :class="{'myPackage-cardItem__cardBox--grayscale' : item.pokerId == 0 }">
									<image :src="item.pic" mode="widthFix"></image>
									<view class="myPackage-cardItem__cardBox-info">
										<image src="@/static/package/icon.png" mode="widthFix"></image>
										<view class="myPackage-cardItem__cardBox-info__num">{{ item.baseHashRate*1 + (item.baseHashRate *(item.extra * 100)/100) }}</view>
									</view>
								</view>
								<view class="myPackage-cardItem__num" :class="[
									{ 'myPackage-cardItem__num--noColor': item.color == null },
									{ 'myPackage-cardItem__num--grey': item.color == '灰色' },
									{ 'myPackage-cardItem__num--purple': item.color == '紫色' },
									{ 'myPackage-cardItem__num--ashen': item.color == '黑色' },
									{ 'myPackage-cardItem__num--red': item.color == '红色' },
									{ 'myPackage-cardItem__num--yellow': item.color == '黄色' }
								]">{{ item.role }}</view>
							</view>
						</view>
					</scroll-view>	
				</view>
			</template>
			<!-- <template v-if="tabActive == 1">
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
			</template> -->
		</view>
		
		<view class="cardSlot">
			<view class="cardSlot-wrapper">
				<view class="cardSlot-contentBg">
					<view class="cardSlot-contentBg__item">
						<view class="cardSlot-contentBg__item-title">{{ i18n.mining.tips01 }}:</view>
						<view class="cardSlot-contentBg__item-num">{{ fundBalanceInfo.available }}</view>
					</view>
					<view class="cardSlot-contentBg__item">
						<view class="cardSlot-contentBg__item-title">{{ i18n.mining.tips02 }}</view>
						<view class="cardSlot-contentBg__item-num">{{ dayReward }}</view>
					</view>
					<view class="cardSlot-contentBg__item cardSlot-contentBg__item-flex">
						<view class="cardSlot-contentBg__item-record" @click="openPopup('openReceivingRecord')">{{ i18n.mining.btn01 }}</view>
						<view class="cardSlot-contentBg__item-btn cardSlot-contentBg__item-btn__begin" @click="getReceive()">{{ i18n.mining.btn02 }}</view>
						<!-- <view class="cardSlot-contentBg__item-btn cardSlot-contentBg__item-btn__end" v-if="tabActive == 1">{{ i18n.mining.btn03 }}已领取</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: ['randomValue'],
		data() {
			return {
				slotList: [],
				tabActive: 0,
				navigateFlag: false,
				scrollInto: "",
				checkActive: 5,
				lockNum:0, // 已解锁卡槽
				unlockNum:0,
				dayReward: 0,
				fundBalanceInfo: 0, // 领取矿量
				canReceiveIncome: true,
				receiveQuantity: 0,
			};
		},
		watch: {
			randomValue(newValue){
				this.init();
			}
		},
		mounted() {
			this.lockNum = 0;
			this.unlockNum = 0;
			this.init();
		},
		methods: {
			init() {
				this.lockNum = 0;
				this.unlockNum = 0;
				this.getSlotList();
				this.getFundBalance();
				this.getDayRewardInfo();
				this.getReceiveQuantity();
			},
			getSlotList() {
				this.$Ajax('/front/slot/list', {
					address: this.$store.state.userWalletAddress
				}, res => {
					this.slotList = res.obj;
					//  unlock 1 解锁 pokerId == 0 可装备 
					this.slotList.forEach((item,index) => {
						if(item.unlock == 1){
							this.lockNum ++ ;
						}
					})
					this.unlockNum = this.slotList.length - this.lockNum;
				});
			},
			// 
			getReceiveQuantity() {
				this.$Ajax('/front/fund/trx', {}, res => {
					this.receiveQuantity = res.obj;
				});
			},
			getReceive(){
				if(!this.canReceiveIncome){
					return false
				}
				
				this.canReceiveIncome = false;
				
				if (this.fundBalanceInfo.available <= 0) {
					return this.$tools.toast(this.i18n.mining.toast01);
				}
							
				let feeQuantity = this.$BigNumber(this.receiveQuantity).times(Math.pow(10, this.$store.state.feeContractDecimal)).toFixed()
				console.log("1111",this.$store.state.FeeContractAddress, feeQuantity)
				window.tronWeb.trx.sendTransaction(this.$store.state.FeeContractAddress, feeQuantity).then(result => {
					uni.showLoading({
						title: this.i18n.toast.OnConfirmation,
						mask: true
					});
					let timer = setInterval(() => {
						this.$tronWeb.getTransactionInfo(result.txid).then(transcationInfo => {
							console.log('transcationInfo ---> ', transcationInfo);
							if (transcationInfo != null && transcationInfo.receipt != null) {
								clearInterval(timer);
								uni.hideLoading();
								this.receiveIncome(result.txid);
								this.canReceiveIncome = true;
							}
						});
					}, 1000);
				});
			},
			receiveIncome(hash) {
				this.$Ajax('/front/fund/extract', {
					hash: hash,
					qty: this.fundBalanceInfo.available
				}, res => {
					// this.$store.commit('deleteFunctionQueue', 'fundExtract');
					// // this.$tools.toast(this.i18n.mining.toast02);
					// // this.getFundRecord();
				});
			},
			// 当前可领取矿量
			getFundBalance() {
				this.$Ajax('/front/fund/balance', {}, res => {
					this.fundBalanceInfo = res.obj;
				});
			},
			// 预估24H领矿量
			getDayRewardInfo() {
				this.$Ajax('/front/mine/24h/qty', {}, res => {
					this.dayReward = res.obj;
				});
			},
			triggerCollapse() {
				this.navigateFlag = !this.navigateFlag;
			},
			changeTabsActive(index){
				if (this.tabActive != index) {
					this.tabActive = index;
				}
			},
			openPopup(e, item) {
				// if (item.unlock != 0) {
					this.$emit('openPopup', e, item);
				// }
			},
			hidePopup(e) {
				this.$emit('hidePopup', e);
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '/scss/cardSlot';
</style>
