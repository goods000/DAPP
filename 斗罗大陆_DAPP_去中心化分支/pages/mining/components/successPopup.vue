<template>
	<!-- 赠送成功弹窗 -->
	<uni-popup ref="successPopup" type="center" :animation="true">
		<view class="initPopup">
			<view class="initPopup-wrapper">
				<view class="initPopup-picTitle"><image src="@/static/common/popup/icon-title.png" mode="widthFix"></image></view>
				<view class="initPopup-container initPopup-container--alignCenter">
					<view class="initPopup-large">升级成功</view>
					<view class="initPopup-desc initPopup-desc--light">小贴士：卡槽等级越高加成就越多哦！并且不会随着英雄的拆卸而重置。</view>
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
