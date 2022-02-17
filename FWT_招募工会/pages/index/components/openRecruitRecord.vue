<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openRecruitRecord" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-container">
					<view class="popupBox-header">
						<image class="popupBox-header__image" :src="$store.state.initLanguage == 'en' ? '../../static/index/icon-open-title-en.png' : '../../static/index/icon-open-title.png'" mode="widthFix"></image>
					</view>
					<view class="popupBox-list">
						<scroll-view scroll-y="true" class="popupBox-reheight" @scrolltolower="scrolltolower">
							<view class="initNoData" v-if="gangRecord == ''">{{ i18n.global.noData }}</view>
							<view class="popupBox-list__item" v-for="(item,index) in gangRecord" :key="index">
								<view class="popupBox-list__item-time">{{ item.createTime }}</view>
								<view class="popupBox-list__item-box numBox">
									<view class="numBox-item">
										<view class="numBox-item__title">{{ i18n.index.list01 }}</view>
										<view class="numBox-item__num">{{ item.guildName }}</view>
									</view>
									<view class="numBox-item">
										<view class="numBox-item__title">{{ i18n.index.list02 }}</view>
										<view class="numBox-item__num">{{ item.consumeQuantity }}USDT</view>
									</view>
									<view class="numBox-item">
										<view class="numBox-item__title">{{ i18n.index.list03 }}</view>
										<view class="numBox-item__num numBox-item__num--active">{{ statusList[item.txStatus] }}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="popupBox-line"></view>
					<view class="popupBox-inviteBox">
						<view class="popupBox-inviteBox__title">{{ i18n.index.inviteTitle }}</view>
						<view class="popupBox-inviteBox__code">{{ gangRecord != '' ? invite + '?address=' + this.$store.state.userWalletAddress : '/' }}</view>
						<image v-if="invite" class="popupBox-inviteBox__image" src="@/static/public/icon-copy.png" mode="widthFix" @click="copyAddress"></image>
					</view>
				</view>
			</view>
			<view class="popupBox-close" @click="hidePopup('openRecruitRecord')">
				<image src="@/static/public/icon-colse.png" mode="widthFix"></image>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	// props: ['gangRecord'],
	data() {
		return {
			checkActive: '',
			quantity: 1,
			total: 0,
			boxCount: 0,
			gangRecord:[
				// {createTime:'12-18 12:22',guildName:'黑精灵公会',consumeQuantity:'120',txStatus:0},
				// {createTime:'12-18 12:22',guildName:'森林会5',consumeQuantity:'1',txStatus:2},
				// {createTime:'12-18 12:22',guildName:'血精灵公会',consumeQuantity:'8000',txStatus:1},
			],
			pageNum: 1,
			pageSize: 20,
			pages: 1,
			invite:'',
			statusList:[],
		};
	},
	beforeMount() {
		// this.total = this.quantity * this.boxDetails.usdtPrice;
		// this.getBalance();
		// this.getRecord();
	},
	methods: {
		init(){
			// console.log("gangRecord",this.gangRecord);
			this.gangRecord = [],
			this.getInvite();
			this.getRecord();
			this.statusList = [this.i18n.index.status01,this.i18n.index.status02,this.i18n.index.status03];
		},
		// 邀请链接
		getInvite(){
			this.$Ajax('/front/common/invite/link',{},
				res => {
					this.invite = res.obj;
				}
			);
		},
		// 查看自己的认购记录
		getRecord() {
			this.$Ajax('/front/guild/record',{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					this.pages = res.obj.pages;
					this.gangRecord = [...this.gangRecord, ...res.obj.list];
					this.$emit('gangRecord',this.gangRecord[0]);
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
		copyAddress() {
			let inviteAddress = this.invite+ '?address=' + this.$store.state.userWalletAddress;
			this.$tools.copy(inviteAddress);
		},
		openPopup(e,item) {			console.log(e,item)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {
			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import  '/scss/openPopupRecord.scss';
.popupBox{
	&-btnPadding{
		padding: 0 0 20upx;
	}
	&-data{
		padding: 20upx 0 60upx;
	}
}
</style>
