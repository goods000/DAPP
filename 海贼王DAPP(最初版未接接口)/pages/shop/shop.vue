<template>
	<view class="pages">
		<scroll-view scroll-y="true" class="scroll-height">
		<view class="main">
			<bgBox />
			<headerBox @openPopup="openPopup"/>
			<footerBox />
			<menuBox ref="menuPopup" />
			
			<!-- 头部切换 -->
			<view class="headerTop">
				<view class="initTabs" style="visibility: hidden;">
					<view class="initTabs-control">
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 0}" @click="changeTabsActive(0)">交易市场</view>
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 1}" @click="changeTabsActive(1)">我的挂卖</view>
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 2}" @click="changeTabsActive(2)">交易记录</view>
					</view>
				</view>
				<view class="initListBox-bg">
					<shopMarket :boxList="boxList" :tabActive="tabActive" @openPopup="openPopup" />
				</view>
			</view>
			
			<!-- 购买成功 -->
			<openShopBuySuccess ref="openShopBuySuccess" />
			
			<!-- <ourLoading isFullScreen :active="loadingShow" background-color="rgba(255,255,255,1)" text="资源加载中..." /> -->
			<!-- <lowkeyLoading isFullScreen :active="loadingShow" background-color="rgba(255,255,255,1)" text="资源加载中..." /> -->
		</view>
		</scroll-view>
	</view>
</template>

<script>
import bgBox from './components/bgBox';
import headerBox from './components/headerBox';
import footerBox from '@/pages/common/footerBox';
import menuBox from '@/pages/common/menuBox.vue';
import shopMarket from './components/shopMarket.vue';
import openShopBuySuccess from './components/openShopBuySuccess.vue';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		headerBox,
		footerBox,
		menuBox,
		shopMarket,
		openShopBuySuccess,
		lowkeyLoading
	},
	data() {
		return {
			// userWalletAddress: '---',
			loadingShow: true,
			tabActive: 0,
			boxList:[
				{boxImage:'@/static/shop/icon-goods-01.png'},
				{boxImage:'@/static/shop/icon-goods-02.png'},
				{boxImage:'@/static/shop/icon-goods-03.png'},
			]
		};
	},
	onShow() {
		console.log("boxList：",this.boxList);
		console.log("tabActive：",this.tabActive);
		setTimeout(()=>{
			this.loadingShow = false;
		}, 3000)
	},
	methods: {
		init(){
			this.tabActive == 0
			this.changeTabsActive(0);
		},
		changeTabsActive(index){
			if (this.tabActive != index) {
				this.tabActive = index;
			}
		},
		openPopup(e) {
			console.log("e：",e);
			console.log(this.$refs[e].$refs);
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'scss/index';
</style>
