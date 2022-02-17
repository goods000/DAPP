<template>
	<!-- 收益产出 -->
	<view class="rewardBox">
		<scroll-view scroll-y="true" class="rewardBox-wrapper">
			<view class="rewardBox-plane">
				<view class="rewardBox-dataBox dataBox">
					<view class="dataBox-wrapper">
						<view class="dataBox-row">
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-1"></i>
								<text>可领取矿量: 22.37</text>
							</view>
							<view class="dataBox-btn">领取</view>
						</view>

						<view class="dataBox-row">
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-2"></i>
								<text>
									我的APY:
									<br />
									694506.17%
								</text>
							</view>
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-1"></i>
								<text>
									预估24H产矿量:
									<br />
									694506.17%
								</text>
							</view>
						</view>
					</view>
				</view>
				<view class="rewardBox-tableBox tableBox">
					<view class="tableBox-theader">
						<view class="tableBox-tr">
							<view class="tableBox-th">日期</view>
							<view class="tableBox-th">产矿量</view>
						</view>
					</view>
					<scroll-view scroll-y="true" class="tableBox-tbody">
						<view class="tableBox-tr" v-for="(item, index) in 20" :key="index">
							<view class="tableBox-td">11.03</view>
							<view class="tableBox-td">1200</view>
						</view>
					</scroll-view>
				</view>
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
@import '/scss/rewardBox';
</style>
