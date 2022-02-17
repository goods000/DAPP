<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openReceivingRecord" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openReceivingRecord')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.mining.openReceivingRecord.title }}</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-listHeader">
							<view class="popupBox-listHeader__title">{{ i18n.mining.openReceivingRecord.list01 }}</view>
							<view class="popupBox-listHeader__title">{{ i18n.global.status }}</view>
							<view class="popupBox-listHeader__title">{{ i18n.mining.openReceivingRecord.list02 }}</view>
						</view>
						<view class="initNoData" v-if="recordList.length == 0">{{ i18n.global.noData }}</view>
						<scroll-view class="failureRecord-height" :scroll-y="true" :show-scrollbar="false" @scrolltolower="scrolltolower">
							<view class="failureRecord-item" v-for="(item,index) in recordList" :key="index">
								<view class="failureRecord-item__box">
									<view class="failureRecord-item__content">{{ item.createTime | formatTime('MDHM') }}</view>
									<!-- <view class="failureRecord-item__content"><text :class="{'failureRecord-item__content--active' : statusList[item.status - 1] = '领取成功'}">{{ statusList[item.status - 1] }}</text></view> -->
									<view class="failureRecord-item__content">{{ statusList[item.status - 1] }}</text></view>
									<view class="failureRecord-item__content">{{ item.qty }}</view>
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
			pages: 1
		};
	},
	computed: {
		statusList() {
			return [this.i18n.status.success, this.i18n.status.fail];
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.recordList = [];
			this.getRecord();
		},
		getRecord() {
			this.$Ajax('/front/fund/record',{
					pageNum: this.pageNum,
					pageSize: this.pageSize
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
				this.getRecord();
			}
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/pages/composite/components/scss/openfailureRecord';
.popupBox{
	&-contentbg{
		padding: 8upx 9upx 17px;
	}
	&-listHeader{
		&__title{
			&:nth-last-child(1){
				width: 28%;
				text-align: right;
			}
		}
	}
}
.failureRecord{
	&-height{
		padding: 0 20upx;
	}
	&-item{
		padding: 20upx 11upx 14upx;
		&__content:nth-last-child(1){
			width: 35%;
			text-align: right;
		}
	}
}
</style>
