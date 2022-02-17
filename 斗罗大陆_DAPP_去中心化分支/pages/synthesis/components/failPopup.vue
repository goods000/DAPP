<template>
	<!-- 赠送成功弹窗 -->
	<uni-popup ref="failPopup" type="center" :animation="true">
		<view class="initPopup">
			<view class="initPopup-wrapper">
				<view class="initPopup-picTitle"><image src="@/static/common/popup/icon-title.png" mode="widthFix"></image></view>
				<view class="initPopup-container initPopup-container--alignCenter">
					<view class="initPopup-large">合成失败</view>
					<view class="initPopup-desc initPopup-desc--light">小贴士：合成失败将返还代合成英雄价值总和的WHL(50%立即返还、40%按100天分期返还、10%销毁)</view>
					<view class="initPopup-btn" @click="hidePopup('failPopup')">确 定</view>
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
