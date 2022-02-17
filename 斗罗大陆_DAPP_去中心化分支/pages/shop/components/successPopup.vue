<template>
	<!-- 购买成功弹窗 -->
	<uni-popup ref="successPopup" type="center" :animation="true">
		<view class="initPopup">
			<view class="initPopup-wrapper">
				<view class="initPopup-picTitle"><image src="@/static/common/popup/icon-title.png" mode="widthFix"></image></view>
				<view class="initPopup-container initPopup-container--alignCenter">
					<view class="initPopup-large">购买成功</view>
					<view class="initPopup-desc initPopup-desc--light">小贴士：盲盒可以通过礼物的方式转赠给好友哦！</view>
					<view class="initPopup-row">
						<view class="initPopup-btn" @click="hidePopup('successPopup')">确定</view>
						<view class="initPopup-btn" @click="toBackpack()">去背包查看</view>
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
		toBackpack() {
			this.hidePopup('successPopup');
			this.$tools.jump('../backpack/backpack');
		},
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
// @import '/scss/signInBox';
</style>
