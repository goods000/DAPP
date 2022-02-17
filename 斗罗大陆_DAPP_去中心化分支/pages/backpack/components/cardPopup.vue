<template>
	<!-- 排名筛选 -->
	<uni-popup ref="cardPopup" type="center" :animation="true">
		<view class="cardPopupBox">
			<view class="cardPopupBox-wrapper">
				<view class="cardPopupBox-close" @click="hidePopup('cardPopup')"></view>
				<view class="cardPopupBox-container">
					<view class="cardPopupBox-title">
						<view class="cardPopupBox-title__label" v-if="pageStep == 0">英雄详情</view>
						<view class="cardPopupBox-title__label" v-if="pageStep == 1">数量</view>
						<view class="cardPopupBox-title__label" v-if="pageStep == 2">英雄赠送</view>
					</view>

					<view class="cardPopupBox-cardBox cardBox" v-if="pageStep == 0 || pageStep == 1">
						<view class="cardBox-card"><image :src="chooseCardInfo.pic" mode="widthFix"></image></view>
						<view class="cardBox-name">
							{{ ($staticData.color[chooseCardInfo.color] || {}).color }}魂环卡·{{ $staticData.card[chooseCardInfo.type] }}
						</view>
					</view>

					<view class="cardPopupBox-infoBox infoBox" v-if="pageStep == 0">
						<view class="infoBox-wrapper">
							<view class="infoBox-list">
								<view class="infoBox-list__label infoBox-list__label--power">算力：</view>
								<view class="infoBox-list__data">{{ ($staticData.color[chooseCardInfo.color] || {}).baseHashRate }}</view>
							</view>
							<view class="infoBox-list">
								<view class="infoBox-list__label infoBox-list__label--experience">经验值：</view>
								<view class="infoBox-list__data">+{{ ($staticData.color[chooseCardInfo.color] || {}).experience }}</view>
							</view>
						</view>
					</view>

					<view class="cardPopupBox-calculateBox calculateBox" v-if="pageStep == 1">
						<view class="calculateBox-wrapper">
							<view class="calculateBox-list">
								<view class="calculateBox-btn calculateBox-btn--minus" @click="minusBtn()"></view>
								<view class="calculateBox-input"><input type="number" placeholder="0" placeholder-class="calculateBox-placeholder" v-model="quantity" /></view>
								<view class="calculateBox-btn calculateBox-btn--plus" @click="plusBtn()"></view>
							</view>
							<view class="calculateBox-result">共{{ quantity }}张</view>
						</view>
					</view>

					<view class="cardPopupBox-formBox formBox" v-if="pageStep == 2">
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
										<view class="cardListBox-item__card"><image src="@/static/public/card/icon-card-demo1.png" mode="widthFix"></image></view>
										<view class="cardListBox-item__name">阿银*1</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="cardPopupBox-buttonBox buttonBox">
					<template v-if="pageStep == 0">
						<view class="buttonBox-btn buttonBox-btn--style2" @click="pageStep = 1">转赠</view>
						<view class="buttonBox-btn buttonBox-btn--style2">装备</view>
					</template>
					<template v-if="pageStep == 1">
						<view class="buttonBox-btn buttonBox-btn--style1" @click="pageStep = 0">取消</view>
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
	props: ['chooseCardInfo', 'randomValue'],
	data() {
		return {
			pageStep: 0,
			quantity: 1,
			address: ''
		};
	},
	watch: {
		randomValue(newValue){
			this.pageStep = 0;
		}
	},
	methods: {
		minusBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			this.quantity++;
		},
		toSuccessPopup(){
			this.$emit('hidePopup', 'cardPopup');
			this.$emit('openPopup', 'successPopup');
		},
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/cardPopup';
</style>
