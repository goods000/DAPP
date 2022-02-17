<template>
	<view class="pages">
		<view class="initHeader--fixed initHeader--bgStyle initHeader--white">
			<view class="initHeader initHeader-title">PilotDao dapp</view>
			<view class="initHeader">
				<view class="initHeader-wrapper">
					<view class="initHeader-left" @click="showDrawer('menuDrawer')">
						<view class="initHeader-menu"></view>
						<view class="initHeader-imageTitle"><image src="../../static/index/icon-header-logo.png" mode="widthFix"></image></view>
					</view>
					<!-- <view class="initHeader-right initHeader-right--text" @click="openPopup('accountPopup')">{{ $store.state.userWalletAddress | walletAddressConceal }}</view> -->
					<view class="initHeader-right initHeader-right--rightBg" @click="$tools.noOpen()">
						<image src="../../static/public/icon-setup.png" mode="" class="initHeader-right__iamge"></image>
						<view class="initHeader-right__text">设置</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="voteMain">
				<view class="voteMain-title">用户资产</view>
				<view class="voteMain-tips">查看您的个人资产</view>
			</view>
			<view class="voteNav">
				<view class="voteNav-active">首页</view>
				<image src="../../static/vote/icon-vote-next.png" class="voteNav-image" mode="widthFix"></image>
				<view class="voteNav-title">用户资产</view>
			</view>
			<view class="voteTitle">资产</view>
			
			<view class="asset">
				<view class="IDOBox-exchangeBox">
					<view class="IDOBox-exchangeBox__Box">
						<view class="recordBox-form__item" v-for="(item,index) in currencyInfo" :key="index">
							<view class="recordBox-form__item-label">
								 <image :src="item.pic" class="recordBox-form__item-label--image" mode=""></image>
								<view class="recordBox-form__item-label__title">{{ item.name }}</view>
							</view>
							<view class="recordBox-form__item-data dataItem">
								<view class="recordBox-dataItem">
									<view class="recordBox-dataItem__item">
										<view class="recordBox-dataItem__item-title">账户金额：</view>
									</view>
									<view class="recordBox-dataItem__item">
										<view class="recordBox-dataItem__item-title">{{ using[index] | number(4) }} <text>{{ item.name }}</text></view>
									</view>
								</view>
							</view>
							<view class="recordBox-dataItem__image">
								<image src="../../static/index/icon-record-next.png" class="recordBox-dataItem__image-image" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<uni-drawer :width="menuDrawerWidth" ref="menuDrawer">
			<view class="initMenuDrawerBox">
				<view class="initMenuDrawerBox-wrapper">
					<view class="initMenuDrawerBox-header">
					</view>
					<view class="initMenuDrawerBox-body">
						<scroll-view :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto" class="initMenuDrawerBox-height">
						<view class="initMenuDrawerBox-listBox">
							<view class="initMenuDrawerBox-listBox__list" @click="closeDrawerToPath('../index/index')">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-01.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">首页</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-02.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">薄饼交易</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-03.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">添加流动性</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list initMenuDrawerBox-listBox__list--active" @click="closeDrawerToPath('../asset/asset')">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-04.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">用户资产</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list" @click="closeDrawerToPath('../vote/vote')">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-05.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">投票</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list" @click="closeDrawerToPath('../IDO/IDO')">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-06.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">捐赠</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list" @click="closeDrawerToPath('../record/record')">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-07.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">节点奖励和个人奖励</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-10.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">邀请链接</view>
								<view class="initMenuDrawerBox-listBox__list-btn" @click="$tools.copy(inviteCode)">复制</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-08.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">Github</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-09.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">推特</view>
							</view>
							
						</view>
						</scroll-view>
					</view>
		
					<view class="initMenuDrawerBox-footer">
						<view class="initMenuDrawerBox-wallet">
							<view class="initMenuDrawerBox-wallet__icon"><image :src="currencyInfo_USDT.pic" mode="widthFix"></image></view>
							<view class="initMenuDrawerBox-wallet__data">${{ using[0] }}</view>
							<view class="initMenuDrawerBox-wallet__rightIcon">
								<image src="../../static/menu/icon-menu-02.png" mode=""></image>
								<image src="../../static/menu/icon-menu-03.png" mode=""></image>
							</view>
						</view>
						<view class="initMenuDrawerBox-language">
							<view class="initMenuDrawerBox-language__icon"><image src="../../static/menu/icon-menu-ch.png" mode="widthFix"></image></view>
							<view class="initMenuDrawerBox-language__title">ZH-CN</view>
						</view>
					</view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>
<script>

