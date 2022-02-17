<template>
	<!-- 榜单 -->
	<view class="pages">
		<view class="main">
			<!-- 通用组件 -->
			<userInfoBox></userInfoBox>
			<menuBox :hasHolder="true"></menuBox>
			<!-- END 通用组件 -->

			<!-- 头部信息 -->
			<headerInfoBox :tabsActive="tabsActive" :headerBg="headerBg" :titleBg="titleBg" @changeTabsActive="changeTabsActive">
				<view class="tabsBox-item tabsBox-item--style2" :class="{ 'tabsBox-item--active': tabsActive == 0 }" @click="changeTabsActive(0)">斗罗数据</view>
				<view class="tabsBox-item tabsBox-item--style2" :class="{ 'tabsBox-item--active': tabsActive == 1 }" @click="changeTabsActive(1)">宗门数据</view>
				<view class="tabsBox-item tabsBox-item--style2" :class="{ 'tabsBox-item--active': tabsActive == 2 }" @click="changeTabsActive(2)">斗罗榜单</view>
			</headerInfoBox>

			<!-- 页面主要内容 -->
			<planeBox :planeBg="planeBg">
				<!-- 斗罗数据 -->
				<personalDataBox v-show="tabsActive == 0"></personalDataBox>

				<!-- 宗门数据 -->
				<teamDataBox v-show="tabsActive == 1"></teamDataBox>

				<!-- 斗罗排行 -->
				<rankingBox v-show="tabsActive == 2" @openPopup="openPopup"></rankingBox>

				<!-- 数据筛选 -->
				<filterPopup ref="filterPopup" @hidePopup="hidePopup"></filterPopup>
			</planeBox>
		</view>

		<lowkeyLoading isFullScreen :active="$store.state.pageLazyLoading.ranking.loading" text="初次资源加载中..." v-show="$store.state.pageLazyLoading.ranking.loading" />
	</view>
</template>

<script>
import personalDataBox from './components/personalDataBox.vue';
import teamDataBox from './components/teamDataBox.vue';
import rankingBox from './components/rankingBox.vue';
import filterPopup from './components/filterPopup.vue';
export default {
	components: {
		personalDataBox,
		teamDataBox,
		rankingBox,
		filterPopup
	},
	data() {
		return {
			tabsActive: 0, //0斗罗数据 1宗门数据 2斗罗榜单
			planeBg: require('@/static/ranking/img-content-bg.jpg'),
			headerBg: require('@/static/ranking/img-header-bg.jpg'),
			titleBg: require('@/static/ranking/icon-title.png')
		};
	},
	onShow() {
		if (this.$store.state.pageLazyLoading.ranking.loading) {
			setTimeout(() => {
				this.$store.commit('changePageLazyLoading', 'ranking');
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
@import '/scss/ranking';
</style>