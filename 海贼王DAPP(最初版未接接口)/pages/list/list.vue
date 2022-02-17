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
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 0}" @click="changeTabsActive(0)">世界数据</view>
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 1}" @click="changeTabsActive(1)">派系数据</view>
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active' : tabActive == 2}" @click="changeTabsActive(2)">世界榜单</view>
					</view>
				</view>
				<!-- 世界数据 -->
				<view class="listData">
					<view class="listData-wrapper">
						<view class="listData-headerImage">
							<image class="listData-headerImage__listHeader" v-if="tabActive == 0" src="@/static/list/icon-worldData-headerTitle.png" mode="widthFix"></image>
							<image class="listData-headerImage__listHeader" v-if="tabActive == 1" src="@/static/list/icon-factionalData-headerTitle.png" mode="widthFix"></image>
							<image class="listData-headerImage__listHeader" v-if="tabActive == 2" src="@/static/list/icon-worldList-headerTitle.png" mode="widthFix"></image>
							<image class="listData-headerImage__listTop" src="@/static/team/icon-team-listTop.png" mode="widthFix"></image>
						</view>
						<view class="listData-listBox">
							<view class="listBox-wrapper">
								<view class="listBox__height">
									<template v-if="tabActive == 0">
										<worldData :tabActive="tabActive" @openPopup="openPopup" />
									</template>
									<!-- 派系数据 -->
									<template v-if="tabActive == 1">
										<factionalData :tabActive="tabActive" @openPopup="openPopup" />
									</template>
									<!-- 世界榜单 -->
									<template v-if="tabActive == 2">
										<worldList :tabActive="tabActive" @openPopup="openPopup"/>
									</template>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
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
import worldData from './components/worldData';
import factionalData from './components/factionalData';
import worldList from './components/worldList';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		headerBox,
		footerBox,
		menuBox,
		worldData,
		factionalData,
		worldList,
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
@import '/scss/index';
</style>
