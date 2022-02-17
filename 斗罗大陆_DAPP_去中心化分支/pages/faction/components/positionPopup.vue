<template>
	<!-- 活跃度介绍 -->
	<uni-popup ref="positionPopup" type="center" :animation="true">
		<view class="initPopup">
			<view class="initPopup-wrapper">
				<view class="initPopup-picTitle"><image src="@/static/common/popup/icon-title.png" mode="widthFix"></image></view>
				<view class="initPopup-container initPopup-container--alignCenter">
					<view class="initPopup-close" @click="hidePopup('positionPopup')"></view>
					<view class="initPopup-title"><text>宗门职位说明</text></view>
					<view class="initPopup-positionBox positionBox">
						<view class="positionBox-wrapper">
							<view class="positionBox-item">
								<view class="positionBox-item__title">宗主</view>
								<view class="positionBox-item__desc">共1位 持有召集令的用户</view>
							</view>
							<view class="positionBox-item">
								<view class="positionBox-item__title">长老</view>
								<view class="positionBox-item__desc">共4位 个人总算力排名宗门第1-4位的用户</view>
							</view>
							<view class="positionBox-item">
								<view class="positionBox-item__title">护法</view>
								<view class="positionBox-item__desc">共8位 个人总算力排名宗门第5-12位的用户</view>
							</view>
						</view>
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
.positionBox {
	&-wrapper {
	}

	&-item {
		margin-bottom: 15upx;

		&:last-child {
			margin-bottom: 0;
		}

		&__title {
			color: #54330a;
			font-size: 28upx;
		}

		&__desc {
			color: #95785b;
			font-size: 28upx;
		}
	}
}
</style>
