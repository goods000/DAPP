<template>
	<!-- 用户栏 -->
	<view class="userInfoBox">
		<view class="userInfoBox-wrapper">
			<view class="userInfoBox-avatar sprite sprite-icon-avatar-bg">
				<view class="userInfoBox-avatar__img sprite sprite-icon-avatar-demo"></view>
			</view>
			<view class="userInfoBox-level"><view class="userInfoBox-level__label">魂尊</view></view>
			<view class="userInfoBox-content">
				<view class="userInfoBox-address sprite sprite-icon-address-bg">{{ $store.state.userWalletAddress | walletAddressConceal(3) }}</view>
				<view class="userInfoBox-attributes">
					<view class="userInfoBox-attributes__item">
						<view class="userInfoBox-attributes__item-icon sprite sprite-icon-attributes-power"></view>
						<view class="userInfoBox-attributes__item-data">59432</view>
					</view>
					<view class="userInfoBox-attributes__item">
						<view class="userInfoBox-attributes__item-icon sprite sprite-icon-attributes-using"></view>
						<view class="userInfoBox-attributes__item-data">594</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
@import '/scss/userInfoBox';
</style>
