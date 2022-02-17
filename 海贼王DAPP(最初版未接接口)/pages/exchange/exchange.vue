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
				<view class="initTabs">
					<view class="initTabs-control">
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 0}" @click="changeTabsActive(0)">交易市场</view>
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 1}" @click="changeTabsActive(1)">我的挂卖</view>
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 2}" @click="changeTabsActive(2)">交易记录</view>
					</view>
				</view>
				<view class="initListBox-bg">
					<!-- 交易市场、我的挂卖 -->
					<template v-if="tabActive == 0 || tabActive == 1">
						<exchangeMarket :tabActive="tabActive" @openPopup="openPopup" />
					</template>
					<template v-else>
						<!-- 交易记录 -->
						<exchangeRecord />
					</template>
				</view>
			</view>
			<!-- 挂卖英雄 -->
			<openSellingHeroes ref="openSellingHeroes" @openPopup="openPopup"/>
			<!-- 选择挂卖英雄 -->
			<openPopupSelectHero ref="openPopupSelectHero"  @openPopup="openPopup"/>
			<!-- 挂卖成功 -->
			<openSellingSuccess ref="openSellingSuccess"/>
			
			<!-- 购买英雄 -->
			<openbuyHero ref="openbuyHero"  @openPopup="openPopup"/>
			<!-- 购买英雄成功 -->
			<openBuySuccess ref="openBuySuccess"/>
			
			
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
import exchangeMarket from './components/exchangeMarket.vue';
import exchangeRecord from './components/exchangeRecord.vue';
import openSellingHeroes from './components/openSellingHeroes.vue';
import openPopupSelectHero from './components/openPopupSelectHero.vue';
import openSellingSuccess from './components/openSellingSuccess.vue';
import openbuyHero from './components/openbuyHero.vue';
import openBuySuccess from './components/openBuySuccess.vue';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		headerBox,
		footerBox,
		menuBox,
		exchangeMarket,
		exchangeRecord,
		openSellingHeroes,
		openPopupSelectHero,
		openSellingSuccess,
		openbuyHero,
		openBuySuccess,
		lowkeyLoading
	},
	data() {
		return {
			// userWalletAddress: '---',
			loadingShow: true,
			tabActive: 0,
		};
	},
	onShow() {
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
@import '/scss/exchange';
</style>
