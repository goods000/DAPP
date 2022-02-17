<template>
	<!-- 赠送成功弹窗 -->
	<uni-popup ref="successPopup" type="center" :animation="true">
		<view class="initPopup">
			<view class="initPopup-wrapper">
				<view class="initPopup-picTitle"><image src="@/static/common/popup/icon-title.png" mode="widthFix"></image></view>
				<view class="initPopup-container initPopup-container--alignCenter">
					<view class="initPopup-large">赠送成功</view>
					<view class="initPopup-desc initPopup-desc--light">小贴士：多余英雄可在斗罗集市中出售哦！</view>
					<view class="initPopup-btn" @click="hidePopup('successPopup')">确 定</view>
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
		hidePopup(e){
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
// @import '/scss/signInBox';
</style>
