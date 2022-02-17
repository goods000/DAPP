<template>
	<view class="teamList">
		<view class="teamList-wrapper">
			<view class="teamList-headerImage">
				<image class="teamList-headerImage__listHeader" src="@/static/team/icon-team-listHeader.png" mode="widthFix"></image>
				<image class="teamList-headerImage__listTop" src="@/static/team/icon-team-listTop.png" mode="widthFix"></image>
			</view>
			<view class="teamList-listBox">
				<view class="listBox-wrapper">
					<view class="listBox-header">
						<view class="listBox-header__item">排行</view>
						<view class="listBox-header__item">地址</view>
						<view class="listBox-header__item">地位</view>
						<view class="listBox-header__item">战力</view>
						<view class="listBox-header__item">币种($)</view>
					</view>
					<scroll-view class="listBox__height" :scroll-y="true" :show-scrollbar="false">
						<view class="listBox-itemBox" v-for="(item,index) in 10" :key="index">
							<view class="listBox-itemBox__item">{{ index +1}}</view>
							<view class="listBox-itemBox__item">{{ address | walletAddressConceal(4)  }}</view>
							<view class="listBox-itemBox__item">海大将</view>
							<view class="listBox-itemBox__item">243.00</view>
							<view class="listBox-itemBox__item">450</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			address: 'HZW02sSFdD45gf4SDFSDFSFDSFDSF5455sg2357'
		};
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/teamList';
</style>
