<template>
	<!-- 锻造 -->
	<view class="pages">
		<view class="main">
			<!-- 通用组件 -->
			<userInfoBox></userInfoBox>
			<menuBox :hasHolder="true" :hasShadow="true"></menuBox>
			<!-- END 通用组件 -->

			<!-- 头部信息 -->
			<headerInfoBox :tabsActive="tabsActive" :headerBg="headerBg" :titleBg="titleBg" @changeTabsActive="changeTabsActive">
				<view class="tabsBox-item tabsBox-item--style1" :class="{ 'tabsBox-item--active': tabsActive == 0 }" @click="changeTabsActive(0)">已解锁</view>
				<view class="tabsBox-item tabsBox-item--style1" :class="{ 'tabsBox-item--active': tabsActive == 1 }" @click="changeTabsActive(1)">未解锁</view>
				<view class="tabsBox-item tabsBox-item--style2" :class="{ 'tabsBox-item--active': tabsActive == 2 }" @click="changeTabsActive(2)">挖矿产出</view>
			</headerInfoBox>

			<!-- 页面主要内容 -->
			<planeBox :planeBg="planeBg">
				<!-- 卡槽信息 -->
				<cardBox v-show="tabsActive == 0 || tabsActive == 1" @changeCardSlotStatus="changeCardSlotStatus" @openPopup="openPopup"></cardBox>

				<!-- 挖矿产出 -->
				<rewardBox v-show="tabsActive == 2"></rewardBox>

				<!-- 卡槽信息 -->
				<cardSlotPopup
					ref="cardSlotPopup"
					:cardSlotStatus="cardSlotStatus"
					@changeCardChooseStatus="changeCardChooseStatus"
					@openPopup="openPopup"
					@hidePopup="hidePopup"
				></cardSlotPopup>

				<!-- 卡牌操作 -->
				<cardChoosePopup ref="cardChoosePopup" :cardChooseStatus="cardChooseStatus" @openPopup="openPopup" @hidePopup="hidePopup"></cardChoosePopup>

				<!-- 成功弹窗 -->
				<successPopup ref="successPopup" @hidePopup="hidePopup"></successPopup>
			</planeBox>
		</view>

		<lowkeyLoading isFullScreen :active="$store.state.pageLazyLoading.mining.loading" text="初次资源加载中..." v-show="$store.state.pageLazyLoading.mining.loading" />
	</view>
</template>

<script>
import cardBox from './components/cardBox.vue';
import rewardBox from './components/rewardBox.vue';
import cardChoosePopup from './components/cardChoosePopup.vue';
import cardSlotPopup from './components/cardSlotPopup.vue';
import successPopup from './components/successPopup.vue';

export default {
	components: {
		cardBox,
		rewardBox,
		cardChoosePopup,
		cardSlotPopup,
		successPopup
	},
	data() {
		return {
			tabsActive: 0, //0已解锁 1未解锁 2挖矿产出
			planeBg: require('@/static/mining/img-content-bg.jpg'),
			headerBg: require('@/static/mining/img-header-bg.jpg'),
			titleBg: require('@/static/mining/icon-title.png'),

			cardSlotStatus: 0, //0可装备 1已装备
			cardChooseStatus: 0 //0英雄装备 1英雄替换 2英雄升级
		};
	},
	onShow() {
		if (this.$store.state.pageLazyLoading.mining.loading) {
			setTimeout(() => {
				this.$store.commit('changePageLazyLoading', 'mining');
			}, 3000);
		}
	},
	methods: {
		changeCardSlotStatus(type) {
			this.cardSlotStatus = type;
		},
		changeCardChooseStatus(type) {
			this.cardChooseStatus = type;
		},
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
@import '/scss/mining';
</style>
