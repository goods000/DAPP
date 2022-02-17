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
				<view class="voteMain-title">投票</view>
				<view class="voteMain-tips">对PilotDao dapp系统的未来发表看法</view>
				<view class="voteMain-btn" @click="$tools.noOpen()">
					<image src="../../static/vote/icon-vote-headerBtn.png" mode="widthFix"></image>
					<view class="voteMain-btn__title">提出提案</view>
				</view>
			</view>
			<view class="voteNav">
				<view class="voteNav-active">首页</view>
				<image src="../../static/vote/icon-vote-next.png" class="voteNav-image" mode="widthFix"></image>
				<view class="voteNav-title">投票</view>
			</view>
			<view class="voteTitle">投票</view>
			
			<view class="voteBox">
				<view class="voteBox-header">
					<view class="voteBox-header__item" :class="{'voteBox-header__item--active' : tabActive == 1}" @click="changeActive(1)">
						<image class="voteBox-header__item-image" :src="tabActive == 1 ? '../../static/vote/icon-vote-01--active.png' : '../../static/vote/icon-vote-01.png'" mode="widthFix"></image>
						<view class="voteBox-header__title" :class="{'voteBox-header__title--active' : tabActive == 1}">机构投票</view>
					</view>
					<view class="voteBox-header__item" :class="{'voteBox-header__item--active' : tabActive == 2}" @click="changeActive(2)">
						<image class="voteBox-header__item-image" :src="tabActive == 2 ? '../../static/vote/icon-vote-02--active.png' : '../../static/vote/icon-vote-02.png'" mode="widthFix"></image>
						<view class="voteBox-header__title" :class="{'voteBox-header__title--active' : tabActive == 2}">全网投票</view>
					</view>
				</view>
				<view class="voteBox-form">
					<!-- <view class="initNoData">暂无交易</view> -->
					<view class="voteBox-form__itemBox">
						<view class="voteBox-form__itemBox-checkBox">
							<view class="voteBox-form__itemBox-check" :class="{'voteBox-form__itemBox-check--active' : checkActive == 2}" @click="changeCheckActive(2)">
								<image :src="checkActive == 2 ? '../../static/index/icon-check.png' : '../../static/index/icon-noCheck.png'" mode="widthFix"></image>立即投票
							</view>
							<view class="voteBox-form__itemBox-check" :class="{'voteBox-form__itemBox-check--active' : checkActive == 1}" @click="changeCheckActive(1)">
								<image :src="checkActive == 1 ? '../../static/index/icon-check.png' : '../../static/index/icon-noCheck.png'" mode="widthFix"></image>即将开始
							</view>
							<view class="voteBox-form__itemBox-check" :class="{'voteBox-form__itemBox-check--active' : checkActive == 3}" @click="changeCheckActive(3)">
								<image :src="checkActive == 3 ? '../../static/index/icon-check.png' : '../../static/index/icon-noCheck.png'" mode="widthFix"></image>已关闭
							</view>
						</view>
					</view>
				</view>
				<view class="voteBox-list" v-if="tabActive == 1">
					<scroll-view :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto" class="voteBox-height">
						<!-- <view class="initNoData initNoData-noPadding" v-if="(checkActive == 3 ? '' : userInfo.whiteIf != 1) || recordList.length == 0">暂无数据</view> -->
						<view class="initNoData initNoData-noPadding" v-if="userInfo.whiteIf != 1 || recordList.length == 0">暂无数据</view>
						<view class="voteBox-list__item" v-for="(item,index) in recordList" :key="index" 
						@click="$tools.jump('./vote_details',item.id,tabActive,checkActive)" v-if="item.status == userInfo.whiteIf">
							<image class="voteBox-list__item-next" src="../../static/index/icon-record-next.png" mode="widthFix"></image>
							<view class="voteBox-list__item-title">
								{{ item.name }}
								<image :src="tabActive == 1 ? '../../static/vote/icon-vote-tips1.png' : '../../static/vote/icon-vote-tips2.png'" mode="widthFix"></image>
							</view>
							<view class="voteBox-list__item-time">{{ tabActive == 1 ? item.endTime : item.userEndTime }} 结束</view>
							<view class="voteBox-list__item-btn voteBox-list__item-btn--01" v-if="checkActive == 2">
								<image src="../../static/vote/icon-vote-btn01.png" mode="widthFix"></image>立即投票
							</view>
							<view class="voteBox-list__item-btn voteBox-list__item-btn--02" v-if="checkActive == 1">
								<image src="../../static/vote/icon-vote-btn02.png" mode="widthFix"></image>即将开始
							</view>
							<view class="voteBox-list__item-btn voteBox-list__item-btn--03" v-if="checkActive == 3">
								<image src="../../static/vote/icon-vote-btn03.png" mode="widthFix"></image>已关闭
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="voteBox-list" v-if="tabActive == 2">
					<scroll-view :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto" class="voteBox-height">
						<view class="initNoData initNoData-noPadding" v-if="recordList.length == 0">暂无数据</view>
						<view class="voteBox-list__item" v-for="(item,index) in recordList" :key="index" 
						@click="$tools.jump('./vote_details',item.id,tabActive,checkActive)">
							<image class="voteBox-list__item-next" src="../../static/index/icon-record-next.png" mode="widthFix"></image>
							<view class="voteBox-list__item-title">
								{{ item.name }}
								<image :src="tabActive == 1 ? '../../static/vote/icon-vote-tips1.png' : '../../static/vote/icon-vote-tips2.png'" mode="widthFix"></image>
							</view>
							<view class="voteBox-list__item-time">{{ tabActive == 1 ? item.endTime : item.userEndTime }} 结束</view>
							<view class="voteBox-list__item-btn voteBox-list__item-btn--01" v-if="checkActive == 2">
								<image src="../../static/vote/icon-vote-btn01.png" mode="widthFix"></image>立即投票
							</view>
							<view class="voteBox-list__item-btn voteBox-list__item-btn--02" v-if="checkActive == 1">
								<image src="../../static/vote/icon-vote-btn02.png" mode="widthFix"></image>即将开始
							</view>
							<view class="voteBox-list__item-btn voteBox-list__item-btn--03" v-if="checkActive == 3">
								<image src="../../static/vote/icon-vote-btn03.png" mode="widthFix"></image>已关闭
							</view>
						</view>
					</scroll-view>
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
							<view class="initMenuDrawerBox-listBox__list" @click="closeDrawerToPath('../asset/asset')">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-04.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">用户资产</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list initMenuDrawerBox-listBox__list--active" @click="closeDrawerToPath('../vote/vote')">
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
							<view class="initMenuDrawerBox-wallet__data">${{ using }}</view>
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
			currencyInfo_USDT:{},
			using: 0,
			tabActive:1,
			checkActive: 2,
			scrollInto:'',
			pageNum: 1,
			pageSize: 20,
			page: 1,
			recordList:[],
			userInfo:{},
		};
	},
	onShow() {
		this.totalPageInfo = getCurrentPages();
		this.currencyInfo_USDT = uni.getStorageSync('currencyInfo_USDT');
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
			console.log("this.currencyInfo_USDT",this.currencyInfo_USDT.contractDecmial);
			this.getBancelOf(this.currencyInfo_USDT.contractAbi, this.currencyInfo_USDT.contractAddress, this.currencyInfo_USDT.contractDecmial).then(result => {
				console.log('USDT数量：', result);
				this.using = result;
			});
			this.recordList = [];
			this.getBaseInfo()	// 用户信息
			this.getVoteCrowdfundingData()	// 投票列表
		},
		// 用户信息
		getBaseInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.userInfo = res.obj;
				}
			});
		},
		// 投票列表
		getVoteCrowdfundingData() {
			this.$Ajax('/front/dapp/vote/getVoteCrowdfundingData', {
				pageNum:this.pageNum,
				pageSize:this.pageSize,
				status:this.tabActive,
				type:this.checkActive,
			}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.pages = res.obj.pages;
					this.recordList = this.recordList.concat(res.obj.list);
				}
			});
		},
		changeActive(index){
			if(this.tabActive != index){
				this.tabActive = index;
				this.checkActive = 2;
				this.pageNum = 1;
				this.recordList = [];
				this.getVoteCrowdfundingData();
			}
		},
		changeCheckActive(index){
			if(this.checkActive != index){
				this.checkActive = index;
				this.pageNum = 1;
				this.recordList = [];
				this.getVoteCrowdfundingData();
			}
		},
		async getBancelOf(contractAbi, contractAddress, contractDecmial) {
			let myContract = await new this.web3.eth.Contract(contractAbi, contractAddress);
			let result = await myContract.methods.balanceOf(this.$store.state.userWalletAddress).call();
			result = result / Math.pow(10, contractDecmial);
			return result;
		},
		showDrawer(e) {
			this.$refs[e].open();
		},
		closeDrawer(e) {
			this.$refs[e].close();
		},
		closeDrawerToPath(path) {
			let prevPath = '';
			
			if(this.totalPageInfo[this.totalPageInfo.length - 2]){
				prevPath = this.totalPageInfo[this.totalPageInfo.length - 2].route.split('pages/')[1];
			}
			
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
@import '/scss/vote';
</style>
