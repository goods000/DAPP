<template>
	<view class="pages">
		<view class="main">
			<!-- 通用组件 -->
			<userInfoBox></userInfoBox>
			<menuBox :hasHolder="true"></menuBox>
			<!-- END 通用组件 -->

			<!-- 头部信息 -->
			<headerInfoBox :tabsActive="tabsActive" :headerBg="headerBg" :titleBg="titleBg" @changeTabsActive="changeTabsActive">
				<view class="tabsBox-item tabsBox-item--style1" :class="{ 'tabsBox-item--active': tabsActive == 0 }" @click="changeTabsActive(0)">宗门</view>
				<view class="tabsBox-item tabsBox-item--style1" :class="{ 'tabsBox-item--active': tabsActive == 1 }" @click="changeTabsActive(1)">签到</view>
				<view class="tabsBox-item tabsBox-item--style1" :class="{ 'tabsBox-item--active': tabsActive == 2 }" @click="changeTabsActive(2)">排行</view>
			</headerInfoBox>

			<!-- 页面主要内容 -->
			<planeBox :planeBg="planeBg">
				<!-- 宗门 -->
				<teamBox v-show="tabsActive == 0" @openPopup="openPopup"></teamBox>

				<!-- 签到 -->
				<signInBox v-show="tabsActive == 1" @openPopup="openPopup"></signInBox>

				<!-- 排行 -->
				<rankingBox v-show="tabsActive == 2"></rankingBox>

				<!-- 宗门职位说明 -->
				<positionPopup ref="positionPopup" @hidePopup="hidePopup"></positionPopup>

				<!-- 宗门奖励说明 -->
				<rewardPopup ref="rewardPopup" @hidePopup="hidePopup"></rewardPopup>

				<!-- 活跃度说明 -->
				<activityPopup ref="activityPopup" @hidePopup="hidePopup"></activityPopup>

				<!-- 签到说明 -->
				<signInPopup ref="signInPopup" @hidePopup="hidePopup"></signInPopup>
				
				<!-- 宗门选择 -->
				<choosePopup ref="choosePopup" @openPopup="openPopup" @hidePopup="hidePopup"></choosePopup>
				
				<!-- 加入宗门成功 -->
				<successPopup ref="successPopup" @hidePopup="hidePopup"></successPopup>
			</planeBox>
		</view>

		<lowkeyLoading isFullScreen :active="$store.state.pageLazyLoading.faction.loading" text="初次资源加载中..." v-show="$store.state.pageLazyLoading.faction.loading" />
	</view>
</template>

<script>
import teamBox from './components/teamBox.vue';
import signInBox from './components/signInBox.vue';
import rankingBox from './components/rankingBox.vue';
import positionPopup from './components/positionPopup.vue';
import rewardPopup from './components/rewardPopup.vue';
import activityPopup from './components/activityPopup.vue';
import signInPopup from './components/signInPopup.vue';
import choosePopup from './components/choosePopup.vue';
import successPopup from './components/successPopup.vue';
export default {
	components: {
		teamBox,
		signInBox,
		rankingBox,
		positionPopup,
		rewardPopup,
		activityPopup,
		signInPopup,
		choosePopup,
		successPopup
	},
	data() {
		return {
			tabsActive: 0, //0宗门 1签到 2排行
			planeBg: require('@/static/faction/img-content-bg.jpg'),
			headerBg: require('@/static/faction/img-header-bg.jpg'),
			titleBg: require('@/static/faction/icon-title.png')
		};
	},
	onShow() {
		if (this.$store.state.pageLazyLoading.faction.loading) {
			setTimeout(() => {
				this.$store.commit('changePageLazyLoading', 'faction');
			}, 3000);
		}
	},
	methods: {
		changeTabsActive(e) {
			this.tabsActive = e;
		},
		openPopup(e) {
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/faction';
</style>
