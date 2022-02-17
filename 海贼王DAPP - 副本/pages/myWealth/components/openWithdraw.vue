<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openWithdraw" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openWithdraw')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">提币</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">温馨提示：</view>
						<view class="popupBox-contentbg__tipsContent">请在提币前认真核对钱包地址是否有误，若因自己失误导致漏填、填错，其产生的财产损失须由自己承担，平台无法进行追回、无法进行赔偿。</view>
					</view>
					<view class="popupBox-input popupBox-input--flex">
						<view class="popupBox-input__title">{{ $store.state.projectCurrencyName }}</view>
						<input type="text" placeholder="请输入提币金额" v-model="price" placeholder-class="popupBox-input__style"/>
						<view class="popupBox-input__title">全部</view>
					</view>
					<view class="popupBox-cardTitle">当前可提：{{ balanceInfo.available }}</view>
					<view class="popupBox-input">
						<input type="text" placeholder="请输入钱包地址" v-model="address" placeholder-class="popupBox-input__style" disabled="disabled"/>
					</view>
					<view class="popupBox-fee">手续费({{ $store.state.projectCurrencyName }})：<text>0</text></view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="submit">提币</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props:['balanceInfo'],
	data() {
		return {
			checkActive: '',
			address: '',
			quantity: 10,
			price:'',
			fee:''
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init(){
			console.log("balanceInfo",this.balanceInfo);
			this.address = this.$store.state.gangContractAddress;
			// this.getWithdrawFee();
		},
		// 提取手续费收款地址
		getWithdrawFee(){
			this.$Ajax('/front/fund/service/receiver',{},res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.fee = res.obj;
					}
				}
			);
		},
		// 点击购买启动链上
		submit(){
			if (this.price == '') {
				return this.$tools.toast('请输入提币金额');
			}
			if (this.balanceInfo.available <= 0) {
				return this.$tools.toast(this.i18n.index.incomeReceivePopup.toast_01);
			}
			
			let parameter = [
				{
					type: 'uint256',
					value: this.balanceInfo.available * Math.pow(10, this.$store.state.OPCContractDecimal)
				}
			];
			
			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.incomeContractAddress, 'extract(uint256)', parameter).then(result => {
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
								this.getWithdraw(result.txid);
							} else {
								this.$tools.toast('提取失败');
							}
						}
					});
				}, 1000);
			});
		},
		getWithdraw(hash){
			this.$Ajax('/front/fund/extract',{
					hash: hash,
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$emit('openPopup', 'openSuccess');
						this.hidePopup('openWithdraw');
						this.price = '';
					}
				}
			);
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
// @import '@/pages/package/components/scss/openPopupBox';
@import '/scss/openWithdraw';
@import '@/pages/exchange/components/scss/openSellingHeroes';
</style>
