<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openPledgeRecord" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openPledgeRecord')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.index.openPledgeRecord.title }}</view>
					<view class="popupBox-contentbg">
						<!-- <view class="popupBox-tabs">
							<view class="popupBox-tabs__title" :class="{'popupBox-tabs__title--active' : tabsActive == 0}" @click="changeTabsActive(0)">{{ i18n.index.openPledgeRecord.tabHeader01 }}</view>
							<view class="popupBox-tabs__title" :class="{'popupBox-tabs__title--active' : tabsActive == 1}" @click="changeTabsActive(1)">{{ i18n.index.openPledgeRecord.tabHeader02 }}</view>
						</view> -->
						<scroll-view class="failureRecord-height" :scroll-y="true"  @scrolltolower="scrolltolower">
							<view class="initNoData" v-if="recordList.length == 0">{{ i18n.global.noData }}</view>
							<view class="failureRecord-item" v-for="(item, index) in recordList" :key="index">
								<view class="failureRecord-item__content">{{ i18n.index.openPledgeRecord.list01 }}(TRX-{{ $store.state.projectCurrencyName }})：{{ item[1] }}</view>
								<view class="failureRecord-item__content">{{ i18n.global.status }}：{{ statusList[item[5] - 1] }}</view>
								<view class="failureRecord-item__box">
									<view class="failureRecord-item__content">{{ i18n.global.time }}：{{ item[2] * 1000 | formatTime('YMDHMS') }}</view>
									<text class="failureRecord-item__content--active" @click="toDetails(item)">{{ i18n.index.openPledgeRecord.list05 }}</text>
								</view>
							</view>
						</scroll-view>
					</view>
				
					
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			recordList: [],
			pageNum: 1,
			pageSize: 20,
			pages: 1,
			tabsActive: 1,
		};
	},
	computed: {
		statusList() {
			return [this.i18n.index.openPledgeRecord.status_01, this.i18n.index.openPledgeRecord.status_02];
		}
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.recordList = [];
			this.getStateRecordByContract();
		},
		getStateRecordByContract() {
			let parameter = [];
		
			this.$tronWeb.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.miningContractAddress, 'stakeRecord()', parameter).then(result => {
				/* 
				1:  ID 
				2： 质押数量
				3： 质押时间（秒）
				4： 已领取收益
				5： 无用
				6： 状态 1质押中 2已赎回
				 */
				this.recordList = this.$tronWeb.getFormatData(result.constant_result[0], 6, true).reverse();
				
				this.recordList.forEach((item, index) => {
					item[1] = item[1] / Math.pow(10, this.$store.state.contractDecimal_OPC);
					item[3] = item[3] / Math.pow(10, this.$store.state.HBICContractDecimal);
				});
			});
		},
		scrolltolower() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getStateRecordByContract();
			}
		},
		toDetails(item){
			this.openPopup('openPledgeRecordDetails',item);
			this.hidePopup('openPledgeRecord');
		},
		changeTabsActive(index){
			if(this.tabsActive != index){
				this.tabsActive = index;
			}
		},
		openPopup(e, item) {
			// console.log(e,item)
			this.$emit('openPopup', e, item);
		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPledgeRecord';
</style>
