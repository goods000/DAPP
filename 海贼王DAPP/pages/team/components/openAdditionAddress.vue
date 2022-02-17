<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openAdditionAddress" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openAdditionAddress')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.team.openAdditionAddress.title }}</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-listHeader">
							<view class="popupBox-listHeader__title">{{ i18n.global.time }}</view>
							<view class="popupBox-listHeader__title">{{ i18n.global.address }}</view>
						</view>
						<scroll-view class="failureRecord-height" :scroll-y="true" :show-scrollbar="false" @scrolltolower="scrolltolower">
							<view class="initNoData" v-if="recordList.length == 0">{{ i18n.global.noData }}</view>
							<view class="failureRecord-item" v-for="(item, index) in recordList" :key="index">
								<view class="failureRecord-item__box">
									<view class="failureRecord-item__content">{{ item.createTime }}</view>
									<view class="failureRecord-item__content">{{ item.address | walletAddressConceal(4) }}</view>
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
			recordList: [
				// {createTime:'2021/12/08 12:02:00',qty:'2352010'},
			],
			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	methods: {
		init(e) {
			this.pageNum = 1;
			this.recordList = [];
			this.getRecordList();
		},
		getRecordList() {
			this.$Ajax('/front/address/sub/list',{
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
			// console.log('ddd');
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getRecordList();
			}
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openAdditionAddress';
.popupBox{
	&-contentbg{
		padding: 8upx 9upx 17px;
	}
} 
.failureRecord{
	&-height{
		padding: 0 20upx;
	}
	&-item{
		padding: 20upx 11upx 14upx;
	}
}
</style>
