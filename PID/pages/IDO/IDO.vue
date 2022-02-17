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
				<view class="voteMain-title">IDO:捐赠</view>
				<view class="voteMain-tips">使用全新的代币销售模型交换新代币</view>
			</view>
			<view class="voteNav">
				<view class="voteNav-active">首页</view>
				<image src="../../static/vote/icon-vote-next.png" class="voteNav-image" mode="widthFix"></image>
				<view class="voteNav-title">捐赠</view>
			</view>
			<view class="voteTitle">IDO:捐赠</view>
			
			<view class="voteBox">
				<view class="voteBox-header">
					<view class="voteBox-header__item" :class="{'voteBox-header__item--active' : tabActive == 2}" @click="changeActive(2)">
						<view class="voteBox-header__title" :class="{'voteBox-header__title--active' : tabActive == 2}">当期IDO</view>
					</view>
					<view class="voteBox-header__item" :class="{'voteBox-header__item--active' : tabActive == 3}" @click="changeActive(3)">
						<view class="voteBox-header__title" :class="{'voteBox-header__title--active' : tabActive == 3}">往期IDO</view>
					</view>
				</view>
				<view class="IDOBox-list">
					<view class="initNoData initNoData-noPadding" v-if="recordList.length == 0">暂无数据</view>
					<scroll-view :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto" @scrolltolower="newsListLower" class="IDOBox-height">
						<view class="IDOBox-list__item" v-for="(item,index) in recordList" :key="index">
							<image v-if="tabActive == 2" class="IDOBox-list__item-open" src="../../static/IDO/icon-ido-open.png" mode="widthFix"></image>
							<image v-if="tabActive == 3" class="IDOBox-list__item-open" src="../../static/IDO/icon-ido-end.png" mode="widthFix"></image>
							<view class="IDOBox-list__item-title">
								<image class="IDOBox-list__item-title--image" :src="item.donationCurrencyImg" mode="widthFix"></image>
								{{ item.donationCurrencyName }}
								<view class="IDOBox-list__item-next" @click="triggerCollapse(index)">
									<image :class="navigateFlag[index].show ? 'IDOBox-list__item-next--active' : ''" src="../../static/IDO/icon-ido-se.png" mode="widthFix"></image>
								</view>
							</view>
							<!-- 兑换 -->
							<view class="IDOBox-exchangeBox" v-if="tabActive == 2 && navigateFlag[index].show">
								<view class="IDOBox-exchangeBox__Box">
									<view class="index-headerBox">
										<view class="index-headerBox__item">
											<view class="index-headerBox__item-title">兑换</view>
										</view>
										<view class="index-headerBox__title">即时交易代币</view>
									</view>
									<view class="index-inputBox">
										<view class="index-inputBox__item">
											<view class="index-inputBox__item-title">从</view>
											<view class="index-inputBox__item-data">
												<input type="text" placeholder="0.0" placeholder-class="index-inputBox__item-data--input" v-model="formAddress"/>
												<view class="index-inputBox__item-data--tips">{{ item.donationCurrencyName }}</view>
											</view>
										</view>
										<image src="../../static/public/icon-exchange.png" class="index-inputBox__exchange" mode=""></image>
										<view class="index-inputBox__item">
											<view class="index-inputBox__item-title">到</view>
											<view class="index-inputBox__item-data">
												<input type="text" placeholder="0.0" placeholder-class="index-inputBox__item-data--input" disabled="disabled" :value="(formAddress * item.donationQuantityRate)"/>
												<view class="index-inputBox__item-data--tips">{{ item.donationBackCurrencyName }}</view>
											</view>
										</view>
									</view>
									<view class="initButton">
										<view class="initButton-btn initButton-btn--green" @click="confirmDonation(item,index)">兑换</view>
									</view>
								</view>
							</view>
							<!-- 过期记录 -->
							<view class="IDOBox-exchangeBox" v-if="tabActive == 3 && navigateFlag[index].show">
								<view class="IDOBox-exchangeBox__Box">
									<view class="recordBox-form__item IDOBox-exchangeBox__Box-padding" style="padding: 80upx 60upx">
										<view class="recordBox-form__item-label">
											<view class="recordBox-image">
												<image :src="item.donationCurrencyImg" class="recordBox-image__image" mode="widthFix"></image>
												<image :src="item.donationBackCurrencyImg" class="recordBox-image__image" mode="widthFix"></image>
											</view>
											<view class="recordBox-form__item-label__title">{{ item.donationCurrencyName }}-{{ item.donationBackCurrencyName }}</view>
										</view>
										<view class="recordBox-form__item-data dataItem">
											<view class="recordBox-dataItem">
												<view class="recordBox-dataItem__item">
													<view class="recordBox-dataItem__item-title">兑换：</view>
													<view class="recordBox-dataItem__item-title">赚取：</view>
												</view>
												<view class="recordBox-dataItem__item">
													<view class="recordBox-dataItem__item-title"><text>{{ item.donationCNum }} </text>{{ item.donationCurrencyName }}</view>
													<view class="recordBox-dataItem__item-title"><text>{{ item.donationBackNum }} </text>{{ item.donationBackCurrencyName }}</view>
												</view>
											</view>
										</view>
										<view class="recordBox-form__item-btn">
											<view class="recordBox-form__item-btn--style" v-if="item.participate">已参与</view>
											<view class="recordBox-form__item-btn--end" v-else>未参与</view>
										</view>
									</view>
								</view>
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
							<view class="initMenuDrawerBox-listBox__list" @click="closeDrawerToPath('../vote/vote')">
								<view class="initMenuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-list-05.png" mode="widthFix"></image></view>
								<view class="initMenuDrawerBox-listBox__list-label">投票</view>
							</view>
							<view class="initMenuDrawerBox-listBox__list initMenuDrawerBox-listBox__list--active" @click="closeDrawerToPath('../IDO/IDO')">
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
			currencyUsing: 0,
			
			tabActive:2,
			checkActive: 0,
			scrollInto:'',
			// navigateFlag: false,
			navigateFlag: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
			formAddress:'',
			toAddress:'',
			formName:'',
			toName:'',
			using: 0,
			pageNum: 1,
			pageSize: 20,
			page: 1,
			recordList:[],
			canClick: true //避免点击过快/点击多次
		};
	},
	// watch:{
	// 	formAddress(){
	// 		if(this.num == ''){
	// 			this.toAddress = 0;
	// 		}else{
	// 			this.toAddress = this.formAddress * this.PledgeRule.backCurrencyRate;
	// 		}
	// 	}
	// },
	onShow() {
		// this.navigateFlag = false;
		this.totalPageInfo = getCurrentPages();
		this.currencyInfo_USDT = uni.getStorageSync('currencyInfo_USDT');
		this.currencyInfo_PID = uni.getStorageSync('currencyInfo_PID');
		this.inviteCode = uni.getStorageSync('inviteCode');
		this.recordList = [];
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
	},
	methods: {
		init() {
			console.log("this.currencyInfo_USDT",this.currencyInfo_USDT.contractDecmial);
			this.getBancelOf(this.currencyInfo_USDT.contractAbi, this.currencyInfo_USDT.contractAddress, this.currencyInfo_USDT.contractDecmial).then(result => {
				console.log('USDT数量：', result);
				this.using = result;
			});
			this.getDonationData();
		},
		// 捐赠项目列表
		getDonationData() {
			this.$Ajax('/front/dapp/donation/getDonationData', {
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				type: this.tabActive
			}, res => {
				// console.log('捐赠项目：', res);
				if (res.code == 0) {
					this.pages = res.obj.pages;
					this.recordList = this.recordList.concat(res.obj.list);
				}
			});
		},
		// 捐赠请求
		confirmDonation(item,index){
			if (this.formAddress == '') {
				return this.$tools.toast('请输入捐赠数量');
			}
			if(this.canClick){
				this.canClick = false;
				this.getHashByTransfer(
					this.currencyInfo_USDT.contractAbi,
					this.currencyInfo_USDT.contractAddress,
					this.currencyInfo_USDT.contractDecmial,
					item.donationInAddress,
					this.formAddress
				).then(result => {
					this.doDonation(result,item,index);
				});
			}
		},
		// 捐赠操作
		doDonation(hashAddress, item, index) {
			this.$Ajax('/front/dapp/donation/doDonation',{
					donationId: item.id,
					hash: hashAddress,
					amount: this.formAddress
				},
				res => {
					console.log('捐赠操作：', res);
					if (res.code == 0) {
						this.formAddress = '';
						this.hideLoading();
						this.$tools.toast('捐赠操作成功');
					}
				}
			);
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
		triggerCollapse(index) {
			console.log("navigateFlag：",index,this.navigateFlag[index].show)
			// this.navigateFlag = !this.navigateFlag;
			this.navigateFlag[index].show = !this.navigateFlag[index].show;
		},
		changeActive(index){
			if(this.tabActive != index){
				this.tabActive = index;
				this.pageNum = 1;
				this.recordList = [];
				this.getDonationData();
			}
		},
		newsListLower(e) {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底了');
			} else {
				this.pageNum++;
				this.getDonationData();
			}
		},
		changeCheckActive(index){
			if(this.checkActive != index){
				this.checkActive = index;
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
@import '/scss/IDO';
@import '../index/scss/index';
.recordBox{
	&-image{
			width: 70upx;
			height: 70upx;
			margin-right:16upx;
			// border-radius: 50%;
		&__image{
			width: 45upx;
			height: 45upx;
			&:nth-child(2){
				margin-top: -15upx;
				margin-left: 25upx;
			}
		}
	}
}
</style>
