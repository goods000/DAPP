<template>
	<!-- 英雄卡组 -->
	<view class="cardBox">
		<scroll-view scroll-y="true" class="cardBox-wrapper">
			<view class="cardBox-plane">
				<view class="cardBox-item" v-for="(item, index) in cardList" :key="index" @click="openPopup('cardPopup', item)">
					<view class="cardBox-item__header">
						<view class="cardBox-item__card"><image :src="item.pic" mode="widthFix"></image></view>
						<!-- <view class="cardBox-item__gradBg" :class="index % 2 == 0 ? 'cardBox-item__gradBg--style5' : 'cardBox-item__gradBg--style4'">
							<view class="cardBox-item__power">{{ $staticData.color[item.color].baseHashRate }}</view>
						</view> -->
					</view>
					<view class="cardBox-item__content"><view class="cardBox-item__title">{{ $staticData.card[item.type] }}</view></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			demoImg1: require('@/static/public/card/icon-card-demo1.png'),
			demoImg2: require('@/static/public/card/icon-card-demo2.png'),
			
			cardLength: 0,
			cardList: [],
		};
	},
	mounted() {
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
					clearInterval(obj);
		
					/* 事件 */
					this.getCardboxLength();
				}
			}, 100);
		})();
	},
	methods: {
		getCardboxLength(){
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.userWalletAddress
				}
			];
						
			this.$tronWeb
				.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.cardContractAddress, 'balanceOf(address)', parameter)
				.then(result => {
					this.cardLength = window.tronWeb.toDecimal('0x' + result.constant_result[0]);
					console.log('卡牌总数 ---> ', this.cardLength);
					
					this.getCardDetail();
				});
		},
		getCardDetail(){
			for (var i = 0; i < this.cardLength; i++) {
				let parameter = [
					{
						type: 'address',
						value: this.$store.state.userWalletAddress
					},{
						type: 'uint256',
						value: i
					}
				];
				
				this.$tronWeb
					.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.cardContractAddress, 'tokenOfOwnerByIndex(address,uint256)', parameter)
					.then(result => {
						// console.log(result);
						let cardItem = {};
						cardItem.tokenId = result.constant_result[0];
						let decimalTokenId = window.tronWeb.toDecimal('0x' + result.constant_result[0]);
						cardItem.decimalTokenId = decimalTokenId;
						let cardType = decimalTokenId.toString().split(0, 2)[0];
						
						cardItem.color = Math.floor(decimalTokenId / 100000000000) * 100000000000;
						cardItem.type = Math.floor(decimalTokenId % 100000000000);
						cardItem.pic = `https://xiniukeji.oss-cn-chengdu.aliyuncs.com/douluo/img/${decimalTokenId}.png`;
						
						this.cardList.push(cardItem);
						// console.log(this.cardList);
					});
			}
		},
		
		openPopup(e, item) {
			this.$emit('openPopup', e, item);
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/cardBox';
</style>
