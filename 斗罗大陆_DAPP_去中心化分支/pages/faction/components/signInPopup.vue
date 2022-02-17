<template>
	<!-- 签到弹窗 -->
	<uni-popup ref="signInPopup" type="center" :animation="true">
		<view class="initPopup">
			<view class="initPopup-wrapper">
				<view class="initPopup-picTitle"><image src="@/static/common/popup/icon-title.png" mode="widthFix"></image></view>
				<view class="initPopup-container initPopup-container--alignCenter">
					<view class="initPopup-large">签到成功！</view>
					<view class="initPopup-desc initPopup-desc--light">小贴士：每天坚持签到，可以提高所在宗门的排名和活跃度哦</view>
					<view class="initPopup-btn" @click="hidePopup('signInPopup')">好的，我知道啦</view>
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
