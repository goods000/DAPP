<template>
	<view class="initListBox-market">
		<!-- <view class="initListBox-header">
			<image :src="require(`@/static/exchange/icon-exchangeTab-03-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
		</view> -->
		<view class="initListBox-wrapper">
			<view class="exchangeRecord-initTabs">
				<view class="exchangeRecord-initTabs-records">
					<view class="exchangeRecord-initTabs-records__item" :class="{'exchangeRecord-initTabs-records__item--active' : typeActive == 0}" @click="changeTypeActive(0)">{{ i18n.exchange.tabTitle01 }}</view>
					<view class="exchangeRecord-initTabs-records__item" :class="{'exchangeRecord-initTabs-records__item--active' : typeActive == 1}" @click="changeTypeActive(1)">{{ i18n.exchange.tabTitle02 }}</view>
				</view>
			</view>
			<view class="initNoData" v-if="recordList.length == 0">{{ i18n.global.noData }}</view>
			<scroll-view class="exchangeRecord-height" :scroll-y="true" :show-scrollbar="false" @scrolltolower="scrolltolower">
				<view class="exchangeRecord-item" v-for="(item,index) in recordList" :key="index">
					<view class="exchangeRecord-item__box">
						<view class="exchangeRecord-item__content">{{ i18n.exchange.list01 }}：{{ item.role }}</view>
						<view class="exchangeRecord-item__content">{{ i18n.exchange.list02 }}：{{ item.color }}</view>
					</view>
					<view class="exchangeRecord-item__content">{{ i18n.exchange.list05 }}({{ $store.state.platmentCurrencyName }})：{{ item.price }}</view>
					<view class="exchangeRecord-item__content">
						{{ i18n.exchange.list06 }}：{{ item.hash.substring(0, 12) + "****" + item.hash.substring(item.hash.length - 12)  }}
						<image class="exchangeRecord-item__content-copy" src="@/static/public/icon-public-copy.png" mode="" @click="$tools.copy(item.hash)"></image>
					</view>
					<view class="exchangeRecord-item__content">{{ i18n.exchange.list04 }}：{{ item.createTime }}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	// 接受父组件的值
	data() {
		return {
			typeActive: 0,
			recordList:[],
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
			this.typeActive == 0
			this.pageNum = 1;
			this.recordList = [];
			this.getRecordList();
		},
		getRecordList() {
			this.$Ajax('/front/poker/trade/list',{
					address: this.$store.state.userWalletAddress,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					type: this.typeActive
				},
				res => {
					this.pages = res.obj.pages;
					this.recordList = [...this.recordList, ...res.obj.list];
				}
			);
		},
		changeTypeActive(index){
			if (this.typeActive != index) {
				this.typeActive = index;
				this.init();
			}
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
@import '/scss/exchangeRecord';
</style>