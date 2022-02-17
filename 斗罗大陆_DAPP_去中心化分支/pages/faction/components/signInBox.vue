<template>
	<!-- 签到 -->
	<view class="containerBox">
		<scroll-view scroll-y="true" class="containerBox-wrapper">
			<view class="containerBox-plane">
				<view class="containerBox-title initTitle"><view class="initTitle-label">每日一签</view></view>
				<view class="containerBox-listBox listBox">
					<view class="listBox-wrapper">
						<view class="listBox-row">
							<view class="listBox-col listBox-col--3">
								<view class="listBox-list">今日算力变动值: +0</view>
								<view class="listBox-list">今日算力变动率: +100%</view>
								<view class="listBox-list">
									今日宗门活跃系数: 100%
									<view class="listBox-tipsBtn" @click="openPopup('activityPopup')"></view>
								</view>
							</view>
							<view class="listBox-col listBox-col--2">
								<view class="listBox-list">今日签到: 98/108</view>
								<view class="listBox-list">今日签到率: 74%</view>
						</view>
							</view>
					</view>
				</view>

				<view class="containerBox-buttonBox initButton"><view class="initButton-btn initButton-btn--style2" @click="openPopup('signInPopup')">立即签到</view></view>
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
@import '/scss/signInBox';
</style>
