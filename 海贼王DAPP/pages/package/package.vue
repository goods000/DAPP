<template>
	<view class="pages">
		<scroll-view scroll-y="true" class="scroll-height">
		<view class="main">
			<bgBox />
			<headerBox @openPopup="openPopup"/>
			<footerBox />
			<menuBox ref="menuPopup" />
			
			<!-- <myPackage :tabActive="tabActive" :randomValue="randomValue" @openPopup="openPopup"/> -->
			<myPackage :randomValue="randomValue" @openPopup="openPopup"/>
			<!-- 卡片详情 -->
			<openPopupDetail ref="openPopupDetail" :cardDetails="cardDetails" @refreshData="refreshData" @openPopup="openPopup"/>
			<!-- 卡片海贼赠送 -->
			<openTransferHero ref="openTransferHero" :heroDetails="heroDetails" @refreshData="refreshData" @openPopup="openPopup" />
			<!-- 卡片海贼赠送 -->
			<openTransferHeroSuccess ref="openTransferHeroSuccess" :heroDetails="heroDetails"/>
			
			<!-- 打开盲盒 -->
			<openPopupBox ref="openPopupBox" :boxDetails="boxDetails" @refreshData="refreshData" @removeBoxById="removeBoxById" @openPopup="openPopup" />
			<!-- 打开盲盒获取的卡片 -->
			<openPopupBoxDetail ref="openPopupBoxDetail" :boxInfo="boxInfo" @refreshData="refreshData"/>
			
			<!-- 转赠盲盒 -->
			<openTransferBox ref="openTransferBox":boxDetails="boxDetails" @removeBoxById="removeBoxById" @openPopup="openPopup" />
			<!-- 转赠盲盒成功 -->
			<openTransferBoxSuccess ref="openTransferBoxSuccess" @openPopup="openPopup" />
			
			<!-- 销毁成功 -->
			<openDestroySuccess ref="openDestroySuccess" @refreshData="refreshData" :cardDetails="cardDetails"/>
			
		</view>
		
		<lowkeyLoading isFullScreen :active="$store.state.pageLazyLoading.backpack.loading" text="初次资源加载中..." v-show="$store.state.pageLazyLoading.backpack.loading" />
		</scroll-view>
	</view>
</template>

<script>
import myPackage from './components/myPackage';
import bgBox from './components/bgBox';
import headerBox from './components/headerBox';
import footerBox from '@/pages/common/footerBox';
import menuBox from '@/pages/common/menuBox.vue';
import openPopupDetail from './components/openPopupDetail.vue';
import openPopupBox from './components/openPopupBox.vue';
import openPopupBoxDetail from './components/openPopupBoxDetail.vue';
import openTransferBox from './components/openTransferBox.vue';
import openTransferBoxSuccess from './components/openTransferBoxSuccess.vue';
import openTransferHero from './components/openTransferHero.vue';
import openTransferHeroSuccess from './components/openTransferHeroSuccess.vue';
import openDestroySuccess from './components/openDestroySuccess.vue';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		myPackage,
		bgBox,
		headerBox,
		footerBox,
		menuBox,
		openPopupDetail,
		openPopupBox,
		openPopupBoxDetail,
		openTransferBox,
		openTransferBoxSuccess,
		openTransferHero,
		openTransferHeroSuccess,
		openDestroySuccess,
		lowkeyLoading
	},
	data() {
		return {
			// userWalletAddress: '---',
			loadingShow: true,
			boxDetails:{},
			boxInfo:{},
			cardDetails:{},
			heroDetails:{},
			randomValue:0,
			tabActive:0,
		};
	},
	onShow() {
		this.$nextTick(()=>{
			if (this.$store.state.pageLazyLoading.backpack.loading) {
				this.$store.commit('changePageLazyLoading', 'backpack');
			}
		})
	},
	methods: {
		refreshData() {
			this.randomValue = Math.random();
		},
		openPopup(e,item) {
			// console.log("e",e,item);
			if (item != undefined) {
				if(e == 'openPopupBox'){
					this.boxDetails = item;
				    console.log("eeee",this.boxDetails);
				}else if(e == 'openPopupDetail' || e == 'openDestroySuccess'){
					this.cardDetails = item;
					console.log("eeee",this.cardDetails);
				}else if(e == 'openTransferHero' || e == 'openTransferHeroSuccess' || e == 'openTransferBoxSuccess'){
					this.heroDetails = item;
					console.log("eeee",this.heroDetails);
				}
				this.$refs[e].$refs[e].open();
			} else {
				this.$refs[e].$refs[e].open();
			}
			// if (item != undefined) {
				// this.boxDetails = item;
				// this.cardDetails = item;
				// this.heroDetails = item;
				// this.$forceUpdate();
				// this.$refs[e].$refs[e].open();
				// console.log("index----this.boxDetails：",this.boxDetails);
		},
		// openPopup(e) {
		// 	if (typeof e == 'object') {
		// 		this.boxDetails = e[1];
		// 		this.$refs[e[0]].$refs[e[0]].open();
		// 	} else {
		// 		this.$refs[e].$refs[e].open();
		// 	}
		// },
		// openPopup(e,item) {
		// 	if (item != undefined) {
		// 		this.boxDetails = item;
		// 		// this.$forceUpdate();
		// 		this.$refs[e].$refs[e].open();
		// 	} else {
		// 		this.$refs[e].$refs[e].open();
		// 	}
		// },
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/package';
</style>
