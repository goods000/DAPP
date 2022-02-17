<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openDestoryRecord" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openDestoryRecord')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.index.openDestoryRecord.title }}</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-tabs">
							<view class="popupBox-tabs__title" :class="{'popupBox-tabs__title--active' : tabsActive == 1}" @click="changeTabsActive(1)">{{ i18n.index.openDestoryRecord.header_01 }}</view>
							<view class="popupBox-tabs__title" :class="{'popupBox-tabs__title--active' : tabsActive == 2}" @click="changeTabsActive(2)">{{ i18n.index.openDestoryRecord.header_02 }}</view>
							<view class="popupBox-tabs__title" :class="{'popupBox-tabs__title--active' : tabsActive == 3}" @click="changeTabsActive(3)">{{ i18n.index.openDestoryRecord.header_03 }}</view>
						</view>
						<scroll-view class="failureRecord-height" :scroll-y="true" @scrolltolower="scrolltolower">
							<view class="initNoData" v-if="recordList.length == 0">{{ i18n.global.noData }}</view>
							<view class="failureRecord-item" v-for="(item, index) in recordList" :key="index">
								<view class="failureRecord-item__content">{{ i18n.index.openDestoryRecord.list_01 }}：{{ item.role }}</view>
								<view class="failureRecord-item__content">{{ i18n.index.openDestoryRecord.list_02 }}：{{ item.total / 9 }}{{ i18n.index.openDestoryRecord.currency }}</view>
								<view class="failureRecord-item__content">{{ i18n.index.openDestoryRecord.list_03 }}：{{ item.color }}</view>
								<view class="failureRecord-item__content">{{ i18n.global.time }}：{{ item.createTime }}</view>
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
			
			tabsActive: 1, //1合成失败，2销毁卡牌，3卡槽升级
		};
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.recordList = [];
			this.getRecordList();
		},
		getRecordList() {
			this.$Ajax('/front/poker/destroy/record',{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					type: this.tabsActive
				},
				res => {
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
		changeTabsActive(index){
			if (this.tabsActive != index) {
				this.tabsActive = index;
				this.pageNum = 1;
				this.recordList = [];
				this.getRecordList();
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
.popupBox-tabs{
	width: 100%;
}
</style>
