<template>
	<view class="pages">
		<scroll-view :scroll-y="true" style="height: 100vh;overflow-y: auto;">
		<view class="main">
			<view class="headerBox">
				<view class="header-bg">
					<image class="header-bg__image" src="@/static/index/icon-header-bg.png" mode="widthFix"></image>
				</view>
				<view class="headerBox-address">{{ $store.state.userWalletAddress | walletAddressConceal(6) }} / {{ $store.state.initLanguage.toUpperCase() }}
				<image src="@/static/index/icon-select.png" mode="widthFix" class="headerBox-address__image" @click="openPopup('openLanguage')"></image></view>
				<view class="headerBox-titleBox">
					<image class="headerBox-titleBox__image" :src="require(`@/static/index/icon-index-title-${$store.state.initLanguage}.png`)"  mode="widthFix"></image>
					<!-- <image class="headerBox-titleBox__image" :src="$store.state.initLanguage == 'en' ? '../../static/index/icon-index-title-en.png' : '../../static/index/icon-index-title-cn.png'" mode="widthFix"></image> -->
					<view class="headerBox-titleBox__title">{{ i18n.index.tips01 }}</view>
					<view class="headerBox-titleBox__title">{{ i18n.index.tips02 }}</view>
					<view class="headerBox-titleBox__title">{{ i18n.index.tips03 }}</view>
				</view>
			</view>
			<view class="gangBox">
				<view class="gangBox-wrapper">
					<image class="gangBox-imageTop" :src="require(`@/static/index/icon-index-listTitle-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
					<!-- <scroll-view :scroll-y="true" class="gangBox-height"> -->
					<view class="gangBox-height">
						<view class="initNoData" v-if="gang.length == 0">{{ i18n.global.noData }}</view>
						<view class="gangBox-list">
							<view class="gangBox-list__item" v-for="(item,index) in gang" :key="index" @click="checkType(index)">
								<image class="gangBox-list__item-image" :src="item.pic" mode="widthFix"></image>
								<view class="gangBox-list__item-box">
									<!-- <view class="gangBox-list__item-title">{{ item.name }}</view> -->
									<view class="gangBox-list__item-price">{{ item.consumeQuantity }}USDT</view>
									<view class="gangBox-list__item-priceTitle">{{ i18n.index.price }}</view>
									<view class="gangBox-list__item-numBox">
										<image @click="reduceBtn()" src="@/static/public/icon-reduce.png" mode="widthFix"></image>
										<view class="gangBox-list__item-numBox__num">{{ quantity }}</view>
										<image @click="plusBtn()" src="@/static/public/icon-plus.png" mode="widthFix"></image>
									</view>
									<view class="gangBox-list__item-priceTitle">{{ i18n.index.stock }}/{{ i18n.index.stockSell }}</view>
									<view class="gangBox-list__item-priceTitle">{{ boxCount }}/{{ item.total - item.qty }}</view>
								</view>
							</view>
						</view>
					</view>
					<!-- </scroll-view> -->
				</view>
				<view class="gangBox-btn">
					<image @click="getBuy()" class="gangBox-btn__image" :src="require(`@/static/index/icon-index-${$store.state.initLanguage}.png`)" mode=""></image>
				</view>
				<view class="gangBox-titleBox">
					<view class="gangBox-titleTips" @click="openPopup('openRecord')">{{ i18n.index.btn01 }}</view>
				</view>
				<view class="gangBox-tipsBox">
					<view class="gangBox-tipsBox__tips">
						<image src="../../static/index/icon-left.png" mode="widthFix"></image>
						<view class="gangBox-tipsBox__tips-title">{{ i18n.index.tips04 }}</view>
						<image src="../../static/index/icon-right.png" mode="widthFix"></image>
					</view>
					<view class="gangBox-tipsBox__list">
						<!-- <view class="gangBox-tipsBox__list-content">1.{{ i18n.index.tipsCentent01 }}</view> -->
						<view class="gangBox-tipsBox__list-content">{{ i18n.index.tipsCentent02 }}</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 购买记录 -->
		<openRecord ref="openRecord"/>
		<!-- 语言切换 -->
		<openLanguage ref="openLanguage" />
		</scroll-view>
	</view>
</template>

<script>
import openRecord from './components/openRecord';
import openLanguage from './components/openLanguage';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'
 
