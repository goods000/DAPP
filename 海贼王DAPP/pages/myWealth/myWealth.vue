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
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 0}" @click="changeTabsActive(0)">财富一览</view>
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 1}" @click="changeTabsActive(1)">提币记录</view>
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 2}" @click="changeTabsActive(2)">释放记录</view>
					</view>
				</view>
				<view class="myWealth-bg">
					<!-- 财富一览 -->
					<template v-if="tabActive == 0">
						<wealthList :tabActive="tabActive" @openPopup="openPopup" />
					</template>
					<template v-if="tabActive == 1">
						<!-- 提币记录、释放记录 -->
						<myWealthRecord :tabActive="tabActive"/>
					</template>
					<template v-if="tabActive == 2">
						<!-- 提币记录、释放记录 -->
						<myReleaseRecord :tabActive="tabActive"/>
					</template>
				</view>
			</view>
			
			<!-- 提币 -->
			<openWithdraw ref="openWithdraw" 
				:balanceInfo="balanceInfo"
				@openPopup="openPopup" />
			<!-- 提币成功 -->
			<openSuccess ref="openSuccess"/>
			
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
import wealthList from './components/wealthList.vue';
import myWealthRecord from './components/myWealthRecord.vue';
import myReleaseRecord from './components/myReleaseRecord.vue';
import openWithdraw from './components/openWithdraw.vue';
import openSuccess from './components/openSuccess.vue';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		headerBox,
		footerBox,
		menuBox,
		wealthList,
		myWealthRecord,
		myReleaseRecord,
		openWithdraw,
		openSuccess,
		lowkeyLoading,
	},
	data() {
		return {
			// userWalletAddress: '---',
			loadingShow: true,
			tabActive: 0,
			balanceInfo:{},
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
		openPopup(e,item) {
			console.log("e：",e,item);
			this.balanceInfo = item;
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/myWealth';
</style>
