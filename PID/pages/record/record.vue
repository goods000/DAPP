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
				<view class="voteMain-title">节点奖励和个人奖励</view>
				<view class="voteMain-tips">查看您的数据统计</view>
				<view class="voteMain-btn" @click="isActive()" v-show="isCanActive">
					<image src="../../static/record/icon-record-headerBtn.png" mode="widthFix"></image>
					<view class="voteMain-btn__title">激活节点</view>
				</view>
			</view>
			<view class="voteNav">
				<view class="voteNav-active">首页</view>
				<image src="../../static/vote/icon-vote-next.png" class="voteNav-image" mode="widthFix"></image>
				<view class="voteNav-title">节点奖励和个人奖励</view>
			</view>
			<view class="voteTitle">奖励</view>
			
			<view class="voteBox">
				<view class="voteBox-header">
					<view class="voteBox-header__item" :class="{'voteBox-header__item--active' : tabActive == 31}" @click="changeActive(31)">
						<view class="voteBox-header__title" :class="{'voteBox-header__title--active' : tabActive == 31}">节点奖励</view>
					</view>
					<view class="voteBox-header__item" :class="{'voteBox-header__item--active' : tabActive == 32}" @click="changeActive(32)">
						<view class="voteBox-header__title" :class="{'voteBox-header__title--active' : tabActive == 32}">个人奖励</view>
					</view>
				</view>
				<view class="voteDetails-list">
					<view class="voteDetails-list__header">
						<view class="voteDetails-list__header-title">账号</view>
						<view class="voteDetails-list__header-title">数量</view>
						<view class="voteDetails-list__header-title">时间</view>
					</view>
					<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
					<scroll-view scroll-y="true" @scrolltolower="newsListLower" class="voteDetails-height">
						<view class="voteDetails-list__item" v-for="(item,index) in recordList" :key="index">
							<view class="voteDetails-list__item-title">{{ item.userName | walletAddressConceal(4) }}</view>
							<view class="voteDetails-list__item-title">{{ item.money }}{{ item.currencyName }}</view>
							<view class="voteDetails-list__item-title">{{ item.createTime }}</view>
						</view>
					</scroll-view>
					<view class="voteDetails-list__seeAll" v-if="recordList.length >= 6" @click="newsListLower()">
						查看全部
						<image src="../../static/vote/icon-vote-select.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 激活节点 -->
		<uni-popup ref="recordPopup" type="center" :animation="true" @change="changePopup">
			<view class="recordBox">
				<view class="recordBox-wrapper">
					<view class="recordBox-header">
						<view class="recordBox-header__title" v-if="!isContinueActive">激活节点</view>
						<view class="recordBox-header__title" v-else>节点激活到期</view>
						<image src="../../static/public/icon-close.png" class="recordBox-header__image" mode="" @click="hidePopup('recordPopup')"></image>
					</view>
					<view class="recordBox-form" v-if="!isContinueActive">
						<image class="recordBox-form__image" src="../../static/record/icon-record-open.png" mode="widthFix"></image>
						<view class="recordBox-form__title">激活节点,有效期为一年</view>
						<view class="recordBox-form__title">激活有效期内可享受伞下节点收益</view>
					</view>
					<view class="recordBox-form" v-else>
						<image class="recordBox-form__image" src="../../static/record/icon-record-end.png" mode="widthFix"></image>
						<view class="recordBox-form__title">您的超级节点身份已到期</view>
						<view class="recordBox-form__title">是否选择继续续约激活</view>
					</view>
					<view class="recordBox-btn initButton">
						<view v-if="!isContinueActive" class="initButton-btn initButton-btn--green" @click="checkCanActiveNode()">激活节点</view>
						<view v-if="isContinueActive" class="initButton-btn initButton-btn--green" @click="contiueActiveNode()">激活节点</view><!--继续激活-->
						<view v-if="isContinueActive" class="initButton-btn initButton-btn--disabled" @click="cancelActiveNode()">取消激活</view>
					</view>
				</view>
			</view>
		</uni-popup>

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
							<view class="initMenuDrawerBox-listBox__list" @click="closeDrawerToPath('../vote/vote')">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-05.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">投票</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list" @click="closeDrawerToPath('../IDO/IDO')">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-06.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">捐赠</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list initMenuDrawerBox-listBox__list--active" @click="closeDrawerToPath('../record/record')">
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

			tabActive:31,
			checkActive: 0,
			scrollInto:'',
			using: 0,
			pageNum: 1,
			pageSize:6,
			page: 1,
			isCanActive:'', //用户是否激活
			isContinueActive:'', //用户是否继续激活
			activeNodeRule:{}, //节点规则
			recordList:[],
			canClick: true //避免点击过快/点击多次
		};
	},
	onShow() {
		this.totalPageInfo = getCurrentPages();
		this.currencyInfo_USDT = uni.getStorageSync('currencyInfo_USDT');
		this.currencyInfo_PID = uni.getStorageSync('currencyInfo_PID');
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
		// this.init();
		console.log("this.isCanActive：",this.isContinueActive);
	},
	methods: {
		init() {
			console.log("this.currencyInfo_USDT",this.currencyInfo_USDT.contractDecmial);
			this.getBancelOf(this.currencyInfo_USDT.contractAbi, this.currencyInfo_USDT.contractAddress, this.currencyInfo_USDT.contractDecmial).then(result => {
				console.log('USDT数量：', result);
				this.using = result;
			});
			this.recordList = [];
			this.getUserProfitData();
		},
		isActive(){
			console.log("this.isCanActive：",this.isContinueActive);
			if(this.isContinueActive){
				this.openPopup('recordPopup');
				console.log("isContinueActive：",this.isContinueActive)
			}else{
				this.$tools.toast('您已激活');
			}
			
		},
		// 是否激活节点
		checkCanActiveNode() {
			if(this.canClick){
				this.canClick = false;
				this.$Ajax('/front/dapp/isCanActiveNode',{
						amount: this.activeNodeRule.quantity
					},
					res => {
						if (res.code == 0) {
							console.log("checkActive111",this.checkActive);
							this.getHashByTransfer(
								this.currencyInfo_USDT.contractAbi,
								this.currencyInfo_USDT.contractAddress,
								this.currencyInfo_USDT.contractDecmial,
								this.activeNodeRule.joinAddress,
								this.activeNodeRule.quantity
							).then(result => {
								this.douserActiveNode(result);
							});
						}
					}
				);
			}	
		},
		// 投票
		douserActiveNode(transactionHash){
			this.$Ajax('/front/dapp/userActiveNode',
				{
					hash: transactionHash,
					ruleId: this.activeNodeRule.id,
				},
				res => {
					if (res.code == 0) {
						this.hideLoading();
						this.hidePopup('recordPopup');
						this.$tools.toast('激活成功');
					}
				}
			);
		},
		// 用户取消激活节点
		cancelActiveNode(){
			this.$Ajax('/front/dapp/cancelActiveNode', {}, res => {
				if (res.code == 0) {
					this.hidePopup('recordPopup');
					this.$tools.toast('取消激活节点成功');
				}
			});
		},
		// 用户继续激活节点
		contiueActiveNode(){
			this.$Ajax('/front/dapp/contiueActiveNode', {}, res => {
				if (res.code == 0) {
					this.hidePopup('recordPopup');
					this.$tools.toast('继续激活节点成功');
				}
			});
		},
		// 节点奖励和个人奖励
		getUserProfitData() {
			this.$Ajax('/front/dapp/profit/getUserProfitData', {
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				type: this.tabActive
			}, res => {
				// console.log('捐赠项目：', res);
				if (res.code == 0) {
					this.activeNodeRule = res.obj.activeNodeRule;
					this.isCanActive = res.obj.isCanActive;
					this.isContinueActive = res.obj.isContinueActive;
					this.pages = res.obj.profitLog.pages;
					this.recordList = this.recordList.concat(res.obj.profitLog.list);
				}
			});
		},
		// 获取hash
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
		changeActive(index){
			if(this.tabActive != index){
				this.tabActive = index;
				this.pageNum = 1;
				this.recordList = [];
				this.getUserProfitData();
			}
		},
		changeCheckActive(index){
			if(this.checkActive != index){
				this.checkActive = index;
			}
		},
		newsListLower(e) {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底了');
			} else {
				this.pageNum++;
				this.getUserProfitData();
			}
		},
		showLoading() {
			this.$refs.loading.open();
		},
		hideLoading() {
			this.$refs.loading.close();
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
@import '/scss/record';
</style>
