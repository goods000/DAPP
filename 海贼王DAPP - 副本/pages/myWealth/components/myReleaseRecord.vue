<template>
	<view class="initListBox-market">
		<view class="initListBox-header">
			<image src="@/static/myWealth/icon-wealthList-header--03.png" mode="widthFix"></image>
		</view>
		<view class="initListBox-wrapper">
			<scroll-view class="exchangeRecord-height" :scroll-y="true" @scrolltolower="scrolltolower">
				<view class="exchangeRecord-item" v-for="(item,index) in recordList" :key="index">
					<view class="exchangeRecord-item__content">{{ i18n.mining.rewardBox.header_03 }}（{{ $store.state.projectCurrencyName }}）：{{ item.qty }}</view>
					<view class="exchangeRecord-item__content">{{ i18n.mining.rewardBox.header_02 }}：{{ typeList[item.type - 2] }}</view>
					<view class="exchangeRecord-item__content">{{ i18n.mining.rewardBox.header_01 }}：{{ item.createTime }}</view>
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
			recordList: [],
			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	mounted() {
		this.init();
	},
	computed: {
		typeList(){
			return [this.i18n.mining.rewardBox.type_01,this.i18n.mining.rewardBox.type_02]
		}
	},
	methods: {
		init(){
			this.pageNum = 1;
			this.recordList = [];
			this.getRecordList();
		},
		// 释放记录
		getRecordList() {
			this.$Ajax('/front/mine/record',{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				},
				res => {
					console.log(res);
					this.pages = res.obj.pages;
					this.recordList = [...this.recordList, ...res.obj.list];
				}
			);
		},
		scrolltolower() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getRecordList();
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