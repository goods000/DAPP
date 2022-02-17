<template>
	<view class="initListBox-market">
		<view class="initListBox-header">
			<image src="@/static/myWealth/icon-wealthList-header--02.png" mode="widthFix"></image>
		</view>
		<view class="initListBox-wrapper">
			<view class="initNoData" v-if="withdrawRecordList.length == 0">{{ i18n.global.noData }}</view>
			<scroll-view class="exchangeRecord-height" :scroll-y="true"  @scrolltolower="scrolltolower">
				<view class="exchangeRecord-item" v-for="(item,index) in withdrawRecordList" :key="index">
					<view class="exchangeRecord-item__content">提币金额（{{ $store.state.projectCurrencyName }}）：{{ item.qty }}</view>
					<!-- <view class="exchangeRecord-item__content">手续费({{ $store.state.projectCurrencyName }})：2400</view> -->
					<view class="exchangeRecord-item__content">提币地址：{{ item.address | walletAddressConceal(6) }}</view>
					<view class="exchangeRecord-item__content">时间：{{ item.createTime | formatTime('MDHM') }}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	// 接受父组件的值
	props:{
		tabActive: Number
	},
	data() {
		return {
			withdrawRecordList: [],
			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init(){
			this.pageNum = 1;
			this.withdrawRecordList = [];
			this.recordList = [];
			this.getWithdrawRecord();
		},
		// 提取记录
		getWithdrawRecord(){
			this.$Ajax('/front/fund/record',{
				pageNum: this.pageNum,
				pageSize: this.pageSize
			},
			res => {
				this.pages = res.obj.pages;
				this.withdrawRecordList = [...this.withdrawRecordList, ...res.obj.list];
			})
		},
		scrolltolower() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getWithdrawRecord();
			}
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
@import '/scss/myWealthRecord';
</style>