<template>
	<!-- 活跃度介绍 -->
	<uni-popup ref="rewardPopup" type="center" :animation="true">
		<view class="initPopup">
			<view class="initPopup-wrapper">
				<view class="initPopup-picTitle"><image src="@/static/common/popup/icon-title.png" mode="widthFix"></image></view>
				<view class="initPopup-container initPopup-container--alignCenter">
					<view class="initPopup-close" @click="hidePopup('rewardPopup')"></view>
					<view class="initPopup-title"><text>宗门奖励说明</text></view>
					<view class="initPopup-descBox descBox">
						<scroll-view scroll-y="true" class="descBox-wrapper">
							<view class="descBox-list">1.宗门奖励每日共15000枚，持续2000天，共计3000万枚</view>
							<view class="descBox-list">2.每日15000枚宗门奖励，根据各宗门今日奖励 核算算力占全网今日宗门奖励核算算力的比例进 行分配</view>
							<view class="descBox-list">
								3.宗门奖励每日共15000枚，持续2000天，共计宗门奖励每日共15000枚，持续2000天，共计宗门奖励每日共15000枚，持续2000天，共计
							</view>
							<view class="descBox-list">
								4.宗门奖励每日共15000枚，持续2000天，共计3000万枚宗门奖励每日共15000枚，持续2000天，共计3000万枚宗门奖励每日共15000枚，持续2000天，共计3000万枚宗门奖励每日共15000枚，持续2000天，共计3000万枚
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
.descBox {
	&-wrapper {
		padding: 0 60upx;
		height: 300upx;
	}

	&-list {
		text-align: left;
		color: #54330a;
		font-size: 28upx;
		margin-bottom: 15upx;

		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>
