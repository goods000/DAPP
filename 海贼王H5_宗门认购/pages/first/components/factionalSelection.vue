<template>
	<view class="factionalSelection">
		<view class="selection-image">
			<image :src="i18n.index.typeTitle" mode="widthFix"></image>
		</view>
		<view class="selection-box">
			<view class="selection-box__header">
				<image src="@/static/first/icon-first-headerBox.png" mode="widthFix"></image>
			</view>
			<view class="selection-box__item">
				<scroll-view scroll-y="true" class="selection-box__height">
					<view class="factional">
						<view class="factional-box" v-for="(item,index) in typeList" :key="index"
						@click="checkType(index,item.name,item.price)">
							<view class="factional-box__item">
								<view class="factional-box__item-box" :class="{'factional-box__item-box--active' : checkActive == index}">
									<view class="factional-box__item-box__name" :class="{'factional-box__item-box__name--active' : item.sold == 1}">{{ item.name }}</view>
								</view>
								<image v-if="checkActive == index" class="factional-box__item-image" src="@/static/first/active.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="subscription-head">
					<image :src="i18n.index.bottomTitle" mode="widthFix"></image>
				</view>
				<view class="subscription-box">
					<view class="subscription-box__tipsName">{{ i18n.index.checkTitle }}</view>
					<view class="subscription-box__name">“{{ checkName }}”</view>
					<view class="subscription-box__tips">{{ i18n.index.checkTips }}</view>
				</view>
				<view class="popupBox-btn subscription-margin">
					<!-- <view class="popupBox-btn__zore3" @click="getClick()">获取授权</view> -->
					<view class="popupBox-btn__style" @click="getBuy()">{{ i18n.index.btn }}</view>
				</view>
				<view class="subscription-data ">
					<view class="subscription-data__num">{{ i18n.index.pay }}：{{ price == '' ? '----' : price | number(2) }}USDT</view>
					<view class="subscription-data__num">{{ i18n.index.balance }}：{{ userWallet | number(2) }}USDT</view>
				</view>
				<view class="subscription-record" @click="openPopup('openRecord',gang)">{{ i18n.index.record }}</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			typeList:[
				{name:'罗杰海贼团',check:'1'},{name:'白胡子海贼团',check:'0'},{name:'百兽海贼团',check:'0'},{name:'BIG MOM 海贼团',check:'0'},{name:'红发海贼团',check:'0'},
				{name:'黑胡子海贼团',check:'1'},{name:'草帽海贼团',check:'0'},{name:'飞空海贼团',check:'0'},{name:'堂吉珂得海贼团',check:'1'},{name:'亚尔丽塔海贼团',check:'1'},
				{name:'巴基海贼团',check:'1'},{name:'黑猫海贼团',check:'1'},{name:'克利克海贼团',check:'0'},{name:'恶龙海贼团',check:'0'},{name:'巨人海贼团',check:'0'},
				{name:'白铁海贼团',check:'0'},{name:'贝拉米海贼团',check:'0'},{name:'福克西海贼团',check:'1'},{name:'新鱼人海贼团',check:'0'},{name:'乌普索海贼团',check:'0'},
				{name:'艾斯海贼团',check:'1'},{name:'四皇海贼团',check:'0'},{name:'心脏海贼团',check:'0'},{name:'小丑巴基海贼团',check:'1'},{name:'ON AIR海贼团',check:'1'},
				{name:'德雷克海贼团',check:'1'},{name:'破戒僧海贼团',check:'1'},{name:'基德海贼团',check:'0'},{name:'霍金斯海贼团',check:'0'},{name:'火焰坦克海贼团',check:'0'},
			],
			checkActive: 0,
			checkName: '',
			price: '',
			userWallet: '0.00',
			langType: '',
			gang: {},
		};
	},
	mounted() {
		console.log("window.tronWeb：",window.tronWeb);
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58 && this.$store.state.token) {
					clearInterval(obj);
					
					this.getTypeList();
					this.getBalance();
					this.getRecord();
				}
			}, 10);
		})();
	},
	// beforeMount() {
	// 	this.getTypeList();
	// 	this.getBalance();
	// },
	methods: {
		// 获取所有门派
		getTypeList() {
			this.$Ajax('/front/gang/list', {}, res=>{
				this.typeList = res.obj;
				if(this.checkName == ''){
					this.checkName = this.typeList[0].name;
				}
				if(this.price == ''){
					this.price = this.typeList[0].price;
				}
				console.log('typeList',this.typeList[0].name);
			})
		},
		// 查看自己的认购记录
		getRecord() {
			this.$Ajax(
				'/front/gang/address/info',{
					address: this.$store.state.userWalletAddress,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					// this.pages = res.obj.pages;
					// this.recordList = this.recordList.concat(res.obj.list);
					this.gang = res.obj;
					this.time = res.time;
					console.log(this.gang,111);
				}
			);
		},
		// 点击购买启动链上
		getBuy(){
			// this.openPopup('openSuccessfulSubscription');
			// if(uni.getStorageSync('userWalletAddress') == ''){
			// 	return this.$tools.toast(this.i18n.index.toast01);
			// }
			if(this.gang.gangName != ''){
				return this.$tools.toast(this.i18n.index.toast04);
			}
			if (this.typeList[this.checkActive].sold == 1) {
				return this.$tools.toast(this.i18n.index.toast02);
			}
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.gangContractAddress
				},
				{
					type: 'uint256',
					value: this.typeList[this.checkActive].price  * Math.pow(10, this.$store.state.usdtContractDecimal)
				}
			];
			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.usdtContractAddress, 'transfer(address,uint256)', parameter).then(result => {
				this.$store.commit('setFunctionQueue', ['buyGang', {
					hash: result.txid,
					id: this.typeList[this.checkActive].id
				}])
				
				uni.showLoading({
					title: this.i18n.index.OnConfirmation,
					mask: true
				});
			
				let timer = setInterval(() => {
					this.$tronWeb.getTransactionInfo(result.txid).then(transcationInfo => {
						console.log('transcationInfo ---> ', transcationInfo);
						if (transcationInfo != null && transcationInfo.receipt != null) {
							clearInterval(timer);
							uni.hideLoading();
			
							if (transcationInfo.receipt.result == 'SUCCESS') {
								this.submit(result.txid);
							} else {
								this.$tools.toast(this.i18n.index.toast03);
								this.$store.commit('deleteFunctionQueue', 'buyGang');
							}
						}
					});
				}, 1000);
			});
		},
		// 点击购买
		submit(hash){
			this.$Ajax(
				'/front/gang/buy',
				{
					hash: hash,
					id: this.typeList[this.checkActive].id
				},
				res => {
					this.$store.commit('deleteFunctionQueue', 'buyGang');
					
					this.openPopup('openSuccessfulSubscription',this.gang);
					this.typeList[this.checkActive].sold = 1;
					this.getBalance();
				}
			);
		},
		// 点击授权
		// getClick(){
		// 	this.$tools.toast('进来了',window.tronWeb);
		// 	console.log("window.tronWeb：",window.tronWeb);
		// 	if(uni.getStorageSync('userWalletAddress') == ''){
		// 		if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
		// 			this.$store.commit('changeUserWalletAddress', window.tronWeb.defaultAddress.base58);
		// 			this.$tools.toast('授权进来了');
		// 			// 查询链上余额
		// 			this.getBalance();
		// 		}
		// 	}else{
		// 		this.$tools.toast('你已授权成功');
		// 	}
		// },
		// 获取钱包余额
		getBalance(){
			this.$tronWeb.getContractBalance(this.$store.state.userWalletAddress, this.$store.state.usdtContractAddress, this.$store.state.usdtContractDecimal).then(result => {
				uni.showLoading({
					title: this.i18n.toast.InBalanceQuery,
					mask: true
				});
				console.log("result：",result);
				if(this.result != ''){
					this.userWallet = result;
					uni.hideLoading();
				}
				// this.$tools.toast('你已授权成功');
			});
		},
		checkType(index,name,price){
			if (this.checkActive != index) {
				this.checkActive = index;
				this.checkName = name;
				this.price = price;
				this.$Bus.$emit('checkName',this.checkName);
			}
		},
		openPopup(e, item) {
			this.$emit('openPopup', e, item);
		}
	}
}
</script>

<style lang="scss" scoped>
@import '/scss/factionalSelection';
</style>
