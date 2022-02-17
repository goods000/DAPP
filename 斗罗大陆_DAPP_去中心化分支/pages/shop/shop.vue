<template>
	<!-- 背包 -->
	<view class="pages">
		<view class="main">
			<!-- 通用组件 -->
			<userInfoBox></userInfoBox>
			<menuBox :hasHolder="true"></menuBox>
			<!-- END 通用组件 -->

			<!-- 头部信息 -->
			<headerInfoBox :tabsActive="tabsActive" :headerBg="headerBg" :titleBg="titleBg" @changeTabsActive="changeTabsActive">
				<view class="tabsBox-item tabsBox-item--style2" :class="{ 'tabsBox-item--active': tabsActive == 1 }" @click="changeTabsActive(1)">普通盲盒</view>
				<view class="tabsBox-item tabsBox-item--style2" :class="{ 'tabsBox-item--active': tabsActive == 2 }" @click="changeTabsActive(2)">中级盲盒</view>
				<view class="tabsBox-item tabsBox-item--style2" :class="{ 'tabsBox-item--active': tabsActive == 3 }" @click="changeTabsActive(3)">高级盲盒</view>
			</headerInfoBox>

			<!-- 页面主要内容 -->
			<planeBox :planeBg="planeBg">
				<!-- 盲盒选择 -->
				<blindBox :tabsActive="tabsActive" @openPopup="openPopup"></blindBox>

				<!-- 成功购买弹窗 -->
				<successPopup ref="successPopup" @hidePopup="hidePopup"></successPopup>
			</planeBox>
		</view>

		<lowkeyLoading isFullScreen :active="$store.state.pageLazyLoading.shop.loading" text="初次资源加载中..." v-show="$store.state.pageLazyLoading.shop.loading" />
	</view>
</template>

<script>
import blindBox from './components/blindBox.vue';
import successPopup from './components/successPopup.vue';

export default {
	components: {
		blindBox,
		successPopup
	},
	data() {
		return {
			tabsActive: 1, //1普通 2中级 3高级
			planeBg: require('@/static/shop/img-content-bg.jpg'),
			headerBg: require('@/static/shop/img-header-bg.jpg'),
			titleBg: require('@/static/shop/icon-title.png')
		};
	},
	onShow() {
		if (this.$store.state.pageLazyLoading.shop.loading) {
			setTimeout(() => {
				this.$store.commit('changePageLazyLoading', 'shop');
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
@import '/scss/shop';
</style>
