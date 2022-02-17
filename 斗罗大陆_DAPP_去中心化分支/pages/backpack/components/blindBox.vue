<template>
	<!-- 盲盒 -->
	<view class="blindBox">
		<scroll-view scroll-y="true" class="blindBox-wrapper">
			<view class="blindBox-plane">
				<!-- <view class="initNoData" v-if="bindboxList.length == 0">
					暂无数据
				</view> -->
				<view class="blindBox-item" v-for="(item, index) in bindboxList" :key="index" @click="openPopup('blindPopup', item)">
					<view class="blindBox-item__header">
						<view class="blindBox-item__card"><image :src="item.pic" mode="widthFix"></image></view>
					</view>
					<view class="blindBox-item__content"><view class="blindBox-item__title">{{ item.name }}</view></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bindboxLength: 0,
			bindboxList: [],
			demoImg1: require('@/static/public/card/icon-card-demo1.png'),
			demoImg2: require('@/static/public/card/icon-card-demo2.png'),
		};
	},
	mounted() {
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
					clearInterval(obj);
		
					/* 事件 */
					this.getBindboxLength();
					// this.tokenOfOwnerByIndex();
				}
			}, 100);
		})();
	},
	methods: {
		getBindboxLength(){
			let parameter = [
				{
					type: 'address',
					value: this.$store.state.userWalletAddress
				}
			];
						
			this.$tronWeb
				.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.bindboxContractAddress, 'balanceOf(address)', parameter)
				.then(result => {
					this.bindboxLength = window.tronWeb.toDecimal('0x' + result.constant_result[0]);
					console.log('盲盒总数 ---> ', this.bindboxLength);
					
					this.getBindboxDetail();
				});
		},
		getBindboxDetail(){
			for (var i = 0; i < this.bindboxLength; i++) {
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
					.triggerConstantContract(this.$store.state.userWalletAddress, this.$store.state.bindboxContractAddress, 'tokenOfOwnerByIndex(address,uint256)', parameter)
					.then(result => {
						console.log(result);
						let bindboxItem = {};
						bindboxItem.tokenId = result.constant_result[0];
						let decimalTokenId = window.tronWeb.toDecimal('0x' + result.constant_result[0]);
						bindboxItem.decimalTokenId = decimalTokenId;
						let bindboxType = decimalTokenId.toString().split(0, 2)[0];
						
						if(bindboxType == '11'){
							bindboxItem.id = this.$staticData.bindbox[1].id;
							bindboxItem.name = this.$staticData.bindbox[1].name;
							bindboxItem.pic = this.$staticData.bindbox[1].pic;
						}else if(bindboxType == '12'){
							bindboxItem.id = this.$staticData.bindbox[2].id;
							bindboxItem.name = this.$staticData.bindbox[2].name;
							bindboxItem.pic = this.$staticData.bindbox[2].pic;
						}else if(bindboxType == '13'){
							bindboxItem.id = this.$staticData.bindbox[3].id;
							bindboxItem.name = this.$staticData.bindbox[3].name;
							bindboxItem.pic = this.$staticData.bindbox[3].pic;
						}
						
						this.bindboxList.push(bindboxItem);
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
@import '/scss/blindBox';
</style>
