<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openPledgeRecordDetails" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openPledgeRecordDetails')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.index.openPledgeRecordDetails.title }}</view>
					<view class="popupBox-contentbg">
						<!-- <view class="popupBox-tabs">
							<view class="popupBox-tabs__title" :class="{'popupBox-tabs__title--active' : tabsActive == 0}" @click="changeTabsActive(0)">{{ i18n.index.openPledgeRecordDetails.tabHeader01 }}</view>
							<view class="popupBox-tabs__title" :class="{'popupBox-tabs__title--active' : tabsActive == 1}" @click="changeTabsActive(1)">{{ i18n.index.openPledgeRecordDetails.tabHeader02 }}</view>
						</view> -->
						<view class="popupBox-contentbg__item">
							<view class="popupBox-contentbg__item-info">{{ i18n.index.openPledgeRecordDetails.tips01 }}(TRX-{{ $store.state.projectCurrencyName }})：</view>
							<view class="popupBox-contentbg__item-info popupBox-contentbg__item-info--active">{{ !/.*\..*/.test(stakeData[0]) ? stakeData[0] : stakeData[0].toFixed(6) }}</view>
						</view>
						<view class="popupBox-contentbg__item">
							<view class="popupBox-contentbg__item-info">{{ i18n.index.openPledgeRecordDetails.tips02 }}({{ $store.state.projectCurrencyName }})：</view>
							<view class="popupBox-contentbg__item-info popupBox-contentbg__item-info--active">{{ !/.*\..*/.test(stakeData[1]) ? stakeData[1] : stakeData[1].toFixed(6) }}</view>
						</view>
						<view class="popupBox-contentbg__item">
							<view class="popupBox-contentbg__item-info">{{ i18n.index.openPledgeRecordDetails.tips03 }}({{ $store.state.projectCurrencyName }})：</view>
							<view class="popupBox-contentbg__item-info popupBox-contentbg__item-info--active">{{ !/.*\..*/.test(stakeData[2]) ? stakeData[2] : stakeData[2].toFixed(6) }}</view>
						</view>
					</view>
					<view class="failureRecord-itemBox">
						<view class="failureRecord-itemHeader">
							<view class="failureRecord-itemHeader__content">{{ i18n.index.openPledgeRecordDetails.list02 }}</view>
							<view class="failureRecord-itemHeader__content">{{ i18n.index.openPledgeRecordDetails.list03 }}</view>
						</view>
						<scroll-view class="failureRecord-height" :scroll-y="true" :show-scrollbar="false" @scrolltolower="scrolltolower">
							<view class="initNoData" v-if="recordList.length == 0">{{ i18n.global.noData }}</view>
							<view class="failureRecord-itemHeader" v-for="(item, index) in recordList" :key="index">
								<view class="failureRecord-itemHeader__content">{{ (item[1] * 1000) | formatTime('YMDHMS') }}</view>
								<view class="failureRecord-itemHeader__content">{{ item[0] }}</view>
							</view>
						</scroll-view>
					</view>
					<!-- <view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__zore2" @click="takeBack()">{{ i18n.index.openPledgeRecordDetails.btn_01 }}</view>
						<view class="popupBox-btn__zore3" @click="receiveIncomeByType()">{{ i18n.index.pledgeMiningPopup.btn_01 }}</view>
					</view> -->
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="takeBack()">{{ i18n.index.openPledgeRecordDetails.btn_01 }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['chooseItemInfo'],
	data() {
		return {
			recordList: [],
			stakeData: {},
			canDoMethod: true
		};
	},
	computed: {
		statusList() {
			return [this.i18n.index.openPledgeRecord.status_01, this.i18n.index.openPledgeRecord.status_02];
		}
	},
	methods: {
		init(e) {
			if (e.show) {
				console.log(this.chooseItemInfo);
				this.getRecordListByContract();
				this.getStakeDataByContract();
			}
		},
		getRecordListByContract() {
			let parameter = [
				{
					type: 'uint256',
					value: this.chooseItemInfo[0]
				}
			];
			this.$tronWeb
				.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.miningContractAddress, 'extractRecord(uint256)', parameter)
				.then(result => {
					/* 
				1:  ID 
				2： 质押数量
				3： 质押时间（秒）
				4： 已领取收益
				5： 无用
				6： 状态 1质押中 2已赎回
				 */
					this.recordList = this.$tronWeb.getFormatData(result.constant_result[0], 2, true).reverse();
					this.recordList.forEach((item, index) => {
						item[0] = item[0] / Math.pow(10, this.$store.state.HZICContractDecimal) / Math.pow(10, 14);
					});
				});
		},
		getStakeDataByContract() {
			let parameter = [
				{
					type: 'uint256',
					value: this.chooseItemInfo[0]
				}
			];
			this.$tronWeb.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.miningContractAddress, 'getStakeData(uint256)', parameter).then(result => {
				/* 
				1:  ID 
				2： 质押数量
				3： 质押时间（秒）
				4： 已领取收益
				5： 无用
				6： 状态 1质押中 2已赎回
				 */
				let data = this.$tronWeb.getFormatData(result.constant_result[0], 3);
				this.stakeData = data.map((item, index) => {
					if (index == 1 || index == 2) {
						var contractDecimal = this.$store.state.HZICContractDecimal;
						return window.tronWeb.toDecimal('0x' + item) / Math.pow(10, contractDecimal) / Math.pow(10, 14);
					} else {
						var contractDecimal = this.$store.state.contractDecimal_HZIC;
						return window.tronWeb.toDecimal('0x' + item) / Math.pow(10, contractDecimal);
					}
				});
			});
		},
		/* 赎回 */
		takeBack() {
			if (!this.canDoMethod) {
				return false;
			}
			this.canDoMethod = false;
		
			let parameter = [
				{
					type: 'uint256',
					value: this.chooseItemInfo[0]
				}
			];
			this.$tronWeb
				.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.miningContractAddress, 'take(uint256)', parameter)
				.then(result => {
					uni.showLoading({
						title: this.i18n.global.loading,
						mask: true
					});
					setTimeout(() => {
						uni.hideLoading();
						this.canDoMethod = true;
						this.$tools.toast(this.i18n.mining.openSuccessPopup.tips01);
						this.hidePopup('openPledgeRecordDetails');
					}, 3000);
				})
				.catch(error => {
					uni.hideLoading();
					this.canDoMethod = true;
				});
		},
		/* 提取 */
		receiveIncomeByType() {
			if (!this.canDoMethod) {
				return false;
			}
			this.canDoMethod = false;
		
			this.receiveIncomeByLP();
		},
		receiveIncomeByLP() {
			let parameter = [
				{
					type: 'uint256',
					value: this.chooseItemInfo[0]
				}
			];
		
			this.$tronWeb
				.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.miningContractAddress, 'extract(uint256)', parameter)
				.then(result => {
					uni.showLoading({
						title: this.i18n.global.loading,
						mask: true
					});
		
					setTimeout(() => {
						uni.hideLoading();
						this.canDoMethod = true;
						this.$tools.toast(this.i18n.mining.openSuccessPopup.tips01);
						this.hidePopup('openPledgeRecordDetails');
					}, 3000);
				})
				.catch(error => {
					uni.hideLoading();
					this.canDoMethod = true;
				});
		},
		changeTabsActive(index){
			if(this.tabsActive != index){
				this.tabsActive = index;
				this.getRecordList();
			}
		},
		scrolltolower() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getRecordList();
			}
		},
		openPopup(e, item) {
			// console.log(e,item)
			this.$emit('openPopup', e, item);
		},		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPledgeRecord';
.popupBox{
	&-contentbg{
		margin-bottom: 0;
	}
}
.failureRecord{
	&-height{
		height: calc(100vh - 1140upx );
	}
}
</style>
