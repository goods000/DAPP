<template>
	<!-- 合成 -->
	<view class="pages">
		<view class="main">
			<!-- 通用组件 -->
			<userInfoBox></userInfoBox>
			<menuBox :hasHolder="true" :hasShadow="true"></menuBox>
			<!-- END 通用组件 -->

			<!-- 头部信息 -->
			<headerInfoBox :tabsActive="tabsActive" :headerBg="headerBg" :titleBg="titleBg" @changeTabsActive="changeTabsActive">
				<view class="tabsBox-item tabsBox-item--style1" :class="{ 'tabsBox-item--active': tabsActive == 0 }" @click="changeTabsActive(0)">英雄</view>
				<view class="tabsBox-item tabsBox-item--style2" :class="{ 'tabsBox-item--active': tabsActive == 1 }" @click="changeTabsActive(1)">失败记录</view>
			</headerInfoBox>

			<!-- 页面主要内容 -->
			<planeBox :planeBg="planeBg">
				<!-- 可合成卡组 -->
				<cardBox v-show="tabsActive == 0" @openPopup="openPopup"></cardBox>

				<!-- 失败记录 -->
				<recordBox v-show="tabsActive == 1"></recordBox>

				<!-- 卡牌操作 -->
				<syntheticCardPopup ref="syntheticCardPopup" @openPopup="openPopup" @hidePopup="hidePopup"></syntheticCardPopup>

				<!-- 成功弹窗 -->
				<successPopup ref="successPopup" @openPopup="openPopup" @hidePopup="hidePopup"></successPopup>

				<!-- 失败弹窗 -->
				<failPopup ref="failPopup" @hidePopup="hidePopup"></failPopup>
			</planeBox>
		</view>

		<lowkeyLoading isFullScreen :active="$store.state.pageLazyLoading.synthesis.loading" text="初次资源加载中..." v-show="$store.state.pageLazyLoading.synthesis.loading" />
	</view>
</template>

<script>
import cardBox from './components/cardBox.vue';
import recordBox from './components/recordBox.vue';
import syntheticCardPopup from './components/syntheticCardPopup.vue';
import successPopup from './components/successPopup.vue';
import failPopup from './components/failPopup.vue';
export default {
	components: {
		cardBox,
		recordBox,
		syntheticCardPopup,
		successPopup,
		failPopup
	},
	data() {
		return {
			tabsActive: 0, //0英雄 1失败记录
			planeBg: require('@/static/synthesis/img-content-bg.jpg'),
			headerBg: require('@/static/synthesis/img-header-bg.jpg'),
			titleBg: require('@/static/synthesis/icon-title.png')
		};
	},
	onShow() {
		if (this.$store.state.pageLazyLoading.synthesis.loading) {
			setTimeout(() => {
				this.$store.commit('changePageLazyLoading', 'synthesis');
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
@import '/scss/synthesis';
</style>
