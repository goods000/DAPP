<template>
	<!-- 背包 -->
	<view class="pages">
		<view class="main">
			<!-- 通用组件 -->
			<userInfoBox></userInfoBox>
			<menuBox :hasHolder="true" :hasShadow="true"></menuBox>
			<!-- END 通用组件 -->

			<!-- 头部信息 -->
			<headerInfoBox :tabsActive="tabsActive" :headerBg="headerBg" :titleBg="titleBg" @changeTabsActive="changeTabsActive">
				<view class="tabsBox-item tabsBox-item--style1" :class="{ 'tabsBox-item--active': tabsActive == 0 }" @click="changeTabsActive(0)">英雄</view>
				<view class="tabsBox-item tabsBox-item--style1" :class="{ 'tabsBox-item--active': tabsActive == 1 }" @click="changeTabsActive(1)">盲盒</view>
			</headerInfoBox>

			<!-- 页面主要内容 -->
			<planeBox :planeBg="planeBg">
				<!-- 英雄卡组 -->
				<cardBox v-show="tabsActive == 0" @openPopup="openPopup(arguments)"></cardBox>

				<!-- 盲盒 -->
				<blindBox v-show="tabsActive == 1" @openPopup="openPopup(arguments)"></blindBox>

				<!-- 卡牌操作 -->
				<cardPopup ref="cardPopup" :chooseCardInfo="chooseItemInfo" :randomValue="randomValue" @openPopup="openPopup" @hidePopup="hidePopup"></cardPopup>

				<!-- 盲盒操作 -->
				<blindPopup ref="blindPopup" :chooseBindBoxInfo="chooseItemInfo" :randomValue="randomValue" @openPopup="openPopup" @hidePopup="hidePopup"></blindPopup>

				<!-- 成功弹窗 -->
				<successPopup ref="successPopup" @hidePopup="hidePopup"></successPopup>
			</planeBox>
		</view>

		<lowkeyLoading isFullScreen :active="$store.state.pageLazyLoading.backpack.loading" text="初次资源加载中..." v-show="$store.state.pageLazyLoading.backpack.loading" />
	</view>
</template>

<script>
import cardBox from './components/cardBox.vue';
import blindBox from './components/blindBox.vue';
import cardPopup from './components/cardPopup.vue';
import blindPopup from './components/blindPopup.vue';
import successPopup from './components/successPopup.vue';
export default {
	components: {
		cardBox,
		blindBox,
		cardPopup,
		blindPopup,
		successPopup
	},
	data() {
		return {
			planeBg: require('@/static/backpack/img-content-bg.jpg'),
			headerBg: require('@/static/backpack/img-header-bg.jpg'),
			titleBg: require('@/static/backpack/icon-title.png'),

			tabsActive: 0, //0英雄 1盲盒
			chooseItemInfo: {},

			randomValue: 0 //使组件更新
		};
	},
	onShow() {
		if (this.$store.state.pageLazyLoading.backpack.loading) {
			setTimeout(() => {
				this.$store.commit('changePageLazyLoading', 'backpack');
			}, 3000);
		}
	},
	methods: {
		changeTabsActive(e) {
			if (this.tabsActive != e) {
				this.tabsActive = e;
			}
		},
		openPopup(e) {
			this.randomValue = Math.random();
			if (typeof e == 'object') {
				this.chooseItemInfo = e[1];
				this.$refs[e[0]].$refs[e[0]].open();
			} else {
				this.$refs[e].$refs[e].open();
			}
		},
		hidePopup(e) {
			this.$refs[e].$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/backpack';
</style>
