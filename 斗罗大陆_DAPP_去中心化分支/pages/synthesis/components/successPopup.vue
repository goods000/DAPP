<template>
	<!-- 排名筛选 -->
	<uni-popup ref="successPopup" type="center" :animation="true">
		<view class="successPopupBox">
			<view class="successPopupBox-wrapper">
				<view class="successPopupBox-container">
					<view class="successPopupBox-successTitle">
						<view class="successPopupBox-successTitle__label">恭喜获得</view>
					</view>

					<view class="successPopupBox-cardBox cardBox">
						<view class="cardBox-card"><image src="@/static/public/card/icon-card-demo1.png" mode="widthFix"></image></view>
						<view class="cardBox-name">
							金色魂环卡·阿银
						</view>
					</view>

					<view class="successPopupBox-infoBox infoBox">
						<view class="infoBox-wrapper">
							<view class="infoBox-list">
								<view class="infoBox-list__label infoBox-list__label--power">算力：</view>
								<view class="infoBox-list__data">59432</view>
							</view>
							<view class="infoBox-list">
								<view class="infoBox-list__label infoBox-list__label--experience">经验值：</view>
								<view class="infoBox-list__data">+540</view>
							</view>
						</view>
					</view>
				</view>

				<view class="successPopupBox-buttonBox buttonBox">
					<view class="buttonBox-btn buttonBox-btn--style2" @click="hidePopup('successPopup')">确定</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	methods: {
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/successPopup';
</style>
