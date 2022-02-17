<template>
	<view class="initListBox-market">
		<view class="initListBox-header">
			<image :src="require(`@/static/shop/icon-shopTab-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
		</view>
		<view class="initListBox-wrapper">
			<view class="shop" v-for="(item,index) in boxList" :key="index" v-if="index == indexImage">
				<view class="shop-goodsBox">
					<view class="shop-goodsBox__btn" @click="upBtn()">
						<image src="@/static/shop/icon-shop-leftBtn.png" mode="widthFix"></image>
					</view>
					<view class="shop-goodsBox__item">
						<image :src="item.pic" mode="widthFix" ></image>
						<!-- <image src="@/static/shop/icon-goods-01.png" mode="widthFix" v-if="item.name == '初级盲盒'"></image>
						<image src="@/static/shop/icon-goods-02.png" mode="widthFix" v-if="item.name == '中级盲盒'"></image>
						<image src="@/static/shop/icon-goods-03.png" mode="widthFix" v-if="item.name == '高级盲盒'"></image> -->
					</view>
					<view class="shop-goodsBox__btn" @click="nextBtn()">
						<image src="@/static/shop/icon-shop-rightBtn.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="shop-details">
					<view class="shop-details__nameZh">{{ item.name }}</view>
					<!-- <view class="shop-details__nameZh" v-if="indexImage == 0">普通盲盒</view>
					<view class="shop-details__nameZh" v-if="indexImage == 1">中级盲盒</view>
					<view class="shop-details__nameZh" v-if="indexImage == 2">高级盲盒</view> -->
					<view class="shop-details__nameEn" v-if="item.name == '初级盲盒'">Ordinary blind box</view>
					<view class="shop-details__nameEn" v-if="item.name == '中级盲盒'">Intermediate blind box</view>
					<view class="shop-details__nameEn" v-if="item.name == '高级盲盒'">Senior blind box</view>
					<view class="shop-details__titleBox">
						<text class="shop-details__titleBox-tips1">{{ item.name }}{{ i18n.shop.tips01 }}</text>
						<text class="shop-details__titleBox-tips2">{{ i18n.shop.tips02 }}{{ item.gray }}%、</text>
						<text class="shop-details__titleBox-tips3">{{ i18n.shop.tips03 }}{{ item.purple }}%、</text>
						<text class="shop-details__titleBox-tips4">{{ i18n.shop.tips04 }}{{ item.black }}%</text>
					</view>
				</view>
				
				<view class="popupBox-cardTips">{{ i18n.shop.PurchaseQuantity }}</view>
				<view class="popupBox-operate">
					<view class="popupBox-operate__btn" @click="reduceBtn()">
						<image src="@/static/public/icon-reduce.png" mode="widthFix"></image>
					</view>
					<view class="popupBox-operate__num">{{ quantity }}</view>
					<view class="popupBox-operate__btn" @click="plusBtn()">
						<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
					</view>
				</view>
				
				<view class="popupBox-btn">
					<!-- <view class="popupBox-btn__zore1":class="{ 'popupBox-btn__zore3': platmentBalance > 0 }" @click="approve()">
						{{ platmentBalance > 0 ? i18n.index.pledgeMiningPopup.btn_02 : i18n.global.Authorization }}
					</view>
					<view class="popupBox-btn__zore2" @click="getBuy()">{{ i18n.shop.Buy }}</view> -->
					<view class="popupBox-btn__style" @click="getBuy()">{{ i18n.shop.Buy }}</view>
				</view>
				<view class="shop-data">
					<view class="shop-data__num">{{ i18n.shop.price }}：{{ item.dlbPrice | number(2) }}  {{ $store.state.platmentCurrencyName }}</view>
					<view class="shop-data__num">{{ i18n.shop.total }}：{{ quantity*item.dlbPrice  | number(3) }}  {{ $store.state.platmentCurrencyName }}</view>
					<view class="shop-data__num">{{ $store.state.platmentCurrencyName }}{{ i18n.global.money }}：{{ platmentBalance }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props:{
		// boxList: Array,
		tabActive: Number,
	},
	// props:['boxList'],
	data() {
		return {
			boxList:[],
			indexImage: 0,
			boxCount: 0,
			quantity: 1,
			total: 0,
			userWallet: '',
			allowanceValue:0,
			platmentBalance: 0
		};
	},
	mounted() {
		this.getBoxList();
		this.getCardBoxCount();
		this.getPlatmentBalance();
	},
	methods: {
		// 盲盒列表
		getBoxList() {
			this.$Ajax('/front/ubx/list', {}, res => {
				this.boxList = res.obj;
				this.getTotal();
			});
		},
		// 获取盲盒总数
		getCardBoxCount(){
			this.$Ajax('/front/ubx/resume', {}, res => {
				this.boxCount = res.obj;
			});
		},
		getPlatmentBalance() {
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.userWalletAddress
				}
			];
			this.$tronWeb.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.HBICContractAddress, 'balanceOf(address)', parameter).then(result => {
				this.platmentBalance = window.tronWeb.toDecimal('0x' + result.constant_result[0]) / Math.pow(10, this.$store.state.HBICContractDecimal);
				console.log('platmentBalance币种数量 ---> ', this.platmentBalance);
			});
		},
		allowance() {
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.userWalletAddress
				},
				{
					type: 'address',
					value: this.$store.state.marketTradeContractAddress
				}
			];
			this.$tronWeb
				.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.HBICContractAddress, 'allowance(address,address)', parameter)
				.then(result => {
					this.allowanceValue = window.tronWeb.toDecimal('0x' + result.constant_result[0]);
					console.log('当前授权币种数量 ---> ', this.allowanceValue);
				});
		},
		approve() {
			if (this.allowanceValue > 0) {
				return this.$tools.toast(this.i18n.index.pledgeMiningPopup.btn_02);
			}
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.marketTradeContractAddress
				},
				{
					type: 'uint256',
					value: this.$BigNumber(100000000).times(Math.pow(10, this.$store.state.HBICContractDecimal)).toFixed()
				}
			];
			this.$tronWeb
				.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.HBICContractAddress, 'approve(address,uint256)', parameter)
				.then(result => {
					uni.showLoading({
						title: this.i18n.toast.OnConfirmation,
						mask: true
					});
		
					let timer = setInterval(() => {
						this.$tronWeb.getTransactionInfo(result.txid).then(transcationInfo => {
							console.log('transcationInfo ---> ', transcationInfo);
							if (transcationInfo != null && transcationInfo.receipt != null) {
								clearInterval(timer);
								uni.hideLoading();
		
								if (transcationInfo.receipt.result == 'SUCCESS') {
									this.$tools.toast(this.i18n.index.pledgeMiningPopup.toast_04);
									this.allowance();
								} else {
									this.$tools.toast(this.i18n.index.pledgeMiningPopup.toast_05);
								}
							}
						});
					}, 1000);
				});
		},
		// 获取总金额
		getTotal(){
			this.boxList.forEach((item,index) =>{
				if(index == this.indexImage){
					this.total = item.dlbPrice*this.quantity;
				}
			})
		},
		// 点击购买启动链上
		getBuy(){
			if (this.allowanceValue > 0) {
				return this.$tools.toast(this.i18n.index.pledgeMiningPopup.btn_02);
			}
			// console.log("quantity",this.quantity,this.boxList[this.indexImage].total,this.boxList[this.indexImage].qty);
			if (this.quantity > this.boxCount || this.quantity > this.boxList[this.indexImage].total - this.boxList[this.indexImage].qty) {
				return this.$tools.toast(this.i18n.shop.toast01);
			}
			
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.incomeContractAddress
				},
				{
					type: 'uint256',
					// value: this.total * Math.pow(10, this.$store.state.HBICContractDecimal)
					value: this.$BigNumber(this.total).times(Math.pow(10, this.$store.state.HBICContractDecimal)).toFixed()
				}
			];
			
			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.HBICContractAddress, 'transfer(address,uint256)', parameter).then(result => {
				this.$store.commit('setFunctionQueue', ['buyBox', {
					hash: result.txid,
					id: this.boxList[this.indexImage].id,
					qty: this.quantity
				}])
				
				uni.showLoading({
					title: this.i18n.toast.OnConfirmation,
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
								this.$tools.toast(this.i18n.shop.toast02);
								this.$store.commit('deleteFunctionQueue', 'buyBox');
							}
						}
					});
				}, 1000);
			});
		},
		submit(hash) {
			this.$Ajax('/front/ubx/buy',{
					hash: hash,
					id: this.boxList[this.indexImage].id,
					qty: this.quantity
				},
				res => {
					this.$store.commit('deleteFunctionQueue', 'buyBox');
					this.getPlatmentBalance();
					this.$emit('openPopup', 'openShopBuySuccess');
					let successData = {
						quantity: this.quantity,
						name: this.boxList[this.indexImage].name,
					}
					this.$Bus.$emit('successData',successData);
				}
			);
		},
		upBtn() {
			this.quantity = 1;
			if (this.indexImage == 0) {
				this.indexImage = (this.boxList.length-1);
				this.getTotal();
			}else{
				this.indexImage --;
				this.getTotal();
			}
		},
		nextBtn() {
			this.quantity = 1;
			// console.log("this.boxList.length：",this.boxList.length,"---this.indexImage：",this.indexImage);
			if((this.boxList.length-1) == this.indexImage){
				this.indexImage = 0;
				this.getTotal();
			}else{
				this.indexImage++;
				this.getTotal();
			}
		},
		reduceBtn() {
			if (this.quantity > 1) {
				this.quantity--;
				this.getTotal();
			}
		},
		plusBtn() {
			this.quantity++;
			this.getTotal();
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
@import 'scss/shopMarket';
.initListBox{
	&-header{
		top: -90upx;
	}
}
</style>