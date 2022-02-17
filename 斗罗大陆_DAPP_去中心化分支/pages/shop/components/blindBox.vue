<template>
	<!-- 盲盒 -->
	<view class="blindBox">
		<scroll-view scroll-y="true" class="blindBox-wrapper">
			<view class="blindBox-plane">
				<view class="blindBox-price">单价：{{ $staticData.bindbox[tabsActive].price }}USDT</view>
				<view class="blindBox-icon"><image :src="$staticData.bindbox[tabsActive].pic" mode="widthFix"></image></view>

				<view class="blindBox-messageBox messageBox">
					<view class="messageBox-list" v-if="tabsActive == 1">
						可随机开出下列颜色卡排的其中一种<br/>
						<text style="color: #cccccc;">灰色(94%)、</text>
						<text style="color: #7624aa;">紫色(5%)、</text>
						<text style="color: #000000;">黑色(1%)</text>
					</view>
					<view class="messageBox-list" v-if="tabsActive == 2">
						可随机开出下列颜色卡排的其中一种<br/>
						<text style="color: #7624aa;">紫色(95%)、</text>
						<text style="color: #000000;">黑色(5%)</text>
					</view>
					<view class="messageBox-list" v-if="tabsActive == 3">
						可随机开出下列颜色卡排的其中一种<br/>
						<text style="color: #7624aa;">紫色(20%)、</text>
						<text style="color: #000000;">黑色(80%)</text>
					</view>
				</view>

				<view class="blindBox-calculateBox calculateBox">
					<view class="calculateBox-wrapper">
						<view class="calculateBox-list">
							<view class="calculateBox-btn calculateBox-btn--minus" @click="minusBtn()"></view>
							<view class="calculateBox-input"><input type="number" placeholder="0" placeholder-class="calculateBox-placeholder" v-model="quantity" /></view>
							<view class="calculateBox-btn calculateBox-btn--plus" @click="plusBtn()"></view>
						</view>
							<view class="calculateBox-result">总价: {{ $staticData.bindbox[tabsActive].price * quantity }}USDT</view>
					</view>
				</view>

				<view class="blindBox-buttonBox buttonBox">
					<view class="buttonBox-btn" :class="{ 'buttonBox-btn--active': allowanceValue >= ($staticData.bindbox[tabsActive].price * quantity) * Math.pow(10, 8) }" @click="approve()">{{ allowanceValue >= ($staticData.bindbox[tabsActive].price * quantity) * Math.pow(10, 8) ? '已授权' : '未授权' }}</view>
					<view class="buttonBox-btn buttonBox-btn--active" @click="buyUnkownBox()">购买</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: ['tabsActive'],
	data() {
		return {
			quantity: 1,
			allowanceValue: 0
		};
	},
	mounted() {
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
					clearInterval(obj);
		
					/* 事件 */
					this.allowance();
				}
			}, 100);
		})();
	},
	methods: {
		buyUnkownBox(){
			if (this.allowanceValue < this.$staticData.bindbox[this.tabsActive].price * this.quantity * Math.pow(10, 8)) {
				return this.$tools.toast('请先进行币种授权');
			}
			
			let parameter = [
				{
					type: 'uint256',
					value: this.$staticData.bindbox[this.tabsActive].id
				},
				{
					type: 'uint256',
					value: this.quantity
				}
			];
			
			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.proContractAddress, 'buyUnkownBox(uint256,uint256)', parameter).then(result => {
				uni.showLoading({
					title:'链上确认中',
					mask: true
				})
				this.$tronWeb.watchContractEvent(this.$store.state.usdtContractAddress, "Transfer").then(boolean=>{
					if(boolean){
						this.allowance();
						this.$emit('openPopup', 'successPopup');
					}else{
						this.$tools.toast('交易失败');
					}
					
					uni.hideLoading();
				});
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
					value: this.$store.state.proContractAddress
				}
			];

			this.$tronWeb
				.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.usdtContractAddress, 'allowance(address,address)', parameter)
				.then(result => {
					this.allowanceValue = window.tronWeb.toDecimal('0x' + result.constant_result[0]);
					console.log('当前授权币种数量 ---> ', this.allowanceValue);
				});
		},
		approve() {
			if (this.allowanceValue >= this.$staticData.bindbox[this.tabsActive].price * this.quantity * Math.pow(10, 8)) {
				return this.$tools.toast('已授权');
			}

			let parameter = [
				{
					type: 'address',
					value: this.$store.state.proContractAddress
				},
				{
					type: 'uint256',
					value: this.$staticData.bindbox[this.tabsActive].price * this.quantity * Math.pow(10, 8)
				}
			];

			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.usdtContractAddress, 'approve(address,uint256)', parameter).then(result => {
				uni.showLoading({
					title:'链上确认中',
					mask: true
				})
				this.$tronWeb.watchContractEvent(this.$store.state.usdtContractAddress, "Approval").then(boolean=>{
					if(boolean){
						this.$tools.toast('授权成功');
						this.allowance();
					}else{
						this.$tools.toast('授权失败');
					}
					
					uni.hideLoading();
				});
			});
		},
		minusBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			this.quantity++;
		},
		openPopup(e) {
			this.$emit('openPopup', e);
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/blindBox';
</style>
