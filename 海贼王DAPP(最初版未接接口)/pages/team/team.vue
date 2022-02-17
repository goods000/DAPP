<template>
	<view class="pages">
		<scroll-view scroll-y="true" style="scroll-height">
		<view class="main">
			<bgBox />
			<headerBox @openPopup="openPopup"/>
			<footerBox />
			<menuBox ref="menuPopup" />
			
			<!--  -->
			<view class="team">
				<information @openPopup="openPopup"/>
				<!-- 派系成员排行榜 -->
				<teamList />
			</view>
			
			<!-- 签到 -->
			<openSignIn ref="openSignIn" />
			<!-- 派系活跃说明 -->
			<openActiveExplain ref="openActiveExplain"/>
			<!--  -->
			<openJobExplain ref="openJobExplain"/>
			<!-- 派系奖励说明 -->
			<openRewardExplain ref="openRewardExplain" />
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
import information from './components/information';
import teamList from './components/teamList';
import openSignIn from './components/openSignIn';
import openActiveExplain from './components/openActiveExplain';
import openJobExplain from './components/openJobExplain';
import openRewardExplain from './components/openRewardExplain';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		headerBox,
		footerBox,
		menuBox,
		information,
		teamList,
		openSignIn,
		openActiveExplain,
		openJobExplain,
		openRewardExplain,
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
