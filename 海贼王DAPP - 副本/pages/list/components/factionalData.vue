<template>
	<view class="factionalData">
		<view class="factionalData-wrapper">
			<view class="factionalData-item">
				<view class="factionalData-item-1"></view>
				<view class="factionalData-item__box">
					<view class="factionalData-item__name">{{ i18n.list.tips01 }}</view>
					<view class="factionalData-item__num">{{ factionalData.gangCount }}</view>
				</view>
			</view>
			<view class="factionalData-item">
				<view class="factionalData-item-2"></view>
				<view class="factionalData-item__box">
					<view class="factionalData-item__name">{{ i18n.list.tips02 }}</view>
					<view class="factionalData-item__num factionalData-item__num--bold">‘{{ factionalData.myGang }}’</view>
				</view>
			</view>
			<view class="factionalData-item">
				<view class="factionalData-item-3"></view>
				<view class="factionalData-item__box">
					<view class="factionalData-item__name">{{ i18n.list.tips03 }}</view>
					<view class="factionalData-item__num">{{ factionalData.gangTotalReward }}</view>
				</view>
			</view>
			<view class="factionalData-item">
				<view class="factionalData-item__box">
					<view class="factionalData-item__name"></view>
					<view class="factionalData-item__num"></view>
				</view>
			</view>
			<view class="factionalData-item">
				<view class="factionalData-item-4"></view>
				<view class="factionalData-item__box">
					<view class="factionalData-item__name">{{ i18n.list.tips04 }}</view>
					<view class="factionalData-item__num">{{ factionalData.gangYesterdayReward}}</view>
				</view>
			</view>
			<view class="factionalData-item">
				<view class="factionalData-item__box">
					<view class="factionalData-item__name"></view>
					<view class="factionalData-item__num"></view>
				</view>
			</view>
			
			<!-- <view class="factionalData-btn">进入</view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			factionalData: {}
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getFactionalData();
		},
		getFactionalData() {
			this.$Ajax('/front/common/gang/data',{
					address: this.$store.state.userWalletAddress
				},
				res => {
					this.factionalData = res.obj;
				}
			);
		},
		
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/factionalData';
</style>

