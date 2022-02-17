<template>
	<view class="pages">
		<scroll-view scroll-y="true" class="scroll-height">
		<view class="main">
			<bgBox />
			<headerBox @openPopup="openPopup"/>
			<footerBox />
			<menuBox ref="menuPopup" />
			
			<!-- 我的英雄 -->
			<myHero @openPopup="openPopup" />
			<!-- 失败记录 -->
			<openfailureRecord ref="openfailureRecord"/>
			<!-- 合成详情 -->
			<openCompositeDetail ref="openCompositeDetail" @openPopup="openPopup" />
			<!-- 合成成功 -->
			<openResult ref="openResult" />
			
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
import myHero from './components/myHero.vue';
import openfailureRecord from './components/openfailureRecord.vue';
import openCompositeDetail from './components/openCompositeDetail.vue';
import openResult from './components/openResult.vue';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		headerBox,
		footerBox,
		menuBox,
		myHero,
		openfailureRecord,
		openCompositeDetail,
		openResult,
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
@import '/scss/index';
</style>
