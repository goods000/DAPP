<template>
	<!-- 集市 -->
	<view class="pages">
		<view class="main">
			<!-- 通用组件 -->
			<userInfoBox></userInfoBox>
			<menuBox :hasHolder="true" :hasShadow="true"></menuBox>
			<!-- END 通用组件 -->

			<!-- 头部信息 -->
			<headerInfoBox :tabsActive="tabsActive" :headerBg="headerBg" :titleBg="titleBg" :publishBtn="true" @changeTabsActive="changeTabsActive" @openPopup="openPopup">
				<view class="tabsBox-item tabsBox-item--style1" :class="{ 'tabsBox-item--active': tabsActive == 0 }" @click="changeTabsActive(0)">拍卖场</view>
				<view class="tabsBox-item tabsBox-item--style2" :class="{ 'tabsBox-item--active': tabsActive == 1 }" @click="changeTabsActive(1)">我的挂单</view>
				<view class="tabsBox-item tabsBox-item--style2" :class="{ 'tabsBox-item--active': tabsActive == 2 }" @click="changeTabsActive(2)">成交记录</view>
			</headerInfoBox>

			<!-- 页面主要内容 -->
			<planeBox :planeBg="planeBg" ref="planeBox">
				<!-- 拍卖场订单列表 -->
				<cardBox v-show="tabsActive == 0" @openPopup="openPopup"></cardBox>

				<!-- 我的订单 -->
				<publishOrderBox v-show="tabsActive == 1" @openPopup="openPopup"></publishOrderBox>

				<!-- 成交记录 -->
				<transactionOrderBox v-show="tabsActive == 2" @openPopup="openPopup"></transactionOrderBox>

				<!-- 卡牌购买 -->
				<buyCardPopup ref="buyCardPopup" @openPopup="openPopup" @hidePopup="hidePopup"></buyCardPopup>

				<!-- 盲盒操作 -->
				<publishCardPopup ref="publishCardPopup" @openPopup="openPopup" @hidePopup="hidePopup"></publishCardPopup>

				<!-- 成功弹窗 -->
				<!-- <successPopup ref="successPopup" @hidePopup="hidePopup"></successPopup> -->
			</planeBox>
		</view>

		<lowkeyLoading isFullScreen :active="$store.state.pageLazyLoading.market.loading" text="初次资源加载中..." v-show="$store.state.pageLazyLoading.market.loading" />
	</view>
</template>

<script>
import cardBox from './components/cardBox.vue';
import publishOrderBox from './components/publishOrderBox.vue';
import transactionOrderBox from './components/transactionOrderBox.vue';
import buyCardPopup from './components/buyCardPopup.vue';
import publishCardPopup from './components/publishCardPopup.vue';
export default {
	components: {
		cardBox,
		publishOrderBox,
		transactionOrderBox,
		buyCardPopup,
		publishCardPopup
	},
	data() {
		return {
			tabsActive: 0, //0拍卖场 1我的挂单 2成交记录
			planeBg: require('@/static/market/img-content-bg.jpg'),
			headerBg: require('@/static/market/img-header-bg.jpg'),
			titleBg: require('@/static/market/icon-title.png')
		};
	},
	onShow() {
		if (this.$store.state.pageLazyLoading.market.loading) {
			setTimeout(() => {
				this.$store.commit('changePageLazyLoading', 'market');
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
@import '/scss/market';
</style>
