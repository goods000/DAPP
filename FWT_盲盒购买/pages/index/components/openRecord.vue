<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openRecord" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper popupBox-wrapperbg">
				<view class="popupBox-container">
					<view class="popupBox-header">
						<image class="popupBox-header__image" :src="require(`@/static/index/icon-open-title01-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
					</view>
					<view class="popupBox-list">
						<scroll-view scroll-y="true" class="popupBox-height" @scrolltolower="scrolltolower">
							<view class="initNoData" v-if="listRecord.length == 0">{{ i18n.global.noData }}</view>
							<view class="popupBox-list__item popupBox-list__item-line" v-for="(item,index) in listRecord" :key="index">
								<view class="popupBox-list__item-time">{{ item.createTime }}（{{ statusList[item.success] }}）</view>
								<view class="popupBox-list__item-box numBox">
									<view class="numBox-item">
										<view class="numBox-item__title">{{ i18n.index.list01 }}</view>
										<view class="numBox-item__num">{{ item.ubxName }}</view>
									</view>
									<view class="numBox-item">
										<view class="numBox-item__title">{{ i18n.index.list04 }}</view>
										<view class="numBox-item__num">{{ item.qty }}</view>
									</view>
									<view class="numBox-item">
										<view class="numBox-item__title">{{ i18n.index.list02 }}</view>
										<view class="numBox-item__num numBox-item__num--active">{{ item.qty*item.consumeQuantity }}{{ item.typeStr }}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="popupBox-close" @click="hidePopup('openRecord')">
				<image src="@/static/public/icon-colse.png" mode="widthFix"></image>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			checkActive: '',
			quantity: 1,
			total: 0,
			boxCount: 0,
			listRecord:[],
			pageNum: 1,
			pageSize: 20,
			pages: 1,
			invite:'',
			statusList:[],
		};
	},
	mounted() {
	},
	methods: {
		init(){
			this.listRecord = [];
			console.log("listRecord",this.listRecord);
			this.statusList = [this.i18n.index.status01,this.i18n.index.status02,this.i18n.index.status03];
			this.getRecord();
		},
		// 查看直推的认购记录
		getRecord() {
			this.$Ajax('/front/ubx/record',{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					this.pages = res.obj.pages;
					this.listRecord = [...this.listRecord, ...res.obj.list];
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
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {
			this.quantity = 1;			this.$refs[e].close();		}
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
