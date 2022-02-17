<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openbuyHero" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openbuyHero')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.exchange.openbuyHero.title }}</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">{{ i18n.exchange.openbuyHero.tips01 }}</view>
						<view class="popupBox-contentbg__info">
							<view class="popupBox-contentbg__cardImage">
								<view class="popupBox-contentbg__cardImage--bg popupBox-contentbg__cardImage--border">
									<image :src="heroDetails.pic" mode="widthFix" class="popupBox-contentbg__cardImage--card"></image>
								</view>
								<!-- <view class="popupBox-contentbg__imageNum">{{ heroDetails.role }}</view> -->
							</view>
						</view>
					</view>
					
					<view class="popupBox-nameBg">
						<view class="popupBox-content__name">{{ heroDetails.role }}</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title popupBox-content__item-title--center">{{ heroDetails.role }}（{{ heroDetails.color }}）{{ i18n.exchange.openbuyHero.tips02 }}</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-info">{{ i18n.exchange.openbuyHero.tips03 }}：{{ heroDetails.baseHashRate }} </view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-info">{{ i18n.exchange.openbuyHero.tips04 }}：{{ heroDetails.ex }} </view>
						</view>
					</view>
					
					<view class="popupBox-btn popupBox-btnPadding--01">
						<view class="popupBox-btn__zore3" @click="hidePopup('openbuyHero')">{{ i18n.global.cancel }}</view>
						<view class="popupBox-btn__zore1":class="{ 'popupBox-btn__zore3': allowanceValue > 0 }" @click="approve()">
							{{ allowanceValue > 0 ? i18n.index.pledgeMiningPopup.btn_02 : i18n.global.Authorization }}
						</view>
						<view class="popupBox-btn__zore2" @click="submit()">{{ i18n.exchange.buy }}</view>
					</view>
					<view class="popupBox-data popupBox-btnPadding--01">
						<view class="popupBox-data__num">{{ i18n.exchange.openbuyHero.btn01 }}：{{ quantity*heroDetails.price | number(2) }} {{ $store.state.platmentCurrencyName }}</view>
						<view class="popupBox-data__num">{{ $store.state.platmentCurrencyName }}{{ i18n.global.money }}：{{ platmentBalance }} </view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	// props:['heroDetails'],
	data() {
		return {
			checkActive: '',
			quantity: 1,
			heroDetails:{},
			userWallet: '',
			allowanceValue:0,
			platmentBalance:0,
		};
	},
	watch:{
		quantity(newValue, oldValue) {
			console.log('newValue：',newValue);
			if(newValue == ''){
				this.total = this.quantity * this.heroDetails.price;
				return
			}else{
				this.total = newValue * this.heroDetails.price;
			}
		},
	},
	mounted() {
		this.init();
		var that = this;
		that.$Bus.$on('heroDetails',function(heroDetails){
			that.heroDetails = heroDetails;
		})
	},
	methods: {
		init(){
			this.quantity = 1;
			this.total = this.quantity * this.heroDetails.price;
			console.log("that.heroDetails：",this.heroDetails);
			this.getPlatmentBalance();
		},
		submit() {
			if(this.heroDetails.address == this.$store.state.userWalletAddress){
				return this.$tools.toast(this.i18n.exchange.openbuyHero.toast01);
			}
			let parameter = [
				{
					type: 'uint256',
					value: this.heroDetails.pokerId
				}
			];
			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.marketTradeContractAddress, 'trade(uint256)', parameter).then(result => {
				this.$store.commit('setFunctionQueue', ['cardBuy', {
					hash: result.txid,
					id: this.heroDetails.id
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
								this.cardBuy(result.txid);
							} else {
								this.$tools.toast(this.i18n.shop.toast02);
								this.$store.commit('deleteFunctionQueue', 'cardBuy');
							}
						}
					});
				}, 1000);
			});
		},
		cardBuy(hash) {
			this.$Ajax('/front/poker/trade',{
					hash: hash,
					id: this.heroDetails.id
				},
				res => {
					this.$emit('refreshData');
					this.$store.commit('deleteFunctionQueue', 'cardBuy');
					this.hidePopup('openbuyHero');
					this.$emit('openPopup', 'openBuySuccess');
					this.$Bus.$emit('successItem',this.heroDetails);
					setTimeout(() => {						this.$emit('refreshData');						this.$store.commit('changeUserInfoRandom');					}, 3000);
				}
			);
		},
		getPlatmentBalance() {
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.userWalletAddress
				}
			];
			this.$tronWeb.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.HBICContractAddress, 'balanceOf(address)', parameter).then(result => {
				this.platmentBalance = window.tronWeb.toDecimal('0x' + result.constant_result[0]) / Math.pow(10, this.$store.state.HBICContractDecimal);
				console.log('platmentBalance币种数量 ---> ', this.platmentBalance);
			});
		},
		allowance() {
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.userWalletAddress
				},
				{
					type: 'address',
					value: this.$store.state.marketTradeContractAddress
				}
			];
		
			this.$tronWeb
				.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.HBICContractAddress, 'allowance(address,address)', parameter)
				.then(result => {
					this.allowanceValue = window.tronWeb.toDecimal('0x' + result.constant_result[0]);
					console.log('当前授权币种数量 ---> ', this.allowanceValue);
				});
		},
		approve() {
			if (this.allowanceValue > 0) {
				return this.$tools.toast(this.i18n.index.pledgeMiningPopup.toast_03);
			}
		
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.marketTradeContractAddress
				},
				{
					type: 'uint256',
					// value: 1000000 * Math.pow(10, this.$store.state.HBICContractDecimal)
					value: this.$BigNumber(100000000).times(Math.pow(10, this.$store.state.HBICContractDecimal)).toFixed()
				}
			];
		
			this.$tronWeb
				.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.HBICContractAddress, 'approve(address,uint256)', parameter)
				.then(result => {
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
									this.$tools.toast(this.i18n.index.pledgeMiningPopup.toast_04);
									this.allowance();
								} else {
									this.$tools.toast(this.i18n.index.pledgeMiningPopup.toast_05);
								}
							}
						});
					}, 1000);
				});
		},
		reduceBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			this.quantity++;
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import 'scss/openbuyHero';
.popupBox{
	&-btn{
		// margin: 39px 30upx 0;
		& > view{
			width: 30%;
		}
	}
}
</style>
