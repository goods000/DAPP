<template>
	<!-- 斗罗数据 -->
	<view class="containerBox">
		<scroll-view scroll-y="true" class="containerBox-wrapper">
			<view class="containerBox-plane">
				<view class="containerBox-dataBox dataBox">
					<view class="dataBox-wrapper">
						<view class="dataBox-row">
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-1"></i>
								<text>总算力: 95400</text>
							</view>
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-2"></i>
								<text>英雄数量: 279</text>
							</view>
						</view>
						<view class="dataBox-row">
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-3"></i>
								<text>TVL($): 14409</text>
							</view>
						</view>
						<view class="dataBox-row">
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-4"></i>
								<text>销毁总价值: 120</text>
							</view>
						</view>
						<view class="dataBox-row">
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-5"></i>
								<text>集卡平均APY: 697946</text>
							</view>
						</view>

						<view class="initTitle"><view class="initTitle-label">交易数据</view></view>

						<view class="dataBox-row">
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-6"></i>
								<text>
									累计交易额($):
									<br />
									95400.79
								</text>
							</view>
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-2"></i>
								<text>
									24H交易额($):
									<br />
									27989.45
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
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
@import '/scss/personalDataBox';
</style>
