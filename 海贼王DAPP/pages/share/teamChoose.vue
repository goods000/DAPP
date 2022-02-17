<template>
	<view class="pages">
		<view class="main">
			<view class="teamChoose">
				<view class="teamChoose-title" :class="{'teamChoose-title--en' : $store.state.initLanguage == 'en'}">
					<image :src="require(`@/static/share/icon-share-teamTitle-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
				</view>
				<scroll-view scroll-y="true" class="teamChoose-height">
					<view class="teamChoose-wrapper">
						<view class="teamChoose-item" v-for="(item,index) in teamList" :key="index" @click="checkType(index,item.name,item.price)">
							<view class="teamChoose-item__box" :class="{'teamChoose-item__box--active' : checkActive == index}">
								<view class="teamChoose-item__box-title" :class="{'teamChoose-item__box-title--active' : item.sold == 1}">{{ item.name }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="teamChoose-btn">
					<view class="teamChoose-btn__style" @click="$tools.back()">{{ i18n.index.btn01 }}</view>
					<!-- <view class="teamChoose-btn__style" @click="getBuy()">确定</view> -->
					<view class="teamChoose-btn__style" @click="joinGang()">{{ i18n.global.enter }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loadingShow: true,
			teamList:[],
			checkActive: 0,
			checkName: '',
			price: '',
		};
	},
	onShow() {
		// this.$tools.toast("进来了",this.$store.state.token);
		console.log("window.tronWeb：",window.tronWeb);
		// (async () => {
		// 	var obj = setInterval(async () => {
		// 		if (window.tronWeb && window.tronWeb.defaultAddress.base58 && this.$store.state.token) {
		// 			clearInterval(obj);
					
		// 			if(window.location.search.indexOf('address=') > -1){
		// 				this.locationSearch = window.location.search.split('?address=')[1].substring(0, 34);
		// 			}
		// 			this.init();
		// 		}
		// 	}, 10);
		// })();
		this.init();
	},
	methods: {
		init(){
			// this.$tools.toast("进来了1111");
			this.getTeamList();
		},
		// 获取所有门派
		getTeamList() {
			this.$Ajax('/front/gang/list', {}, res=>{
				this.teamList = res.obj;
				if(this.checkName == ''){
					this.checkName = this.teamList[0].name;
				}
				if(this.price == ''){
					this.price = this.teamList[0].price;
				}
				console.log('teamList',this.teamList[0].name);
			})
		},
		joinGang() {
			// this.openPopup('openSuccessfulSubscription');
			this.$Ajax('/front/gang/join',{
					id: this.teamList[this.checkActive].id
				},
				res => {
					this.$tools.toast(this.i18n.share.toast01);
					this.teamList[this.checkActive].sold = 1;
					this.$tools.jump('../index/index');
				}
			);
		},
		// 点击购买启动链上
		getBuy(){
			if(uni.getStorageSync('userWalletAddress') == ''){
				return this.$tools.toast(this.i18n.share.toast02);
			}
			if (this.teamList[this.checkActive].sold == 1) {
				return this.$tools.toast(this.i18n.share.toast03);
			}
			
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.gangContractAddress
				},
				{
					type: 'uint256',
					value: this.teamList[this.checkActive].price * Math.pow(10, 8)
				}
			];
			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.HBICContractAddress, 'transfer(address,uint256)', parameter).then(result => {
				this.$store.commit('setFunctionQueue', ['buyGang', {
					hash: result.txid,
					id: this.teamList[this.checkActive].id
				}])
				
				uni.showLoading({
					title: this.i18n.global.loading,
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
								this.$tools.toast(this.i18n.share.toast04);
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
					address: this.$store.state.userWalletAddress,
					hash: hash,
					id: this.teamList[this.checkActive].id
				},
				res => {
					this.$store.commit('deleteFunctionQueue', 'buyGang');
					this.openPopup('openSuccessfulSubscription');
					this.teamList[this.checkActive].sold = 1;
				}
			);
		},
		checkType(index,name,price){
			if (this.checkActive != index) {
				this.checkActive = index;
				this.checkName = name;
				this.price = price;
				this.$Bus.$emit('checkName',this.checkName);
			}
		},
		openPopup(e) {
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script> 

<style lang="scss" scoped>
@import '/scss/teamChoose';
</style>
