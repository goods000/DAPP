<template>
	<!-- 排行 -->
	<view class="containerBox">
		<scroll-view scroll-y="true" class="containerBox-wrapper">
			<view class="containerBox-plane">
				<view class="containerBox-tabsBox initTabs">
					<view class="initTabs-wrapper">
						<view class="initTabs-item" :class="{ 'initTabs-item--active': tabsActive == 0 }" @click="changeTabsActive(0)">玩家榜</view>
						<view class="initTabs-item" :class="{ 'initTabs-item--active': tabsActive == 1 }" @click="changeTabsActive(1)">宗门榜</view>
					</view>
				</view>
				<template v-if="tabsActive == 0">
					<view class="containerBox-tableBox tableBox">
						<view class="tableBox-theader">
							<view class="tableBox-tr">
								<view class="tableBox-th tableBox-th--ranking">排名</view>
								<view class="tableBox-th tableBox-th--flex3">地址</view>
								<view class="tableBox-th tableBox-th--flex2 tableBox-th--arrow" @click="openPopup('filterPopup')">按算力排行</view>
							</view>
						</view>
						<scroll-view scroll-y="true" class="tableBox-tbody">
							<view class="tableBox-tr" v-for="(item, index) in 20" :key="index">
								<view class="tableBox-td" :class="[`tableBox-td--pic${index + 1}`, 'tableBox-td--ranking']">{{ index + 1 }}</view>
								<view class="tableBox-td tableBox-td--flex3">0x9****40f</view>
								<view class="tableBox-td tableBox-td--flex2">1200</view>
							</view>
						</scroll-view>
					</view>
				</template>
				<template v-if="tabsActive == 1">
					<view class="containerBox-tableBox tableBox">
						<view class="tableBox-theader">
							<view class="tableBox-tr">
								<view class="tableBox-th tableBox-th--ranking">排名</view>
								<view class="tableBox-th">宗门名称</view>
								<view class="tableBox-th">算力</view>
								<view class="tableBox-th">TVL($)</view>
							</view>
						</view>
						<scroll-view scroll-y="true" class="tableBox-tbody">
							<view class="tableBox-tr" v-for="(item, index) in 20" :key="index">
								<view class="tableBox-td" :class="[`tableBox-td--pic${index + 1}`, 'tableBox-td--ranking']">{{ index + 1 }}</view>
								<view class="tableBox-td">武神殿</view>
								<view class="tableBox-td">864654</view>
								<view class="tableBox-td">9871</view>
							</view>
						</scroll-view>
					</view>
				</template>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsActive: 0
		};
	},
	methods: {
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
			}
		},
		openPopup(e) {
			this.$emit('openPopup', e);
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/rankingBox';
</style>
