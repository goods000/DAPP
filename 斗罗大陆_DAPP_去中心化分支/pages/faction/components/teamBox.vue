<template>
	<!-- 宗门 -->
	<view class="containerBox">
		<scroll-view scroll-y="true" class="containerBox-wrapper">
			<view class="containerBox-plane">
				<view class="containerBox-title initTitle"><view class="initTitle-label">玄天宗</view></view>
				<view class="containerBox-listBox listBox">
					<view class="listBox-wrapper">
						<view class="listBox-row">
							<view class="listBox-col listBox-col--3">
								<view class="listBox-list">
									宗门职位:
									<text>堂主</text>
									<view class="listBox-tipsBtn" @click="openPopup('positionPopup')"></view>
								</view>
								<view class="listBox-list">
									我的排名:
									<text>17</text>
									/108
								</view>
								<view class="listBox-list">宗门实时算力: 145</view>
								<view class="listBox-list">宗门当前最低算力: 47</view>
								<view class="listBox-list">宗门昨日最低算力: 36</view>
								<view class="listBox-list">
									宗门排名:
									<text>7</text>
									/21
								</view>
								<view class="listBox-list">宗门TVL: $450</view>
								<view class="listBox-list">宗门邀请链接: <text>点击复制</text></view>
							</view>
							<view class="listBox-col listBox-col--2">
								<view class="listBox-list">
									宗门奖励
									<view class="listBox-tipsBtn" @click="openPopup('rewardPopup')"></view>
								</view>
								<view class="listBox-list">
									昨日奖励(WHT):
									<br />
									457.34
								</view>
								<view class="listBox-list">
									累计奖励(WHT):
									<br />
									457.34
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="containerBox-buttonBox initButton"><view class="initButton-btn initButton-btn--style1" @click="openPopup('choosePopup')">查看</view></view>
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
@import '/scss/teamBox';
</style>
