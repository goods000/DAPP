<template>
	<!-- 签到 -->
	<view class="containerBox">
		<scroll-view scroll-y="true" class="containerBox-wrapper">
			<view class="containerBox-plane">
				<view class="containerBox-title initTitle"><view class="initTitle-label">交易数据</view></view>
				<view class="containerBox-dataBox dataBox">
					<view class="dataBox-wrapper">
						<view class="dataBox-row">
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-7"></i>
								<text>宗门总数: 36</text>
							</view>
							<view class="dataBox-list">
								<i class="sprite sprite-icon-label-8"></i>
								<text>我的宗门: 玄天宗</text>
							</view>
						</view>

						<view class="dataBox-row">
							<view class="dataBox-list dataBox-list--9">
								<i class="sprite sprite-icon-label-9"></i>
								<text>
									宗门累计总奖励:
									<br />
									+100%
								</text>
							</view>
							<view class="dataBox-list dataBox-list--9">
								<i class="sprite sprite-icon-label-9"></i>
								<text>
									宗门累计奖励:
									<br />
									74%
								</text>
							</view>
						</view>

						<view class="dataBox-row">
							<view class="dataBox-list dataBox-list--9">
								<i class="sprite sprite-icon-label-7"></i>
								<text>
									宗门昨日总奖励:
									<br />
									100%
								</text>
							</view>
							<view class="dataBox-list dataBox-list--9">
								<i class="sprite sprite-icon-label-7"></i>
								<text>
									宗门昨日奖励:
									<br />
									100%
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
@import '/scss/teamDataBox';
</style>
