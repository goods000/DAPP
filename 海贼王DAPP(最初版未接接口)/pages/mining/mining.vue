<template>
	<view class="pages">
		<scroll-view scroll-y="true" class="scroll-height">
		<view class="main">
			<bgBox />
			<headerBox @openPopup="openPopup"/>
			<footerBox />
			<menuBox ref="menuPopup" />
			
			<cardSlot @openPopup="openPopup" />
			
			<!-- 卡槽详情 -->
			<openCardSlotDetail ref="openCardSlotDetail" @openPopup="openPopup"/>
			<!-- 记录 -->
			<openReceivingRecord ref="openReceivingRecord"/>
			<!-- 装备英雄、替换英雄 -->
			<openHero ref="openHero" />
			<!-- 卡槽升级 -->
			<openCardSlotUpgrade ref="openCardSlotUpgrade" />
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
import cardSlot from './components/cardSlot';
import openCardSlotDetail from './components/openCardSlotDetail';
import openReceivingRecord from './components/openReceivingRecord';
import openHero from './components/openHero';
import openCardSlotUpgrade from './components/openCardSlotUpgrade';


import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		headerBox,
		footerBox,
		menuBox,
		cardSlot,
		openCardSlotDetail,
		openReceivingRecord,
		openHero,
		openCardSlotUpgrade,
		lowkeyLoading
	},
	data() {
		return {
			// userWalletAddress: '---',
			loadingShow: true,
		};
	},
	onShow() {
		setTimeout(()=>{
			this.loadingShow = false;
		}, 3000)
	},
	methods: {
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
@import '/scss/mining';
</style>
