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
			<view class="index-exchange">兑换</view>
			
			<view class="index-exchangeBox">
				<view class="index-headerBox">
					<view class="index-headerBox__item">
						<view class="index-headerBox__item-title">兑换</view>
						<image src="../../static/index/icon-index-time.png" @click="openRecord()" mode="" class="index-headerBox__item-time"></image>
					</view>
					<view class="index-headerBox__title">即时交易代币</view>
				</view>
				<view class="index-inputBox">
					<view class="index-inputBox__item">
						<view class="index-inputBox__item-title">从</view>
						<view class="index-inputBox__item-data">
							<input type="text" placeholder="0.0" placeholder-class="index-inputBox__item-data--input" v-model="formAddress"/>
							<view class="index-inputBox__item-data--tips">{{ PledgeRule.joinCurrencyName }}</view>
						</view>
					</view>
					<image src="../../static/public/icon-exchange.png" class="index-inputBox__exchange" mode=""></image>
					<view class="index-inputBox__item">
						<view class="index-inputBox__item-title">到</view>
						<view class="index-inputBox__item-data">
							<input type="text" placeholder="0.0" placeholder-class="index-inputBox__item-data--input" v-model="toAddress" disabled="disabled"/>
							<view class="index-inputBox__item-data--tips">{{ PledgeRule.backCurrencyName }}</view>
						</view>
					</view>
				</view>
				<view class="initButton">
					<view class="initButton-btn initButton-btn--green" @click="checkCanPledge()">兑换</view>
				</view>
			</view>
		</view>

		<uni-popup ref="recordPopup" type="center" :animation="true" @change="changePopup">
			<view class="recordBox">
				<view class="recordBox-wrapper">
					<view class="recordBox-header">
						<view class="recordBox-header__title">最近的交易</view>
						<image src="../../static/public/icon-close.png" class="recordBox-header__image" mode="" @click="hidePopup('recordPopup')"></image>
					</view>
					<view class="recordBox-form">
						<view class="recordBox-form__itemBox">
							<view class="recordBox-form__itemBox-checkBox">
								<view class="recordBox-form__itemBox-check" :class="{'recordBox-form__itemBox-check--active' : checkActive == 0}" @click="changeCheckActive(0)">
									<image :src="checkActive == 0 ? '../../static/index/icon-check.png' : '../../static/index/icon-noCheck.png'" mode="widthFix"></image>全部交易
								</view>
								<view class="recordBox-form__itemBox-check" :class="{'recordBox-form__itemBox-check--active' : checkActive == 1}" @click="changeCheckActive(1)">
									<image :src="checkActive == 1 ? '../../static/index/icon-check.png' : '../../static/index/icon-noCheck.png'" mode="widthFix"></image>进行中
								</view>
								<view class="recordBox-form__itemBox-check" :class="{'recordBox-form__itemBox-check--active' : checkActive == 3}" @click="changeCheckActive(3)">
									<image :src="checkActive == 3 ? '../../static/index/icon-check.png' : '../../static/index/icon-noCheck.png'" mode="widthFix"></image>已结束
								</view>
							</view>
							<view class="initNoData" v-if="recordList.length == 0">暂无交易</view>
							<scroll-view :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto" @scrolltolower="newsListLower" class="recordBox-form__height">
							<view class="recordBox-form__item" v-for="(item,index) in recordList" :key="index">
								<view class="recordBox-form__item-label">
									<image src="../../static/index/icon-record-tips.png" class="recordBox-form__item-label--image" mode="widthFix"></image>
									<view class="recordBox-form__item-label__title">{{item.joinCurrencyName}}-{{item.backCurrencyName}}</view>
								</view>
								<view class="recordBox-form__item-data dataItem">
									<view class="recordBox-dataItem">
										<view class="recordBox-dataItem__item">
											<view class="recordBox-dataItem__item-title">兑换：</view>
											<view class="recordBox-dataItem__item-title">赚取：</view>
										</view>
										<view class="recordBox-dataItem__item">
											<view class="recordBox-dataItem__item-title"><text>{{item.quantity}} </text>{{item.joinCurrencyName}}</view>
											<view class="recordBox-dataItem__item-title"><text>{{item.backQuantity}} </text>{{item.backCurrencyName}}</view>
										</view>
										<view class="recordBox-dataItem__item">
											<image src="../../static/index/icon-record-next.png" class="recordBox-dataItem__item-image" mode="widthFix"></image>
										</view>
									</view>
								</view>
								<view class="recordBox-form__item-btn">
									<view class="recordBox-form__item-btn--style" v-if="item.txStatus == 1">进行中</view>
									<view class="recordBox-form__item-btn--end" v-if="item.txStatus == 3">已结束</view>
								</view>
							</view>
							</scroll-view>
						</view>
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
							<view class="initMenuDrawerBox-listBox__list initMenuDrawerBox-listBox__list--active">
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
							<view class="initMenuDrawerBox-wallet__data">${{ using_USDT }}</view>
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
			menuDrawerWidth: uni.upx2px(600),

			/* Web3.js */
			web3: null, //web3容器
			parentAddress: '',
			formAddress:'',
			toAddress:'',
			checkActive: 0,
			scrollInto: "",
			poolContractInfo: {}, // 币种合约配置信息
			
			/* 容器 */
			using_USDT:0,
			currencyInfo: [],
			PledgeRule:'', //规则
			pageNum: 1,
			pageSize: 20,
			page: 1,
			recordList:[],
			currencyInfo_USDT:{},
			name:'',
			canClick: true //避免点击过快/点击多次
		};
	},
	watch:{
		formAddress(){
			if(this.num == ''){
				this.toAddress = 0;
			}else{
				this.toAddress = this.formAddress * this.PledgeRule.backCurrencyRate;
			}
		}
	},
	onLoad(hash) {
		if (hash) {
			this.parentAddress = hash.leaderName;
		}
	},
	onShow() {
		this.totalPageInfo = getCurrentPages();
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
						this.addressLogin();
					}
				});
			} catch (error) {
				if (error.code === 4001) {
					// User rejected request
				}
			}
		}
		this.init();
	},
	methods: {
		init() {
			// this.getCurrencyContractInfo();
		},
		async addressLogin() {
			this.$Ajax('/front/tokenLogin',
				{
					userWalletAddress: this.$store.state.userWalletAddress,
					parentAddress: this.parentAddress,
				},
				res => {
					// console.log('账户信息：', res);
					if (res.code == 0) {
						this.name = res.obj.name;
						this.$store.commit('changeToken', res.obj.token);
						uni.setStorageSync('token', res.obj.token);
						this.getCurrencyContractInfo().then(() => {
							this.getBancelOf(this.currencyInfo_USDT.contractAbi, this.currencyInfo_USDT.contractAddress, this.currencyInfo_USDT.contractDecmial).then(result => {
								console.log('USDT可用数量：', result);
								this.using_USDT = result;
							});
							this.getBancelOf(this.currencyInfo_PID.contractAbi, this.currencyInfo_PID.contractAddress, this.currencyInfo_PID.contractDecmial).then(result => {
								console.log('PID可用数量：', result);
								this.using_PID = result;
							});
						});
						this.getPledgeRule();  //获取兑换规则
						this.getInvitationLink();  //获取邀请码
					}
				}
			);
		},
		// 币种合约配置信息
		getCurrencyContractInfo() {
			let data = new Promise((resolve, reject) => {
				this.$Ajax('/front/dapp/pool/getCurrencyContract', {}, res => {
					// console.log('币种合约配置信息：', res);
					if (res.code == 0) {
						this.currencyInfo = res.obj;
						// this.$store.commit('changecurrencyInfo', this.currencyInfo);
						// uni.setStorageSync('currencyInfo', this.currencyInfo);
						this.currencyInfo_USDT = res.obj[0];
						this.currencyInfo_USDT.contractAbi = JSON.parse(JSON.parse(JSON.stringify(this.currencyInfo_USDT)).contractAbi);
						this.$store.commit('changecurrencyInfo_USDT', this.currencyInfo_USDT);
						uni.setStorageSync('currencyInfo_USDT', this.currencyInfo_USDT);
						this.currencyInfo_PID = res.obj[1];
						this.currencyInfo_PID.contractAbi = JSON.parse(JSON.parse(JSON.stringify(this.currencyInfo_PID)).contractAbi);
						this.$store.commit('changecurrencyInfo_PID', this.currencyInfo_PID);
						uni.setStorageSync('currencyInfo_PID', this.currencyInfo_PID);
						resolve();
					}
				});
			});
			return data;
		},
		// 发起兑换
		checkCanPledge() {
			if (this.formAddress == '') {
				return this.$tools.toast('请输入您的兑换数量');
			}
			if(this.canClick){
				this.canClick = false;
				this.$Ajax('/front/dapp/pledge/isCanJoinPool',{
						amount: this.formAddress
					},
					res => {
						// console.log('能否能够兑换信息：', res);
						if (res.code == 0) {
							this.getHashByTransfer(
								this.currencyInfo_USDT.contractAbi,
								this.currencyInfo_USDT.contractAddress,
								this.currencyInfo_USDT.contractDecmial,
								this.PledgeRule.joinInAddress,
								this.formAddress
							).then(result => {
								console.log("111",result)
								this.doPledge(result);
							});
						}
					}
				);
			}	
		},
		// 兑换
		doPledge(transactionHash){
			this.$Ajax('/front/dapp/pledge/joinPool',
				{
					address: this.$store.state.userWalletAddress,
					hashAddress: transactionHash,
					amount: this.formAddress,
				},
				res => {
					// console.log('兑换成功信息：', res);
					if (res.code == 0) {
						this.formAddress = '';
						this.hideLoading();
						this.$tools.toast('兑换成功');
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
		// 获取兑换规则
		getPledgeRule(){
			this.$Ajax('/front/dapp/pool/getPledgeRule',{},
				res => {
					// console.log('获取兑换规则：', res);
					if (res.code == 0) {
						this.PledgeRule = res.obj;
					}
				}
			);
		},
		// 获取邀请码
		getInvitationLink(){
			this.$Ajax('/front/user/getInvitationLink',{},
				res => {
					// console.log('获取邀请码：', res);
					if (res.code == 0) {
						this.inviteCode = res.obj + '?leaderName=' + this.name;
						uni.setStorageSync('inviteCode',this.inviteCode);
					}
				}
			);
		},
		openRecord(){
			this.checkActive = 0;
			this.pageNum = 1;
			this.recordList = [];
			this.openPopup('recordPopup');
			this.getPledgeRecord();
		},
		// 兑换记录
		getPledgeRecord(){
			this.$Ajax('/front/dapp/pledge/getPledgeRecord',{
				pageNum:this.pageNum,
				pageSize:this.pageSize,
				type:this.checkActive,
			},
				res => {
					// console.log('规则记录：', res);
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.recordList = this.recordList.concat(res.obj.list);
					}
				}
			);
		},
		newsListLower(e) {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底了');
			} else {
				this.pageNum++;
				this.getPledgeRecord();
			}
		},
		async getBancelOf(contractAbi, contractAddress, contractDecimal) {
			let myContract = await new this.web3.eth.Contract(contractAbi, contractAddress);
			let result = await myContract.methods.balanceOf(this.$store.state.userWalletAddress).call();
			result = result / Math.pow(10, contractDecimal);
			return result;
		},
		changeCheckActive(index){
			if(this.checkActive != index){
				this.checkActive = index;
				this.pageNum = 1;
				this.recordList = [];
				this.getPledgeRecord();
			}
		},
		openPopup(e, item) {
			console.log(e);
			if (e == 'activationPopup' && this.isActivated) {
				return;
			}

			if (e == 'takeBackPopup') {
				this.tradeCurrencyInfo = item;
			}

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

			if (this.totalPageInfo[this.totalPageInfo.length - 2]) {
				prevPath = this.totalPageInfo[this.totalPageInfo.length - 2].route.split('pages/')[1];
			}

			let toPath = path.split('../')[1];

			uni.setStorageSync('platformCurrencyInfo', this.platformCurrencyInfo);

			if (prevPath == toPath) {
				this.$tools.back(1);
			} else {
				this.closeDrawer('menuDrawer');
				this.$tools.jump(path);
			}
		},
		showLoading() {
			this.$refs.loading.open();
		},
		hideLoading() {
			this.$refs.loading.close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/index';
page,.pages{
	background: #DEF3EA;
}
</style>
