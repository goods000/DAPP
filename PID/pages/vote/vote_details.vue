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
		<view class="main  voteDetails-bottom">
			<view class="goBack" @click="$tools.back()">
				<image src="../../static/public/icon-arrow-left-green.png" mode="widthFix"></image>
				返回到投票概览
			</view>
			<view class="voteDetails">
				<view class="voteDetailsContent">
					<view class="voteDetailsContent-title">{{ voteDetail.name }}</view>
					<image class="voteDetailsContent-image" v-if="status == 1" src="../../static/vote/icon-vote-tips1.png" mode="widthFix"></image>
					<image class="voteDetailsContent-image" v-if="status == 2" src="../../static/vote/icon-vote-tips2.png" mode="widthFix"></image>
					<view class="voteDetailsContent-tips">
						{{ voteDetail.introduction }}
					</view>
					<view class="voteDetailsContent-time">开始时间：{{ status == 1 ? voteDetail.startTime : voteDetail.userStartTime }}</view>
					<view class="voteDetailsContent-time">结束时间：{{ status == 1 ? voteDetail.endTime : voteDetail.userEndTime }}</view>
				</view>
			</view>
			<!-- 投票 -->
			<view class="voteDetails-wrapper" v-if="check == 1 || check == 2">
				<view class="voteDetails-headerBox">
					<view class="voteDetails-headerBox__item">
						<view class="voteDetails-headerBox__item-title">投票</view>
					</view>
					<view class="voteDetails-headerBox__title">请投出您的票</view>
				</view>
				<view v-if="check == 1" class="initNoData initNoData-noPadding">暂无投票</view>
				<view v-if="check == 1" class="initButton">
					<view class="initButton-btn initButton-btn--orange">即将开始</view>
				</view>
				<view class="voteDetails-operate" v-if="check == 2">
				<!-- <view class="voteDetails-operate"> -->
					<view class="voteDetails-operate__item" :class="{'voteDetails-operate__item--active' : checkActive == 0}" @click="changeCheckActive(0)">
						<image :src="checkActive == 0 ? '../../static/index/icon-check.png' : '../../static/index/icon-noCheck.png'" mode="widthFix"></image>
						<view class="voteDetails-operate__item-title" :class="{'voteDetails-operate__item-title--active' : checkActive == 0}">A.同意</view>
					</view>
					<view class="voteDetails-operate__item" :class="{'voteDetails-operate__item--active' : checkActive == 1}" @click="changeCheckActive(1)">
						<image :src="checkActive == 1 ? '../../static/index/icon-check.png' : '../../static/index/icon-noCheck.png'" mode="widthFix"></image>
						<view class="voteDetails-operate__item-title" :class="{'voteDetails-operate__item-title--active' : checkActive == 1}">B.拒绝</view>
					</view>
				</view>
				<view class="initButton" v-if="check == 2">
				<!-- <view class="initButton"> -->
					<view class="initButton-btn initButton-btn--green" @click="checkCanVote()">确定投票</view>
				</view>
			</view>
			<!-- 投票票数 -->
			<view class="voteDetails-wrapper">
				<view class="voteDetails-headerBox">
					<view class="voteDetails-headerBox__item">
						<view class="voteDetails-headerBox__item-title">投票票数</view>
					</view>
					<view class="voteDetails-headerBox__title">当前票数：{{ voteDetail.agreeUserCount*1 + voteDetail.disagreeUserCount }}票</view>
				</view>
				<view class="voteDetails-list">
					<view class="voteDetails-list__header">
						<view class="voteDetails-list__header-title">投票者</view>
						<view class="voteDetails-list__header-title">投票结果</view>
						<view class="voteDetails-list__header-title">票数</view>
					</view>
					<view class="initNoData initNoData-noPadding" v-if="voteDetail.detailList.length == 0">暂无数据</view>
					<scroll-view scroll-y="true" @scrolltolower="newsListLower" class="voteDetails-height">
						<view class="voteDetails-list__item" v-for="(item,index) in voteDetail.detailList" :key="index">
							<view class="voteDetails-list__item-title">{{ item.txAddress | walletAddressConceal(4) }}</view>
							<view class="voteDetails-list__item-title" :class="{'voteDetails-list__item-title--active' : item.agreeStatus == 1}">{{ item.agreeStatus ==0 ? '同意' : '拒绝' }}</view>
							<view class="voteDetails-list__item-title">1</view>
						</view>
					</scroll-view>
					<view class="voteDetails-list__seeAll" v-if="voteDetail.detailList.length >= 6" @click="newsListLower()">
						查看全部
						<image src="../../static/vote/icon-vote-select.png" mode="widthFix"></image>
					</view>
				</view>
				
			</view>
			<!-- 投票结果 -->
			<view class="voteDetails-wrapper">
				<view class="voteDetails-headerBox">
					<view class="voteDetails-headerBox__item">
						<view class="voteDetails-headerBox__item-title">投票结果</view>
					</view>
					<view class="voteDetails-headerBox__title">当前票数结果</view>
				</view>
				<view class="voteDetails-press">
					<view class="voteDetails-press__item">
						<view class="voteDetails-press__item-type">
							<text>A.同意</text>
							<image v-if="checkActive == 3" :src="voteDetail.agreeStatus == true ? '../../static/vote/icon-agrenment--active.png' : '../../static/vote/icon-agrenment.png'" mode="widthFix"></image>
						</view>
						<view class="voteDetails-press-content">
							<view class="voteDetails-press-content__chart">
								<!-- <view class="voteDetails-press-content__chart-line" :style="{ width: (( voteDetail.agreeUserCount / 100) *100) + '%' }"></view> -->
								<view class="voteDetails-press-content__chart-line" :style="{ width: (voteDetail.agreeRate*100) + '%' }"></view>
							</view>
						</view>
						<view class="voteDetails-press__tips">
							<view class="voteDetails-press__tips-title">{{ voteDetail.agreeUserCount }}张投票</view>
							<view class="voteDetails-press__tips-scale">{{ voteDetail.agreeRate*100 | number(2) }}%</view>
						</view>
					</view>
					<view class="voteDetails-press__item">
						<view class="voteDetails-press__item-type">
							<text>B.拒绝</text>
							<image v-if="checkActive == 3" :src="voteDetail.agreeStatus == false ? '../../static/vote/icon-agrenment--active.png' : '../../static/vote/icon-agrenment.png'" mode="widthFix"></image>
						</view>
						<view class="voteDetails-press-content">
							<view class="voteDetails-press-content__chart">
								<view class="voteDetails-press-content__chart-line" :style="{ width: (voteDetail.disagreeRate*100) + '%' }"></view>
							</view>
						</view>
						<view class="voteDetails-press__tips">
							<view class="voteDetails-press__tips-title">{{ voteDetail.disagreeUserCount }}张投票</view>
							<view class="voteDetails-press__tips-scale">{{ voteDetail.disagreeRate*100 | number(2) }}%</view>
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
							<view class="initMenuDrawerBox-listBox__list" @click="closeDrawerToPath('../notice/notice')">
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
		
		<w-loading text="加载中.." mask="true" click="true" ref="loading"></w-loading>
	</view>