export default {
	components: {
		openRecord,
		openLanguage,
		lowkeyLoading
	},
	data() {
		return {
			langType: '',
			checkActive: 0,
			gang:[],
			locationSearch: '',
			canClick: true,
			quantity:1,
			boxCount: 0,
		};
	},
	onShow() {
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58 && this.$store.state.token) {
					clearInterval(obj);
					
					if(window.location.search.indexOf('address=') > -1){
						this.locationSearch = window.location.search.split('?address=')[1].substring(0, 34);
					}
					this.init();
				}
			}, 10);
		})();
	},
	methods: {
		init(){
			this.teamList();
			this.checkParentByAddress();
			this.getCurrencyData();
		},
		checkParentByAddress() {
			this.$Ajax('/front/common/query', {}, res => {
				console.log('欲绑定上级地址 -> ', this.locationSearch);
		
				if (!res.obj && this.locationSearch != '') {
					this.bindParent();
				}
			});
		},
		bindParent() {
			if (this.$store.state.userWalletAddress == this.locationSearch) {
				return;
			}
			this.$Ajax(
				'/front/common/bind/parent',
				{
					parentAddress: this.locationSearch
				},
				res => {}
			);
		},
		// 获取认购币种合约信息
		getCurrencyData() {
			this.$Ajax('/front/guild/buy/getCurrencyData', {},
				res => {
					this.currencyData = res.obj;
				}
			);
		},
		// 获取盲盒总数
		getCardBoxCount(){
			this.$Ajax('/front/ubx/resume', {
				id: this.gang[this.checkActive].id
			}, res => {
				this.boxCount = res.obj;
			});
		},
		// 点击购买启动链上
		getBuy(){
			if (this.quantity > this.boxCount || this.quantity > this.gang[this.checkActive].total - this.gang[this.checkActive].qty) {
				return this.$tools.toast(this.i18n.index.toast01);
			}
			// if(this.canClick){
			// 	this.canClick = false;
				this.$Ajax('/front/ubx/buy/isCanBuyUbx',{
					qty: this.quantity,
					id: this.gang[this.checkActive].id,
				},
					res => {
						if (res.code == 0) {
							let parameter = [
								{
									type: 'address',
									value: this.gang[this.checkActive].inAddress
								},
								{
									type: 'uint256',
									value: (this.quantity * this.gang[this.checkActive].consumeQuantity)  * Math.pow(10,this.currencyData.contractDecmial)
								}
							];
							this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.currencyData.contractAddress, 'transfer(address,uint256)', parameter).then(result => {
								this.$store.commit('setFunctionQueue', ['buyBox', {
									hash: result.txid,
									qty: this.quantity,
									id: this.gang[this.checkActive].id
								}])
								
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
											if (transcationInfo.receipt.result == 'SUCCESS') {
												this.submit(result.txid);
												this.canClick = true;
											} else {
												this.$tools.toast(this.i18n.status.fail);
												this.cancelBuy();
												this.$store.commit('deleteFunctionQueue', 'buyBox');
												this.canClick = true;
											}
										}
									});
								}, 1000);
							}).catch(error => {
								console.log("取消了认购", error);
								this.cancelBuy();
								this.canClick = true;
							});
						}else{
							this.canClick = true;
						}
					}
				);
			// }
		},
		// 点击购买
		submit(hash){
			this.$Ajax('/front/ubx/buy',{
					hash: hash,
					qty: this.quantity,
					id: this.gang[this.checkActive].id
				},
				res => {
					this.$store.commit('deleteFunctionQueue', 'buyBox');
					
					this.$tools.toast(this.i18n.index.status01);
					this.quantity = 1;
					this.getCardBoxCount();
					this.teamList();
				}
			);
		},
		// 取消购买
		cancelBuy(){
			this.$Ajax('/front/ubx/buy/cancelBuyUbx',{
					id: this.gang[this.checkActive].id
				},
				res => {
					this.$tools.toast(this.i18n.index.status04);
					this.gang[this.checkActive].sold = 0;
				}
			);
		},
		// 公会列表
		teamList(){
			this.$Ajax('/front/ubx/list',{},
				res => {
					this.gang = res.obj;
					this.getCardBoxCount();
				}
			);
		},
		reduceBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			this.quantity++;
		},
		checkType(index){
			// console.log("checkActive",index,this.checkActive);
			if (this.checkActive != index) {
				this.checkActive = index;
			}
		},
		openPopup(e) {
			console.log("e：",e);
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
}
</script>

<style lang="scss" scoped>
@import '/scss/index';
</style>
