<template>
	<view class="initListBox-market">
		<view class="initListBox-header">
			<image src="@/static/myWealth/icon-wealthList-header--01.png" mode="widthFix"></image>
		</view>
		<view class="wealthList">
			<view class="wealthList-wrapper">
				<view class="wealthList-item" v-for="(item,index) in 3" :key="index">
					<view class="wealthList-item__image">
						<image v-if="index == 0" src="@/static/myWealth/icon-wealthList-01.png" mode="widthFix"></image>
						<image v-if="index == 1" src="@/static/myWealth/icon-wealthList-02.png" mode="widthFix"></image>
						<image v-if="index == 2" src="@/static/myWealth/icon-wealthList-03.png" mode="widthFix"></image>
					</view>
					<view class="wealthList-item__available" v-if="index == 0">当前可用({{ $store.state.projectCurrencyName }})</view>
					<view class="wealthList-item__available" v-if="index == 1">当前锁仓({{ $store.state.projectCurrencyName }})</view>
					<view class="wealthList-item__available" v-if="index == 2">累计销毁({{ $store.state.projectCurrencyName }})</view>
					<view class="wealthList-item__en" v-if="index == 0">The currently available({{ $store.state.projectCurrencyName }})</view>
					<view class="wealthList-item__en" v-if="index == 1">The current lock up({{ $store.state.projectCurrencyName }})</view>
					<view class="wealthList-item__en" v-if="index == 2">The accumulative destruction({{ $store.state.projectCurrencyName }})</view>
					<view class="wealthList-item__num" v-if="index == 0">{{ balanceInfo.available }}</view>
					<view class="wealthList-item__num" v-if="index == 1">{{ balanceInfo.extracted }}</view>
					<view class="wealthList-item__num" v-if="index == 2">{{ balanceInfo.destroy }}</view>
				</view>
			</view>
			<view class="wealthList-btn">
				<view class="wealthList-btn__style" @click="withdraw">提币</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			wealthList:[],
			balanceInfo:{},
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init(){
			this.getFundBalance();
		},
		getFundBalance() {
			this.$Ajax('/front/fund/balance', {}, res => {
				this.balanceInfo = res.obj;
			});
		},
		// 提币
		withdraw(){
			this.$emit('openPopup', 'openWithdraw',this.balanceInfo);
		},
		check(){
			this.checkActive = !this.checkActive;
		},
		openPopup(e) {
			console.log(e)
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/wealthList';
</style>