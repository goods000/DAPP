<template>
	<view class="initListBox-market">
		<view class="initListBox-header">
			<image v-if="tabActive == 0" :src="require(`@/static/exchange/icon-exchangeTab-01-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
			<image v-if="tabActive == 1" :src="require(`@/static/exchange/icon-exchangeTab-02-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
		</view>
		<view class="initListBox-wrapper" v-if="tabActive == 0">
			<view class="market-operate">
				<view class="market-operate__item">
					<text class="market-operate__item-title">{{ i18n.exchange.change }}</text>
					<image class="market-operate__item-sort" src="@/static/exchange/icon-exchange-sort.png" @click="triggerCollapse()"
					:class="navigateFlag ? 'market-operate__item-sort--active' : ''" mode="widthFix"></image>
					 <view class="market-operate__item-position" v-if="navigateFlag">
						 <view class="market-operate__item-position__item" :class="{'market-operate__item-position__item--active' : colorFilterActive == 0 }"
						  @click="changeColorFilterActive(0)">{{ i18n.exchange.all }}</view>
						<view class="market-operate__item-position__item" :class="{'market-operate__item-position__item--active' : colorFilterActive == index+1 }"
						v-for="(item, index) in colorFilterList" :key="index + 1" @click="changeColorFilterActive(index + 1)">{{ item.color }}</view>
					 </view>
				</view>
				<!-- <view class="market-operate__item">
					<text class="market-operate__item-title">时间顺序</text>
					<image class="market-operate__item-sort" src="@/static/exchange/icon-exchange-sort.png" 
					:class="navigateFlag ? 'market-operate__item-sort--active' : ''"
					 @click="triggerCollapse()" mode="widthFix"></image>
				</view> -->
			</view>
			<template>
				<scroll-view class="myPackage__height" :scroll-y="true" :show-scrollbar="false" @scrolltolower="scrolltolower">
					<view class="initNoData" v-if="orderList.length == 0">{{ i18n.global.noData }}</view>
					<view class="myPackage-cardBox">
						<view class="myHero-cardItem" v-for="(item,index) in orderList" :key="index">
							<view class="myPackage-cardItem myPackage-cardItem--active">
								<!-- v-for="(subItem, subIndex) in item.pokerList" :key="subIndex" @click="openPopup('syntheticCardPopup', item, subIndex)"> -->
								<!-- <view class="myPackage-cardItem__activeTitle">
									<image src="@/static/package/icon-title-active.png" mode="widthFix"></image>
								</view> -->
								<view class="myPackage-cardItem__cardBox">
									<image :src="item.pic" mode="widthFix"></image>
									<view class="myPackage-cardItem__cardBox-info">
										<image src="@/static/package/icon.png" mode="widthFix"></image>
										<view class="myPackage-cardItem__cardBox-info__num">{{ item.baseHashRate }}
										</view>
									</view>
								</view>
								<view class="myPackage-cardItem__num" :class="[
									{ 'myPackage-cardItem__num--grey': item.color == '灰色' },
									{ 'myPackage-cardItem__num--purple': item.color == '紫色' },
									{ 'myPackage-cardItem__num--ashen': item.color == '黑色' },
									{ 'myPackage-cardItem__num--red': item.color == '红色' },
									{ 'myPackage-cardItem__num--yellow': item.color == '黄色' }
								]">{{ item.role }}</view>
							</view>
							<view class="myHero-btn" @click="buy(item)">{{ i18n.exchange.buy }}</view>
						</view>
					</view>
				</scroll-view>
			</template>
		</view>
		<view class="initListBox-wrapper" v-if="tabActive == 1">
			<view class="market-listBox">
				<scroll-view class="market-listBox__height" :class="{'market-listBox__heightTab' : tabActive == 1}"
					:scroll-y="true" @scrolltolower="scrolltolower">
					<view class="initNoData" v-if="myOrderList.length == 0">{{ i18n.global.noData }}</view>
					<view class="market-listBox__item" v-for="(item,index) in myOrderList" :key="index">
						<view class="market-listBox__item-centerBox">
							<view class="market-listBox__item-centerBox__title">{{ i18n.exchange.list01 }}：{{ item.role }}</view>
							<view class="market-listBox__item-cancel" @click="cancelOrder(item)">{{ i18n.exchange.cancel }}</view>
						</view>
						<view class="market-listBox__item-centerBox">
							<view class="market-listBox__item-centerBox__title">{{ i18n.exchange.list02 }}：{{ item.color }}</view>
						</view>
						<view class="market-listBox__item-centerBox">
							<view class="market-listBox__item-centerBox__title">{{ i18n.exchange.list03 }}：{{ item.price }} {{ $store.state.platmentCurrencyName }}</view>
						</view>
						<view class="market-listBox__item-centerBox">
							<view class="market-listBox__item-centerBox__title">{{ i18n.exchange.list04 }}：{{ item.createTime }}</view>
						</view>
					</view>
				</scroll-view>
				<view class="market-btn">
					<view class="market-btn__style" @click="sell">{{ i18n.exchange.sell }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// 接受父组件的值
		props: ['tabActive', 'randomValue'],
		data() {
			return {
				searchList: [],
				orderList: [],
				pageNum: 1,
				pageSize: 20,
				pages: 1,
				searchValue: '',
				myOrderList: [],
				navigateFlag: false,
				colorFilterList: [],
				colorFilterActive: 0,
				chooseItemInfo: {},
			};
		},
		watch: {
			randomValue(newValue) {
				// console.log("newValue：",newValue);
				this.init();
			},
			tabActive(newValue) {
				// console.log("tabActivenewValue：",newValue);
				this.init();
			},
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.pageNum = 1;
				this.orderList = [];
				this.myOrderList = [];
				this.getColorList();
				this.getOrderList();
				this.getMyOrderList();
			},
			getColorList() {
				this.$Ajax('/front/poker/color/list', {}, res => {
					this.colorFilterList = res.obj;
				});
			},
			// 交易市场
			getOrderList() {
				this.$Ajax('/front/poker/ex/list', {
						colorId: this.colorFilterActive == 0 ? '' : this.colorFilterList[this.colorFilterActive - 1].id,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					res => {
						this.pages = res.obj.pages;
						this.orderList = [...this.orderList, ...res.obj.list];
					}
				);
			},
			// 我的挂卖
			getMyOrderList() {
				this.$Ajax('/front/poker/my/publish', {
						address: this.$store.state.userWalletAddress,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					res => {
						this.pages = res.obj.pages;
						this.myOrderList = [...this.myOrderList, ...res.obj.list];
					}
				);
			},
			// 撤单
			cancelOrder(item) {
				this.chooseItemInfo = item;
				let parameter = [
					{
						type: 'uint256',
						value: this.chooseItemInfo.pokerId
					}
				];
						
				this.$tronWeb
					.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.marketTradeContractAddress, 'cancel(uint256)', parameter)
					.then(result => {
						this.$store.commit('setFunctionQueue', ['revokeOrder', {
							hash: result.txid,
							id: this.chooseItemInfo.id
						}])
						
						uni.showLoading({
							title: this.i18n.global.loading,
							mask: true
						});
						
						let timer = setInterval(() => {
							this.$tronWeb.getTransactionInfo(result.txid).then(transcationInfo => {
								console.log('transcationInfo ---> ', transcationInfo);
								if (transcationInfo != null && transcationInfo.receipt != null) {
									clearInterval(timer);
									uni.hideLoading();
						
									if (transcationInfo.receipt.result == 'SUCCESS') {
										this.revokeOrder(result.txid);
									} else {
										this.$tools.toast(this.i18n.market.publishOrderBox.toast_01);
										this.$store.commit('deleteFunctionQueue', 'revokeOrder');
									}
								}
							});
						}, 1000);
					});
			},
			revokeOrder(hash){
				this.$Ajax(
					'/front/poker/cancel',
					{
						hash: hash,
						id: this.chooseItemInfo.id
					},
					res => {
						this.$emit('refreshData');
						this.$store.commit('deleteFunctionQueue', 'revokeOrder');
						this.$tools.toast(this.i18n.exchange.toast01);
						setTimeout(() => {
							this.init();
						}, 3000);
					}
				);
			},
			// 购买
			buy(item) {
				this.$emit('openPopup', 'openbuyHero', item);
				this.$Bus.$emit('heroDetails', item);
			},
			// 挂单
			sell() {
				this.$emit('openPopup', 'openSellingHeroes');
			},
			changeColorFilterActive(index) {
				if (this.colorFilterActive != index) {
					this.colorFilterActive = index;
					this.navigateFlag = false;
					this.pageNum = 1;
					this.orderList = [];
					this.getOrderList();
				}
			},
			scrolltolower() {
				if (this.pageNum >= this.pages) {
					return this.$tools.toast(this.i18n.global.atLast);
				} else {
					this.pageNum++;
					if(this.tabActive == 0){
						this.getOrderList();
					}else{
						this.getMyOrderList();
					}
					
				}
			},
			triggerCollapse() {
				this.navigateFlag = !this.navigateFlag;
			},
			openPopup(e) {
				this.$refs[e].$refs[e].open();
			},
			hidePopup(e) {
				this.$refs[e].close();
			}
		}
	};
</script>

<style lang="scss" scoped>
@import '/scss/exchangeMarket';
</style>
