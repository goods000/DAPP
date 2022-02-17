<template>
	<!-- 收益详情 -->
	<view class="incomeBtnBox">
		<view class="incomeBtnBox-wrapper" @click="openPopup('openReceiveIncome')">
			<view class="incomeBtnBox-icon">
				<image :src="require(`@/static/index/fixedBtn/icon-fixedBtn-income-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
			</view>
			<view class="incomeBtnBox-data">{{ $store.state.headerInfo['24hReward'] }}</view>
		</view>
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
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/incomeBtnBox';
</style>
