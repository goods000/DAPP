<template>
	<!-- 菜单模块 -->
	<uni-popup ref="incomeReceivePopup" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('incomeReceivePopup')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">TRX—{{ $store.state.platmentCurrencyName }}{{ i18n.index.pledgeMiningPopup.title }}</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__item">
							<view class="popupBox-contentbg__item-info">{{ i18n.index.pledgeMiningPopup.info_label_01 }}</view>
							<view class="popupBox-contentbg__item-info popupBox-contentbg__item-info--active">{{ !/.*\..*/.test(miningInfo[0]) ? miningInfo[0] : miningInfo[0].toFixed(6) }}</view>
						</view>
						<view class="popupBox-contentbg__item">
							<view class="popupBox-contentbg__item-info">{{ i18n.index.pledgeMiningPopup.info_label_02 }}</view>
							<view class="popupBox-contentbg__item-info popupBox-contentbg__item-info--active">{{ !/.*\..*/.test(miningInfo[1]) ? miningInfo[1] : miningInfo[1].toFixed(6) }}</view>
						</view>
						<view class="popupBox-contentbg__item">
							<view class="popupBox-contentbg__item-info">{{ i18n.index.pledgeMiningPopup.info_label_03 }}</view>
							<view class="popupBox-contentbg__item-info popupBox-contentbg__item-info--active">{{ !/.*\..*/.test(miningInfo[2]) ? miningInfo[2] : miningInfo[2].toFixed(6) }}</view>
						</view>
						<view class="popupBox-contentbg__item">
							<view class="popupBox-contentbg__item-info">{{ i18n.index.pledgeMiningPopup.info_label_04 }}</view>
							<view class="popupBox-contentbg__item-info popupBox-contentbg__item-info--active">{{ !/.*\..*/.test(miningInfo[3]) ? miningInfo[3] : miningInfo[3].toFixed(6) }}</view>
						</view>
					</view>
					<view class="popupBox-contentbg__tips">{{ i18n.index.pledgeMiningPopup.calculate_label_01 }}</view>
					<view class="popupBox-input">
						<input type="text" :placeholder="i18n.index.pledgeMiningPopup.enter_toast01" v-model="quantity" placeholder-class="popupBox-input__style" @input="numberFixedDigit"/>
					</view>
					<view class="popupBox-contentbg__boxImage-title">{{ i18n.index.pledgeMiningPopup.calculate_label_02 }}：{{ HZICBalance }}</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<!-- <view class="popupBox-btn__zore2" @click="openPopup('openReceiveIncome')">{{ i18n.index.pledgeMiningPopup.btn_01 }}</view> -->
						<view class="popupBox-btn__zore1" :class="{ 'popupBox-btn__zore2': allowanceValue > 0 }" @click="approve()">
						{{ allowanceValue > 0 ? i18n.index.pledgeMiningPopup.btn_02 : i18n.index.pledgeMiningPopup.btn_03 }}</view>
						<view class="popupBox-btn__zore2" @click="stakeByContract()">{{ i18n.index.pledgeMiningPopup.btn_04 }}</view>
					</view>
					<view class="popupBox-recordTitle" @click="openPopup('openPledgeRecord')">{{ i18n.index.pledgeMiningPopup.see_btn }}</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			quantity: '',
			address:'',
			miningInfo: {},
			allowanceValue: 0,
			HZICBalance: 0,
			quantity: 0,
			canStake: false
		};
	},
	// mounted() {
	// 	this.init();
	// },
	methods: {
		init(e) {
			if (e.show) {
				this.quantity = 0;
				this.getHZICBalance();
				this.getStakeDataByContract();
				this.allowance();
			}
		},
		checkCanStake() {
			this.$Ajax('/front/lp/lp/stake/query',{},
				res => {
					this.canStake = res.obj;
					console.log('是否能质押', res.obj);
				}
			);
		},
		getStakeDataByContract() {
			let parameter = [];
			console.log('11');
			this.$tronWeb.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.miningContractAddress, 'getNetData()', parameter).then(result => {
				let formatterData = this.$tronWeb.getFormatData(result.constant_result[0], 4);
				this.miningInfo = formatterData.map((item, index) => {
					if (index == 1 || index == 3) {
						// var contractDecimal = this.$store.state.HZICContractDecimal;
						var contractDecimal = this.$store.state.HZICContractDecimal;
						return window.tronWeb.toDecimal('0x' + item) / Math.pow(10, contractDecimal) / Math.pow(10, 14);
					} else {
						var contractDecimal = this.$store.state.contractDecimal_HZIC;
						return window.tronWeb.toDecimal('0x' + item) / Math.pow(10, contractDecimal);
					}
				});
				console.log("this.miningInfo：",this.miningInfo);
			});
		},
		// 获取余额
		getHZICBalance() {
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.userWalletAddress
				}
			];
			this.$tronWeb.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.contractAddress_HZIC, 'balanceOf(address)', parameter).then(result => {
				this.HZICBalance = window.tronWeb.toDecimal('0x' + result.constant_result[0]) / Math.pow(10, this.$store.state.contractDecimal_HZIC);
				// console.log('HZICBalance币种数量 ---> ', this.HZICBalance);
			});
		},
		stakeByContract() {
			if (this.quantity <= 0) {
				return this.$tools.toast(this.i18n.index.pledgeMiningPopup.toast_01);
			}
			let parameter = [
				{
					type: 'uint256',
					value: this.$BigNumber(this.quantity).times(Math.pow(10, this.$store.state.contractDecimal_HZIC)).toFixed()
				}
			];
		
			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.miningContractAddress, 'stake(uint256)', parameter).then(result => {
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
								this.$tools.toast(this.i18n.index.pledgeMiningPopup.toast_09);
								this.hidePopup('incomeReceivePopup');
								this.quantity = 0;
							} else {
								this.$tools.toast(this.i18n.index.pledgeMiningPopup.toast_10);
								this.quantity = 0;
							}
						}
					});
				}, 1000);
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
					value: this.$store.state.miningContractAddress
				}
			];
		
			this.$tronWeb.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.contractAddress_HZIC, 'allowance(address,address)', parameter).then(result => {
				this.allowanceValue = window.tronWeb.toDecimal('0x' + result.constant_result[0]);
				// console.log('当前授权币种数量 ---> ', this.allowanceValue);
			});
		},
		approve() {
			if (this.allowanceValue > 0) {
				return this.$tools.toast(this.i18n.index.pledgeMiningPopup.toast_03);
			}
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.miningContractAddress
				},
				{
					type: 'uint256',
					value: this.$BigNumber(100000000).times(Math.pow(10, this.$store.state.contractDecimal_HZIC)).toFixed()
				}
			];
		
			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.contractAddress_HZIC, 'approve(address,uint256)', parameter).then(result => {
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
		receiveIncomeByContract() {
			if (this.miningInfo[4] <= 0) {
				return this.$tools.toast(this.i18n.index.pledgeMiningPopup.toast_06);
			}
		
			if (this.pledgeMiningType == 1) {
				var contractAddress = this.$store.state.contractAddress_LP;
				var contractDecimal = this.$store.state.contractDecimal_LP;
			} else if (this.pledgeMiningType == 2) {
				var contractAddress = this.$store.state.contractAddress_LP;
				var contractDecimal = this.$store.state.contractDecimal_LP;
			}
		
			let parameter = [
				{
					type: 'uint256',
					value: this.pledgeMiningType
				}
			];
		
			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.miningContractAddress, 'extract(uint256)', parameter).then(result => {
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
								this.$emit('hidePopup', 'incomeReceivePopup');
							} else {
								this.$tools.toast(this.i18n.index.pledgeMiningPopup.toast_08);
							}
						}
					});
				}, 1000);
			});
		},
		numberFixedDigit(e) {
			// 只能输入整数
			e.target.value = e.target.value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1');
			this.$nextTick(() => {
				this.quantity = e.target.value;
			});
		},
		openPopup(e,item) {			console.log(e)
			this.$emit('openPopup', e, item);			// this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/incomeReceivePopup';
</style>
