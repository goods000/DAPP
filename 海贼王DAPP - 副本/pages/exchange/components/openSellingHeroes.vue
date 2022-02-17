<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openSellingHeroes" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openSellingHeroes')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.exchange.openSellingHeroes.title }}</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">{{ i18n.exchange.openSellingHeroes.tips01 }}</view>
						<view class="popupBox-contentbg__info">
							<view class="popupBox-contentbg__cardImage">
								<view class="popupBox-contentbg__cardImage--bg" :class="{'popupBox-contentbg__cardImage--border' : chooseItem.pic}">
									<image v-if="chooseItem.pic" @click="chioce" src="@/static/public/icon-plus.png" mode="widthFix" class="popupBox-contentbg__cardImage--close"></image>
									<image :src="chooseItem.pic" mode="widthFix" class="popupBox-contentbg__cardImage--card" @click="chioce"></image>
								</view>
								<!-- <view class="popupBox-contentbg__imageNum">01/01</view> -->
								<view class="popupBox-contentbg__imageTitle" v-if="!chooseItem.pic">{{ i18n.exchange.openSellingHeroes.tips02 }}</view>
							</view>
						</view>
					</view>
					<view class="popupBox-contentbg__boxImage-title">{{ i18n.exchange.openSellingHeroes.tips03 }}：
						<view class="popupBox-contentbg__boxImage-title__num">{{ !chooseItem.pic ? '---' : chooseItem.role }}</view>
					</view>
					<view class="popupBox-cardTitle">{{ i18n.exchange.openSellingHeroes.tips04 }}</view>
					<!-- <view class="popupBox-chioceBox">
						<view class="popupBox-chioce" v-for="(item,index) in ruleList" :key="index"  @click="agreement(index,item.id,item.version)">
							<label class="popupBox-chioce__box" :class="[item.version ? 'popupBox-chioce__box--active' : '']">
								<view class="checkbox" ></view>
							</label>
							<view class="popupBox-chioce__title" :class="[item.version ? 'popupBox-chioce__title--active' : '']" v-if="index == 0">一口价</view>
							<view class="popupBox-chioce__title" :class="[item.version ? 'popupBox-chioce__title--active' : '']" v-if="index == 1">荷兰式拍卖</view>
							<view class="popupBox-chioce__title" :class="[item.version ? 'popupBox-chioce__title--active' : '']" v-if="index == 2">英式拍卖</view>
						</view>
					</view> -->
					<view class="popupBox-input">
						<input type="text" :placeholder="!chooseItem.pic ? '/' : i18n.exchange.openSellingHeroes.enter_toast" v-model="price" placeholder-class="popupBox-input__style" @input="numberFixedDigit"/>
						<view class="popupBox-input__unit">{{ $store.state.platmentCurrencyName }}</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__zore3" @click="hidePopup('openSellingHeroes')">{{ i18n.global.cancel }}</view>
						<view class="popupBox-btn__zore2" @click="transfer">{{ i18n.global.enter }}</view>
						<!-- <view class="popupBox-btn__grey" @click="transfer">挂单</view> -->
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['randomValue'],
	data() {
		return {
			checkActive: '',
			quantity: 10,
			price:'',
			heroImageTest:'@/static/package/icon-card.png',
			heroImage:'@/static/package/icon-card.png',
			ruleList:[{version: false},{version: false},{version: false},],
			chooseItem:{},
		};
	},
	watch: {
		randomValue(newValue) {
			this.init();
		},
	},
	mounted() {
		this.init();
		var that = this;
		that.$Bus.$on('chooseItem',function(chooseItem){
			that.chooseItem = chooseItem;
		})
	},
	methods: {
		init(e){
			console.log("chooseItem：",this.chooseItem.pic);
		},
		// 选择
		chioce(){
			this.$emit('openPopup', 'openPopupSelectHero');
		},
		transfer(){
			let that = this;
			if (!that.chooseItem.id) {
				return that.$tools.toast(this.i18n.exchange.openSellingHeroes.toast01);
			}
			if (that.price == '') {
				return that.$tools.toast(this.i18n.exchange.openSellingHeroes.toast02);
			}
			let parameter = [
				{
					type: 'uint256',
					value: this.chooseItem.id
				},
				{
					type: 'uint256',
					value: this.$BigNumber(this.price).times(Math.pow(10, this.$store.state.HBICContractDecimal)).toFixed()
				}
			];
			
			this.$tronWeb
				.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.marketTradeContractAddress, 'publish(uint256,uint256)', parameter)
				.then(result => {
					this.$store.commit('setFunctionQueue', ['publishCard', {
						hash: result.txid,
						pokerId: this.chooseItem.id
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
									this.publishCard(result.txid);
								} else {
									this.$tools.toast(this.i18n.exchange.openSellingHeroes.toast03);
									this.$store.commit('deleteFunctionQueue', 'publishCard');
								}
							}
						});
					}, 1000);
				});
		},
		publishCard(hash) {
			let that = this;
			that.$Ajax('/front/poker/publish',{
					hash: hash,
					pokerId: that.chooseItem.id,
				},
				res => {
					this.$emit('refreshData');
					this.$store.commit('deleteFunctionQueue', 'publishCard');
					that.hidePopup('openSellingHeroes');
					that.price = '';
					that.chooseItem.pic = '';
					that.$emit('openPopup', 'openSellingSuccess');
					that.$Bus.$emit('successItem',that.chooseItem);
				}
			);
		},
		agreement(i,fclId,version){
			// console.log("i：",i);
			this.ruleList.filter((item,j) => {
				if(i == j){
					item.version = !item.version;
					if(item.version == false){
						this.fclId = '';
					}else{
						this.fclId = fclId;
					}
				}else{
					item.version = 0;
					this.fclId == '';
				}
			})
		},
		numberFixedDigit(e) {
			// 只能输入整数
			e.target.value = e.target.value.replace(/^0|[^\d]|[.]/g, '');
			this.$nextTick(() => {
				this.price = e.target.value;
			});
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {
			this.chooseItem.pic = '';			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/pages/package/components/scss/openPopupBox';
@import 'scss/openSellingHeroes';
</style>
