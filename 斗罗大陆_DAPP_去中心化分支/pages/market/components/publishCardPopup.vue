<template>
	<!-- 排名筛选 -->
	<uni-popup ref="publishCardPopup" type="center" :animation="true">
		<view class="publishCardPopupBox">
			<view class="publishCardPopupBox-wrapper">
				<view class="publishCardPopupBox-container">
					<view class="publishCardPopupBox-title"><view class="publishCardPopupBox-title__label">挂单</view></view>

					<view class="publishCardPopupBox-cardBox cardBox">
						<view class="cardBox-header">
							<view class="cardBox-card"><image src="@/static/public/card/icon-card-demo1.png" mode="widthFix"></image></view>
						</view>
						<!-- <view class="cardBox-card">
							<image src="@/static/public/card/icon-card-demo1.png" mode="widthFix"></image>
							<view class="cardBox-price">200<text>WHL/张</text></view>
						</view> -->
						<view class="cardBox-name">金色魂环卡·阿银</view>
					</view>

					<view class="publishCardPopupBox-calculateBox calculateBox">
						<view class="calculateBox-wrapper">
							<view class="calculateBox-list">
								<view class="calculateBox-btn calculateBox-btn--minus" @click="minusBtn()"></view>
								<view class="calculateBox-input"><input type="number" placeholder="0" placeholder-class="calculateBox-placeholder" v-model="quantity" /></view>
								<view class="calculateBox-btn calculateBox-btn--plus" @click="plusBtn()"></view>
							</view>
							<view class="calculateBox-result">库存：{{ quantity }}张</view>
						</view>
					</view>
				</view>

				<view class="publishCardPopupBox-buttonBox buttonBox">
					<view class="buttonBox-btn buttonBox-btn--style1" @click="hidePopup('publishCardPopup')">取消</view>
					<view class="buttonBox-btn buttonBox-btn--style2" @click="toSuccessPopup()">购买</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			pageStep: 0,
			quantity: 1,
			address: ''
		};
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
		toSuccessPopup() {
			this.$emit('hidePopup', 'publishCardPopup');
			this.$emit('openPopup', 'successPopup');
		},
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/publishCardPopup';
</style>
