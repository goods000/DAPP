<template>
	<view class="teamList">
		<view class="teamList-wrapper">
			<view class="teamList-headerImage">
				<image class="teamList-headerImage__listHeader" :src="require(`@/static/team/icon-team-listHeader-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
				<image class="teamList-headerImage__listTop" src="@/static/team/icon-team-listTop.png" mode="widthFix"></image>
			</view>
			<view class="teamList-listBox">
				<view class="listBox-wrapper">
					<view class="listBox-header">
						<view class="listBox-header__item">{{ i18n.team.listTips01 }}</view>
						<view class="listBox-header__item">{{ i18n.team.listTips02 }}</view>
						<view class="listBox-header__item">{{ i18n.team.listTips03 }}</view>
						<view class="listBox-header__item">{{ i18n.team.listTips04 }}</view>
						<!-- <view class="listBox-header__item">{{ i18n.team.listTips05 }}($)</view> -->
					</view>
					<scroll-view class="listBox__height" :scroll-y="true" @scrolltolower="scrolltolower">
						<view class="initNoData" v-if="teamList.length == 0">{{ i18n.global.noData }}</view>
						<view class="listBox-itemBox" :class="{'listBox-itemBox--active' : item.address == $store.state.userWalletAddress }"
						 v-for="(item,index) in teamList" :key="index">
							<view class="listBox-itemBox__item">{{ index +1}}</view>
							<view class="listBox-itemBox__item">{{ item.address | walletAddressConceal(4) }}</view>
							<view class="listBox-itemBox__item">{{ item.gangPosition }}</view>
							<view class="listBox-itemBox__item">{{ item.hashRate }}</view>
							<!-- <view class="listBox-itemBox__item">{{ $store.state.USDTCurrencyName }}</view> -->
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
			address: 'HZW02sSFdD45gf4SDFSDFSFDSFDSF5455sg2357',
			teamList: [],
			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.teamList = [];
			this.getTeamList();
		},
		getTeamList() {
			this.$Ajax('/front/gang/address/rank',
				{
					address: this.$store.state.userWalletAddress,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					this.pages = res.obj.pages;
					this.teamList = [...this.teamList, ...res.obj.list];
				}
			);
		},
		scrolltolower() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getTeamPersonList();
			}
		},
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/teamList';
</style>
