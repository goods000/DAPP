<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openRecord" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openRecord')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.index.subscriptionRecord }}</view>
					<view class="popupBox-contentbg">
						<view class="initNoData" v-if="recordList.length == 0">{{ i18n.global.noData }}</view>
						<scroll-view class="failureRecord-height" :scroll-y="true" @scrolltolower="scrolltolower">
							<view class="failureRecord-item" v-for="(item,index) in recordList" :key="index">
								<view class="failureRecord-item__content">{{ i18n.index.list01 }}：{{ item.ubxName }}</view>
								<view class="failureRecord-item__content">{{ i18n.index.list03 }}：{{ item.qty }}</view>
								<view class="failureRecord-item__content">{{ i18n.index.list02 }}({{ item.typeStr }})：{{ item.price * item.qty }}</view>
								<view class="failureRecord-item__content">{{ i18n.index.list05 }}：{{ item.success == 0 ? i18n.status.fail : i18n.status.success }}</view>
								<view class="failureRecord-item__content">{{ i18n.index.list04 }}：{{ item.createTime }}</view>
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
	methods: {
		init(e) {
			if (e.show) {
				this.pageNum = 1;
				this.recordList = [];
				this.getRecord();
			}
		},
		getRecord() {
			this.$Ajax(
				'/front/ubx/record',{
					address: this.$store.state.userWalletAddress,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					this.pages = res.obj.pages;
					this.recordList = this.recordList.concat(res.obj.list);
				}
			);
		},
		scrolltolower(e) {
			if (this.pageNum >= this.pages) {
				// return this.$tools.toast('到底了');
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
@import '/scss/openRecord';
</style>
