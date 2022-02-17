<template>
	<view class="pages">
		<scroll-view :scroll-y="true" style="height: 100vh;overflow-y: auto;">
			<view class="main">
				<view class="headerBox">
					<view class="header-bg">
						<image class="header-bg__image" src="@/static/index/icon-header-bg.png" mode="widthFix"></image>
					</view>
					<view class="headerBox-address">{{ $store.state.userWalletAddress | walletAddressConceal(6) }} /
						{{ $store.state.initLanguage.toUpperCase() }}
						<image src="@/static/index/icon-select.png" mode="widthFix" class="headerBox-address__image"
							@click="openPopup('openLanguage')"></image>
					</view>
					<view class="headerBox-titleBox">
						<image class="headerBox-titleBox__image"
							:src="$store.state.initLanguage == 'en' ? '../../static/index/icon-index-title-en.png' : '../../static/index/icon-index-title.png'"
							mode="widthFix"></image>
						<view class="headerBox-titleBox__title">{{ i18n.index.tips01 }}</view>
						<view class="headerBox-titleBox__title">{{ i18n.index.tips02 }}</view>
						<view class="headerBox-titleBox__title">{{ i18n.index.tips03 }}</view>
					</view>
				</view>
				<view class="gangBox">
					<view class="gangBox-wrapper">
						<image class="gangBox-imageTop"
							:src="$store.state.initLanguage == 'en' ? '../../static/index/icon-index-listTitle-en.png' : '../../static/index/icon-index-listTitle.png'"
							mode="widthFix"></image>
						<!-- <scroll-view :scroll-y="true" class="gangBox-height"> -->
						<view class="gangBox-height">
							<view class="initNoData" v-if="gang.length == 0">{{ i18n.global.noData }}</view>
							<view class="gangBox-list">
								<view class="gangBox-list__item"
									:class="{'gangBox-list__item--active' : index == checkActive }"
									v-for="(item,index) in gang" :key="index" @click="checkType(index)">
									<view class="gangBox-list__item-title" :class="[{'gangBox-list__item-title--active' : index == checkActive },
								{'gangBox-list__item-title--success' : item.sold == 1 }]">{{ item.name }}</view>
								</view>
							</view>
							<view class="gangBox-list__item-box">
								<view class="gangBox-list__item-priceTitle">{{ i18n.index.price }}</view>
								<view class="gangBox-list__item-price">{{ gang[checkActive].consumeQuantity }}USDT</view>
							</view>
						</view>
						<!-- </scroll-view> -->
					</view>
					<view class="gangBox-btn">
						<image @click="getBuy()" class="gangBox-btn__image"
							:src="$store.state.initLanguage == 'en' ? '../../static/index/icon-index-en.png' : '../../static/index/icon-index.png'"
							mode=""></image>
					</view>
					<view class="gangBox-titleBox">
						<view class="gangBox-titleTips" @click="openPopup('openRecruitRecord')">{{ i18n.index.btn01 }}
						</view>
						<view class="gangBox-titleTips" @click="openPopup('openteamRecord')">{{ i18n.index.btn02 }}
						</view>
					</view>
					<view class="gangBox-tipsBox">
						<view class="gangBox-tipsBox__tips">
							<image src="../../static/index/icon-left.png" mode="widthFix"></image>
							<view class="gangBox-tipsBox__tips-title">{{ i18n.index.tips04 }}</view>
							<image src="../../static/index/icon-right.png" mode="widthFix"></image>
						</view>
						<view class="gangBox-tipsBox__list">
							<view class="gangBox-tipsBox__list-content">1.{{ i18n.index.tipsCentent01 }}</view>
							<view class="gangBox-tipsBox__list-content">2.{{ i18n.index.tipsCentent02 }}</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 招募记录 -->
			<openRecruitRecord ref="openRecruitRecord" :gangRecord="gangRecord" />
			<!-- 推荐记录 -->
			<openteamRecord ref="openteamRecord" />
			<!-- 语言切换 -->
			<openLanguage ref="openLanguage" />
		</scroll-view>
	</view>
</template>