export default {
	data() {
		return {
			totalPageInfo: [],
			menuDrawerWidth: uni.upx2px(600),
			web3: null,
			currencyInfo: {}, // 币种列表
			tradeCurrencyInfo: {},
			platformCurrencyInfo: {},
			userLevel: 0,
			currencyUsing: 0,
			tabActive:0,
			checkActive: 0,
			scrollInto:'',
			using_USDT: 0,
			using_PID: 0,
			using_PID1: 0,
			using:[],
			currencyInfo_USDT:{},
		};
	},
	onShow() {
		this.totalPageInfo = getCurrentPages();
		this.inviteCode = uni.getStorageSync('inviteCode');
		if (window.ethereum) {
			try {
				window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
					if (typeof this.web3 !== null) {
						this.web3 = new this.$web3(window.ethereum);
					} else {
						this.web3 = new this.$web3(new this.$web3.providers.HttpProvider('https://bsc-dataseed.binance.org'));
					}
					this.web3.eth.defaultAccount = accounts[0];
					this.$store.commit('changeuserWalletAddress', accounts[0]);
					uni.setStorageSync('userWalletAddress', accounts[0]);
					if (accounts.length != 0) {
						this.init();
					}
				});
			} catch (error) {
				if (error.code === 4001) {
				}
			}
		}
		// this.init();
	},
	methods: {
		init() {
			let that = this;
			// that.currencyInfo = uni.getStorageSync('currencyInfo');
			// console.log("this.currencyInfo",that.currencyInfo);
			this.getCurrencyContractInfo().then(() => {
				this.currencyInfo.forEach((item,index) => {
					this.getBancelOf(item.contractAbi, item.contractAddress, item.contractDecmial).then(result => {
						this.using.push(result);
					});
				})
				console.log('数量：', this.using);
			});
		},
		// 币种合约配置信息
		getCurrencyContractInfo() {
			let data = new Promise((resolve, reject) => {
				this.$Ajax('/front/dapp/pool/getCurrencyContract', {}, res => {
					// console.log('币种合约配置信息：', res);
					if (res.code == 0) {
						this.currencyInfo = res.obj;
						this.currencyInfo_USDT = res.obj[0];
						this.currencyInfo_USDT.contractAbi = JSON.parse(JSON.parse(JSON.stringify(this.currencyInfo_USDT)).contractAbi);
						this.currencyInfo_PID = res.obj[1];
						this.currencyInfo_PID.contractAbi = JSON.parse(JSON.parse(JSON.stringify(this.currencyInfo_PID)).contractAbi);
						resolve();
					}
				});
			});
			return data;
		},
		async getBancelOf(contractAbi, contractAddress, contractDecmial) {
			console.log("contractAddress：",contractAddress,"contractDecmial：",contractDecmial);
			let myContract = await new this.web3.eth.Contract(contractAbi, contractAddress);
			let result = await myContract.methods.balanceOf(this.$store.state.userWalletAddress).call();
			result = result / Math.pow(10, contractDecmial);
			return result;
		},
		changeActive(index){
			if(this.tabActive != index){
				this.tabActive = index;
			}
		},
		changeCheckActive(index){
			if(this.checkActive != index){
				this.checkActive = index;
			}
		},
		openPopup(e, item) {
			this.popupInfo = item;
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
			}
		},
		showDrawer(e) {
			this.$refs[e].open();
		},
		closeDrawer(e) {
			this.$refs[e].close();
		},
		closeDrawerToPath(path) {
			let prevPath = '';
			
			let toPath = path.split('../')[1];
			
			if (prevPath == toPath) {
				this.$tools.back(1);
			} else {
				this.closeDrawer('menuDrawer');
				this.$tools.jump(path);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../record/scss/record';
@import '../index/scss/index';
.voteMain-tips{
	margin: 0;
}
.recordBox{
	&-form{
		&__item{
			border-bottom: 1px solid $globalColor-borderStyle;
			&:nth-last-child(1){
				border-bottom: 1px solid $globalColor-borderStyle;
			}
			padding: 50upx 40upx 20upx;
			margin: 0 30upx;
			&-label{
				&__title{
					font-size: 40upx;
					font-weight: 500;
				}
			}
		}
	}
	&-dataItem{
		width: 90%;
		padding-top: 30upx;
		&__item{
			&-title{
				font-size: 35upx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: right;
				color: $globalColor-fontStyle;
				text{
					font-weight: bold;
					margin-left: 10upx;
				}
			}
		}
		&__image{
			position: absolute;right: 60upx;
			&-image{
				width: 26upx;
				height: 16upx;
			}
		}
	}
}
</style>
