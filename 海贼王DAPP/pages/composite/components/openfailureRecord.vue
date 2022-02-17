<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openfailureRecord" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openfailureRecord')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.composite.openResult.headerTitle }}</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-tabs">
							<view class="popupBox-tabs__title" :class="{'popupBox-tabs__title--active' : tabsActive == 1}" @click="changeTabsActive(1)">{{ i18n.composite.openResult.failTitle }}</view>
							<view class="popupBox-tabs__title" :class="{'popupBox-tabs__title--active' : tabsActive == 2}" @click="changeTabsActive(2)">{{ i18n.composite.openResult.successTitle }}</view>
						</view>
						<scroll-view class="failureRecord-height" :scroll-y="true" :show-scrollbar="false" @scrolltolower="scrolltolower" v-if="tabsActive == 1">
							<view class="initNoData" v-if="recordList.length == 0">{{ i18n.global.noData }}</view>
							<view class="failureRecord-item" v-for="(item, index) in recordList" :key="index">
								<view class="failureRecord-item__box">
									<view class="failureRecord-item__content">{{ i18n.composite.openResult.title }}：{{ item.roleName }}({{ item.from }})</view>
								</view>
								<view class="failureRecord-item__content">{{ i18n.composite.openResult.list03 }}：<text class="failureRecord-item__content--active">{{ item.roleName }}({{ item.to }})</text></view>
								<view class="failureRecord-item__content">{{ i18n.composite.openResult.list04 }}：{{ item.price }}/{{ item.qty * item.price }}</view>
								<view class="failureRecord-item__content">{{ i18n.composite.openResult.list05 }}：{{ item.option }}</view>
								<view class="failureRecord-item__content">{{ i18n.composite.openResult.list06 }}：{{ item.released }}</view>
								<view class="failureRecord-item__content">{{ i18n.composite.openResult.list07 }}：{{ item.destroy }}</view>
								<view class="failureRecord-item__content failureRecord-item__box">{{ i18n.global.time }}：{{ item.createTime | formatTime('MDHM')}}
									<text class="failureRecord-item__content-record" @click="openPopup('openfailureDetail', item)">{{ i18n.composite.openResult.details }}</text>
								</view>
							</view>
						</scroll-view>
						<scroll-view class="failureRecord-height" :scroll-y="true" :show-scrollbar="false" @scrolltolower="scrolltolower" v-else>
							<view class="initNoData" v-if="successList.length == 0">{{ i18n.global.noData }}</view>
							<view class="failureRecord-item" v-for="(item, index) in successList" :key="index">
								<view class="failureRecord-item__box">
									<view class="failureRecord-item__content">{{ i18n.composite.openResult.title }}：{{ item.roleName }}({{ item.from }})</view>
								</view>
								<view class="failureRecord-item__content">{{ i18n.composite.openResult.list03 }}：<text class="failureRecord-item__content--active">{{ item.roleName }}({{ item.to }})</text></view>
								<view class="failureRecord-item__content">{{ i18n.composite.openResult.list08 }}：{{ item.qty }}{{ i18n.package.openDestroySuccess.Sheet }}</view>
								<view class="failureRecord-item__content">{{ i18n.composite.openResult.list09 }}：{{ i18n.status.success }}</view>
								<view class="failureRecord-item__content failureRecord-item__box">{{ i18n.global.time }}：{{ item.createTime }}
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
			successList: [
				// {id: 1, address: "TMbYHCPEYrQ7C1gtSPjd6enyWHSyD1PgG8",createTime: "2021-12-21 11:54:43",from: "紫色",price: 10,qty: 1,roleName: "乔拉可尔·米霍克", to: "黑色"}
			],
			pageNum: 1,
			pageSize: 20,
			pages: 1,
			tabsActive: 1,
		};
	},
	// mounted() {
	// 	this.init();
	// },
	methods: {
		init() {
			this.pageNum = 1;
			this.recordList = [];
			this.successList = [];
			this.getFailRecordList();
		},
		getFailRecordList() {
			this.$Ajax('/front/poker/fail/record',{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					// console.log(res);
					this.pages = res.obj.pages;
					this.recordList = [...this.recordList, ...res.obj.list];
				}
			);
		},
		getSuccessRecordList() {
			this.$Ajax('/front/poker/success/record',{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					// console.log(res);
					this.pages = res.obj.pages;
					this.successList = [...this.successList, ...res.obj.list];
				}
			);
		},
		scrolltolower() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				if(this.tabsActive == 1){
					this.getFailRecordList();
				}else{
					this.getSuccessRecordList();
				}
			}
		},
		changeTabsActive(index){
			if (this.tabsActive != index) {
				this.tabsActive = index;
				this.pageNum = 1;
				this.recordList = [];
				this.successList = [];
				if(this.tabsActive == 1){
					this.getFailRecordList();
				}else{
					this.getSuccessRecordList();
				}
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
@import '/scss/openfailureRecord';
</style>
