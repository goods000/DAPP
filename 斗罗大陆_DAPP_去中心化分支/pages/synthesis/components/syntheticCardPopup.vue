<template>
	<!-- 排名筛选 -->
	<uni-popup ref="syntheticCardPopup" type="center" :animation="true">
		<view class="syntheticCardPopupBox">
			<view class="syntheticCardPopupBox-wrapper">
				<view class="syntheticCardPopupBox-container">
					<view class="syntheticCardPopupBox-title"><view class="syntheticCardPopupBox-title__label">英雄合成</view></view>

					<view class="syntheticCardPopupBox-cardBox cardBox">
						<view class="cardBox-header">
							<view class="cardBox-card"><image src="@/static/public/card/icon-card-demo1.png" mode="widthFix"></image></view>
						</view>
						<view class="cardBox-name">金色魂环卡·阿银<text class="cardBox-length">(3张)</text></view>
					</view>

					<view class="syntheticCardPopupBox-infoBox infoBox">
						<view class="infoBox-wrapper">
							<view class="infoBox-list">
								<view class="infoBox-list__label infoBox-list__label--power">算力：</view>
								
								<view class="infoBox-list__convertBox convertBox">
									<view class="convertBox-wrapper">
										<view class="convertBox-label">50000</view>
										<view class="convertBox-decoration"></view>
										<view class="convertBox-data">59432</view>
									</view>
								</view>
							</view>
							<view class="infoBox-list">
								<view class="infoBox-list__label infoBox-list__label--experience">经验值：</view>
								
								<view class="infoBox-list__convertBox convertBox">
									<view class="convertBox-wrapper">
										<view class="convertBox-label">50000</view>
										<view class="convertBox-decoration"></view>
										<view class="convertBox-data">59432</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="syntheticCardPopupBox-calculateBox calculateBox">
						<view class="calculateBox-wrapper">
							<view class="calculateBox-list">
								<view class="calculateBox-btn calculateBox-btn--minus" @click="minusBtn()"></view>
								<view class="calculateBox-input"><input type="number" placeholder="0" placeholder-class="calculateBox-placeholder" v-model="quantity" /></view>
								<view class="calculateBox-btn calculateBox-btn--plus" @click="plusBtn()"></view>
							</view>
							<view class="calculateBox-result">成功率：20%</view>
						</view>
					</view>
				</view>

				<view class="syntheticCardPopupBox-buttonBox buttonBox">
					<view class="buttonBox-btn buttonBox-btn--style1" @click="hidePopup('syntheticCardPopup')">取消</view>
					<view class="buttonBox-btn buttonBox-btn--style2" @click="toSuccessPopup()">合成</view>
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
			this.$emit('hidePopup', 'syntheticCardPopup');
			this.$emit('openPopup', 'successPopup');
		},
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/syntheticCardPopup';
</style>