</template>
<script>

export default {
	data() {
		return {
			totalPageInfo: [],
			menuDrawerWidth: uni.upx2px(600),
			web3: null,

			tradeCurrencyInfo: {},
			platformCurrencyInfo: {},
			userLevel: 0,
			
			using: 0,
			checkActive: 0,
			tabActive: 0,
			scrollInto:'',
			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0,
			voteDetail:{
				detailList:[]
			},
			canClick: true //避免点击过快/点击多次
		};
	},
	onLoad(hash) {
		this.voteId = hash.value1;
		this.status = hash.value2;
		this.check = hash.value3;
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
					// User rejected request
				}
			}
		}
	},
	methods: {
		init() {
			console.log("this.currencyInfo_USDT",this.currencyInfo_USDT.contractDecmial);
			this.getBancelOf(this.currencyInfo_USDT.contractAbi, this.currencyInfo_USDT.contractAddress, this.currencyInfo_USDT.contractDecmial).then(result => {
				console.log('USDT数量：', result);
				this.using = result;
			});
			this.getVoteDetailById();
			console.log("checkActive",this.checkActive);
		},
		// 是否能够投票
		checkCanVote() {
			console.log("checkActive",this.checkActive);
			if(this.canClick){
				this.canClick = false;
				this.$Ajax('/front/dapp/vote/isCanVote',{
						voteId: this.voteId
					},
					res => {
						// console.log('是否能够投票信息：', res);
						if (res.code == 0) {
							console.log("checkActive111",this.checkActive);
							if(this.status == 2){
								this.getHashByTransfer(
									this.currencyInfo_USDT.contractAbi,
									this.currencyInfo_USDT.contractAddress,
									this.currencyInfo_USDT.contractDecmial,
									this.voteDetail.roteInAddress,
									this.voteDetail.roteQuantity
								).then(result => {
									this.doVote(result);
								});
							}else{
								let a = null;
								this.doVote(a);
							}
						}
					}
				);
			}
		},
		// 投票
		doVote(transactionHash){
			// console.log("transactionHash",transactionHash);
			this.$Ajax('/front/dapp/vote/doVote',
				{
					voteId: this.voteId,
					hash: transactionHash,
					status: this.checkActive,
				},
				res => {
					// console.log('投票成功信息：', res);
					if (res.code == 0) {
						this.checkActive = '';
						this.hideLoading();
						this.$tools.toastBack('投票成功',1);
					}
				}
			);
		},
		getHashByTransfer(contractAbi, contractAddress, contractDecmial, toContactAddress, quantity) {
			/* 
				[ 合约发起转账 ]
				contractAbi = 合约ABI
				contractAddress = 合约地址
				contractDecimal = 合约精度
				toContactAddress = 目标合约地址
				quantity = 数量
			 */
			console.log(
				// 'contractAbi', contractAbi,
				'contractAddress' , contractAddress,
				'contractDecmial' , contractDecmial,
				'toContactAddress' , toContactAddress,
				'quantity' , quantity
			)
			let myContract = new this.web3.eth.Contract(contractAbi, contractAddress, {
				from: this.$store.state.userWalletAddress
			});
			let mathQuantity = this.$BigNumber(quantity * Math.pow(10, contractDecmial)).toFixed();
			return new Promise((resolve, reject) => {
				myContract.methods
					.transfer(toContactAddress, mathQuantity)
					.send()
					.on('transactionHash', hash => {
						console.log('交易哈希：', hash);
						this.showLoading();
						this.canClick = true;
						resolve(hash);
					})
					.on('receipt', receipt => {
						console.log('链上回调：', receipt);
					})
					.on('error', error => {
						console.error(error);
						this.canClick = true;
						this.hideLoading();
						this.$tools.toast('交易失败');
						reject(error);
					});
			});
		},
		async getBancelOf(contractAbi, contractAddress, contractDecmial) {
			let myContract = await new this.web3.eth.Contract(contractAbi, contractAddress);
			let result = await myContract.methods.balanceOf(this.$store.state.userWalletAddress).call();
			result = result / Math.pow(10, contractDecmial);
			return result;
		},
		getVoteDetailById() {
			this.$Ajax('/front/dapp/vote/getVoteDetailById', {
				type: this.status,
				voteId: this.voteId
			}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.voteDetail = res.obj;
				}
			});
		},
		changeCheckActive(index){
			if(this.checkActive != index){
				this.checkActive = index;
			}
		},
		changeActive(index){
			if(this.tabActive != index){
				this.tabActive = index;
			}
		},
		newsListLower(e) {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底了');
			} else {
				this.pageNum++;
				// this.getList();
			}
		},
		showLoading() {
			this.$refs.loading.open();
		},
		hideLoading() {
			this.$refs.loading.close();
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
@import '/scss/vote_details';
</style>