<script>
	import openRecruitRecord from './components/openRecruitRecord';
	import openteamRecord from './components/openteamRecord';
	import openLanguage from './components/openLanguage';

	import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

	export default {
		components: {
			openRecruitRecord,
			openteamRecord,
			openLanguage,
			lowkeyLoading
		},
		data() {
			return {
				langType: '',
				checkActive: 0,
				gang: [],
				gangRecord: [],
				currencyData: {},
				locationSearch: '',
				canClick: true,
				isBuySuccess: '',
			};
		},
		onShow() {
			(async () => {
				let obj = setInterval(async () => {
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
			init() {
				this.teamList();
				this.getInfo();
				this.checkParentByAddress();
				this.getCurrencyData();
			},
			checkParentByAddress() {
				this.$Ajax('/front/common/query', {}, res => {
					// console.log('欲绑定上级地址 -> ', this.locationSearch);
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
					'/front/common/bind/parent', {
						parentAddress: this.locationSearch
					},
					res => {}
				);
			},
			// 获取公会认购币种合约信息
			getCurrencyData() {
				this.$Ajax('/front/guild/buy/getCurrencyData', {},
					res => {
						this.currencyData = res.obj;
					}
				);
			},
			// 点击购买启动链上
			getBuy() {
				// this.openPopup('openSuccessfulSubscription');
				// console.log("this.gangRecord",this.$refs.openRecruitRecord.gangRecord.length);
				// if (this.$refs.openRecruitRecord.gangRecord.length != 0) {
				// 	return this.$tools.toast("您已认购");
				// }
				if (this.isBuySuccess == true) {
					return this.$tools.toast(this.i18n.index.toast01);
				}
				if (this.gang[this.checkActive].sold == 1) {
					return this.$tools.toast(this.i18n.index.toast02);
				}
				// if(this.canClick){
				// 	this.canClick = false;
				// 	console.log("this.canClick1",this.canClick);
				this.$Ajax('/front/guild/buy/isCanBuyGuild', {
						payQunatity: this.gang[this.checkActive].consumeQuantity,
						guildId: this.gang[this.checkActive].id
					},
					res => {
						if (res.code == 0) {
							let parameter = [{
									type: 'address',
									value: this.gang[this.checkActive].inAddress
								},
								{
									type: 'uint256',
									value: this.gang[this.checkActive].consumeQuantity * Math.pow(10, this
										.currencyData.contractDecmial)
								}
							];
							this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.currencyData
								.contractAddress, 'transfer(address,uint256)', parameter).then(result => {
								this.$store.commit('setFunctionQueue', ['buyGang', {
									hash: result.txid,
									payQunatity: this.gang[this.checkActive].consumeQuantity,
									id: this.gang[this.checkActive].id
								}])

								uni.showLoading({
									title: this.i18n.toast.OnConfirmation,
									mask: true
								});
								let timer = setInterval(() => {
									this.$tronWeb.getTransactionInfo(result.txid).then(
										transcationInfo => {
											console.log('transcationInfo ---> ', transcationInfo);
											if (transcationInfo != null && transcationInfo
												.receipt != null) {
												clearInterval(timer);
												uni.hideLoading();
												if (transcationInfo.receipt.result == 'SUCCESS') {
													this.submit(result.txid);
													this.canClick = true;
												} else {
													this.$tools.toast(this.i18n.status.fail);
													this.cancelBuy();
													this.$store.commit('deleteFunctionQueue',
														'buyGang');
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
						} else {
							this.canClick = true;
						}
					}
				);
				// }
			},
			// 点击购买
			submit(hash) {
				this.$Ajax('/front/guild/buy', {
						hash: hash,
						payQunatity: this.gang[this.checkActive].consumeQuantity,
						id: this.gang[this.checkActive].id
					},
					res => {
						this.$store.commit('deleteFunctionQueue', 'buyGang');

						// this.openPopup('openRecruitRecord', this.gangRecord);
						this.$tools.toast(this.i18n.index.status01);
						this.gang[this.checkActive].sold = 1;
					}
				);
			},
			// 取消认购公会
			cancelBuy() {
				this.$Ajax('/front/guild/buy/cancelBuyGuild', {
						guildId: this.gang[this.checkActive].id
					},
					res => {
						this.$tools.toast(this.i18n.index.status04);
						this.gang[this.checkActive].sold = 0;
					}
				);
			},
			// 公会列表
			teamList() {
				this.$Ajax('/front/guild/list', {},
					res => {
						// this.$tools.toast('尽量溜达溜达');
						this.gang = res.obj;
					}
				);
			},
			// 公会地址信息
			getInfo() {
				this.$Ajax('/front/guild/address/isBuySuccess', {},
					res => {
						this.isBuySuccess = res.obj;
					}
				);
			},
			checkType(index) {
				// console.log("checkActive",index,this.checkActive);
				if (this.checkActive != index) {
					this.checkActive = index;
				}
			},
			openPopup(e) {
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
