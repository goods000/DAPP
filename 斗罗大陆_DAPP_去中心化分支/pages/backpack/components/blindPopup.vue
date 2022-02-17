<template>
	<!-- 排名筛选 -->
	<uni-popup ref="blindPopup" type="center" :animation="true">
		<view class="blindPopupBox">
			<view class="blindPopupBox-wrapper">
				<view class="blindPopupBox-close" @click="hidePopup('blindPopup')"></view>
				<view class="blindPopupBox-container">
					<view class="blindPopupBox-title" v-if="pageStep == 0">
						<view class="blindPopupBox-title__label" v-if="pageStep == 0">盲盒详情</view>
						<view class="blindPopupBox-title__label" v-if="pageStep == 2">英雄赠送</view>
					</view>

					<view class="blindPopupBox-successTitle" v-if="pageStep == 1"><view class="blindPopupBox-successTitle__label">恭喜获得</view></view>

					<template v-if="pageStep == 0">
						<view class="blindPopupBox-cardBox cardBox">
							<view class="cardBox-card"><image :src="chooseBindBoxInfo.pic" mode="widthFix"></image></view>
							<view class="cardBox-name">{{ chooseBindBoxInfo.name }}</view>
						</view>

						<view class="blindPopupBox-messageBox messageBox">
							<view class="messageBox-list" v-if="chooseBindBoxInfo.id == 1">
								可随机开出下列颜色卡排的其中一种
								<br />
								<text style="color: #cccccc;">灰色(94%)、</text>
								<text style="color: #7624aa;">紫色(5%)、</text>
								<text style="color: #000000;">黑色(1%)</text>
							</view>
							<view class="messageBox-list" v-if="chooseBindBoxInfo.id == 2">
								可随机开出下列颜色卡排的其中一种
								<br />
								<text style="color: #7624aa;">紫色(95%)、</text>
								<text style="color: #000000;">黑色(5%)</text>
							</view>
							<view class="messageBox-list" v-if="chooseBindBoxInfo.id == 3">
								可随机开出下列颜色卡排的其中一种
								<br />
								<text style="color: #7624aa;">紫色(20%)、</text>
								<text style="color: #000000;">黑色(80%)</text>
							</view>
						</view>
					</template>

					<view class="blindPopupBox-cardBox cardBox" v-if="pageStep == 1">
						{{ cardInfo.pic }}
						<view class="cardBox-card"><image :src="cardInfo.pic" mode="widthFix"></image></view>
						<view class="cardBox-name">{{ $staticData.color[cardInfo.color].color }}魂环卡·{{ $staticData.card[cardInfo.type] }}</view>
					</view>

					<!-- <view class="blindPopupBox-calculateBox calculateBox" v-if="pageStep == 0">
						<view class="calculateBox-wrapper">
							<view class="calculateBox-list">
								<view class="calculateBox-btn calculateBox-btn--minus" @click="minusBtn()"></view>
								<view class="calculateBox-input"><input type="number" placeholder="0" placeholder-class="calculateBox-placeholder" v-model="quantity" /></view>
								<view class="calculateBox-btn calculateBox-btn--plus" @click="plusBtn()"></view>
							</view>
						</view>
					</view> -->

					<view class="blindPopupBox-infoBox infoBox" v-if="pageStep == 1">
						<view class="infoBox-wrapper">
							<view class="infoBox-list">
								<view class="infoBox-list__label infoBox-list__label--power">算力：</view>
								<view class="infoBox-list__data">{{ $staticData.color[cardInfo.color].baseHashRate }}</view>
							</view>
							<view class="infoBox-list">
								<view class="infoBox-list__label infoBox-list__label--experience">经验值：</view>
								<view class="infoBox-list__data">+{{ $staticData.color[cardInfo.color].experience }}</view>
							</view>
						</view>
					</view>

					<view class="blindPopupBox-formBox formBox" v-if="pageStep == 2">
						<view class="formBox-wrapper">
							<view class="formBox-item">
								<view class="formBox-item__label">好友钱包地址：</view>
								<view class="formBox-item__input">
									<input type="text" placeholder-class="formBox-item__placeholder" placeholder="请输入钱包地址" v-model="address" />
								</view>
							</view>
							<view class="formBox-item">
								<view class="formBox-item__label">礼物清单：</view>
								<view class="formBox-item__cardList cardListBox">
									<view class="cardListBox-item">
										<view class="cardListBox-item__card"><image src="@/static/public/blindbox/icon-blindBox-style1.png" mode="widthFix"></image></view>
										<view class="cardListBox-item__name">中级盲盒*1</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="blindPopupBox-buttonBox buttonBox">
					<template v-if="pageStep == 0">
						<view class="buttonBox-btn buttonBox-btn--style2" @click="pageStep = 2">转赠</view>
						<view class="buttonBox-btn buttonBox-btn--style2" @click="openUnkownBox()">开启</view>
					</template>
					<template v-if="pageStep == 1">
						<view class="buttonBox-btn buttonBox-btn--style2" @click="pageStep = 2">确认</view>
					</template>
					<template v-if="pageStep == 2">
						<view class="buttonBox-btn buttonBox-btn--style1" @click="pageStep = 0">取消</view>
						<view class="buttonBox-btn buttonBox-btn--style2" @click="toSuccessPopup()">确认</view>
					</template>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['chooseBindBoxInfo', 'randomValue'],
	data() {
		return {
			pageStep: 0,
			quantity: 1,
			imagePath: '',
			address: '',
			pockerTokenId: '101000000000',

			cardInfo: {
				color: '100000000000',
				type: '1000000000',
				pic: null
			},
		};
	},
	watch: {
		randomValue(newValue){
			this.pageStep = 0;
		}
	},
	methods: {
		openUnkownBox(){
			let parameter = [
				{
					type: 'uint256',
					value: window.tronWeb.toHex(this.chooseBindBoxInfo.decimalTokenId)
				}
			];

			this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.proContractAddress, 'openUnkownBox(uint256)', parameter).then(result => {
				console.log(result);
				uni.showLoading({
					title:'链上确认中',
					mask: true
				})
				
				let timer = setInterval(() => {
					this.$tronWeb.getTransactionInfo(result.txid).then(transcationInfo => {
						
						console.log(transcationInfo);
						
						if (transcationInfo != null && transcationInfo.receipt != null) {
							clearInterval(timer);
							uni.hideLoading();
				
							if (transcationInfo.receipt.result == 'SUCCESS') {
								this.pockerTokenId = window.tronWeb.toDecimal('0x' + transcationInfo.contractResult[0]);
								this.cardInfo.color = Math.floor(this.pockerTokenId / 100000000000) * 100000000000;
								this.cardInfo.type = Math.floor(this.pockerTokenId % 100000000000);
								this.cardInfo.pic = `https://xiniukeji.oss-cn-chengdu.aliyuncs.com/douluo/img/${this.pockerTokenId}.png`;
								this.pageStep = 1;
							} else {
								this.$tools.toast('开启失败');
							}
						}
					});
				}, 1000);
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
		toSuccessPopup() {
			this.$emit('hidePopup', 'blindPopup');
			this.$emit('openPopup', 'successPopup');
		},
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/blindPopup';
</style>
