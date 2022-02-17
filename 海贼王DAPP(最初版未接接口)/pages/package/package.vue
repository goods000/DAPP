<template>
	<view class="pages">
		<scroll-view scroll-y="true" class="scroll-height">
		<view class="main">
			<bgBox />
			<headerBox @openPopup="openPopup"/>
			<footerBox />
			<menuBox ref="menuPopup" />
			
			<myPackage @openPopup="openPopup" />
			<!-- 卡片详情 -->
			<openPopupDetail ref="openPopupDetail" @openPopup="openPopup"/>
			<!-- 卡片英雄赠送 -->
			<openTransferHero ref="openTransferHero" @openPopup="openPopup" />
			<!-- 卡片英雄赠送 -->
			<openTransferHeroSuccess ref="openTransferHeroSuccess" />

			
			<!-- 打开盲盒 -->
			<openPopupBox ref="openPopupBox" @openPopup="openPopup" />
			<!-- 打开盲盒获取的卡片 -->
			<openPopupBoxDetail ref="openPopupBoxDetail" />
			
			<!-- 转赠盲盒 -->
			<openTransferBox ref="openTransferBox" @openPopup="openPopup" />
			<!-- 转赠盲盒成功 -->
			<openTransferBoxSuccess ref="openTransferBoxSuccess" @openPopup="openPopup" />
			<!-- <ourLoading isFullScreen :active="loadingShow" background-color="rgba(255,255,255,1)" text="资源加载中..." /> -->
			<!-- <lowkeyLoading isFullScreen :active="loadingShow" background-color="rgba(255,255,255,1)" text="资源加载中..." /> -->
		</view>
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
			console.log(e)
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/package';
</style>
