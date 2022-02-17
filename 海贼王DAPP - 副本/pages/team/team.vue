<template>
	<view class="pages">
	<scroll-view scroll-y="true" >
		<view class="main">
			<bgBox />
			<headerBox @openPopup="openPopup"/>
			<footerBox />
			<menuBox ref="menuPopup" />
			
			<!--  -->
			<view class="team">
				<information :randomValue="randomValue" @openPopup="openPopup"/>
				<!-- 派系成员排行榜 -->
				<teamList :randomValue="randomValue" />
			</view>
			
			<!-- 签到 -->
			<openSignIn ref="openSignIn" />
			<!-- 派系活跃说明 -->
			<openActiveExplain ref="openActiveExplain"/>
			<!--  -->
			<openJobExplain ref="openJobExplain"/>
			
			
			<!-- 派系奖励说明 -->
			<openRewardExplain ref="openRewardExplain" />
			<!-- 加成地址 -->
			<openAdditionAddress ref="openAdditionAddress" />
			
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
import openAdditionAddress from './components/openAdditionAddress';

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
		openAdditionAddress,
		lowkeyLoading
	},
	data() {
		return {
			// userWalletAddress: '---',
			randomValue: 0,
		};
	},
	onShow() {
		setTimeout(()=>{
			this.loadingShow = false;
		}, 3000)
	},
	methods: {
		refreshData() {
			this.randomValue = Math.random();
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
@import '/scss/index';
</style>
