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
								<view class="failureRecord-item__content">{{ i18n.index.list01 }}：{{ item.gangName }}</view>
								<view class="failureRecord-item__content">{{ i18n.index.list04 }}：{{ statusList[item.success] }}</view>
								<view class="failureRecord-item__content">{{ i18n.index.list03 }}(USDT)：{{ item.price }}</view>
								<view class="failureRecord-item__content">{{ i18n.index.list02 }}：{{ item.createTime }}</view>
							</view>
						</scroll-view>
					</view>
					<!-- <view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openRecord')">{{ i18n.index.gotIt }}</view>
					</view> -->
				</view>
			</view> 
		</view>
	</uni-popup>
</template>

<script>
export default {
	props:['gang'],
	data() {
		return {
			recordList: [],
			pageNum: 1,
			pageSize: 20,
			pages: 1,
			// gang:{},
			time:'',
			// statusList:['认购中','认购成功','认购失败'],
		};
	},
	methods: {
		init(e) {
			if (e.show) { 
				this.pageNum = 1;
				this.recordList = [];
				// console.log("gang",this.gang);
				this.getRecord();
				this.statusList = [this.i18n.index.status01,this.i18n.index.status02,this.i18n.index.status03];
			}
		},
		getRecord() {
			this.$Ajax('/front/gang/record',{
			// this.$Ajax('/front/gang/address/info',{
					// address: this.$store.state.userWalletAddress,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					// this.pages = res.obj.pages;
					// this.recordList = this.recordList.concat(res.obj.list);
					this.recordList = res.obj.list;
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
