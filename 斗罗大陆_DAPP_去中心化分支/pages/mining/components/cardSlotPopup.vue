<template>
	<!-- 排名筛选 -->
	<uni-popup ref="cardSlotPopup" type="center" :animation="true">
		<view class="cardSlotPopupBox">
			<view class="cardSlotPopupBox-wrapper">
				<!-- <view class="cardSlotPopupBox-close" @click="hidePopup('cardSlotPopup')"></view>  -->
				<view class="cardSlotPopupBox-container">
					<view class="cardSlotPopupBox-title"><view class="cardSlotPopupBox-title__label">卡槽详情</view></view>

					<view class="cardSlotPopupBox-experienceBox experienceBox">
						<view class="experienceBox-wrapper">
							<view class="experienceBox-header">
								<view class="experienceBox-label">卡槽等级: {{ cardSlotStatus == 0 ? 0 : '5级(斗灵)' }}</view>
								<view class="experienceBox-label">等级加成: +0%</view>
							</view>
							<view class="experienceBox-footer">
								<view class="experienceBox-label">经验值：</view>
								<view class="experienceBox-progress progressBox">
									<view class="progressBox-bg"></view>
									<view class="progressBox-progress" :style="{ width: (cardSlotStatus == 0 ? 0 : 50) + '%' }"></view>
									<view class="progressBox-content">{{ cardSlotStatus == 0 ? 0 : 50 }} / 100</view>
								</view>
								<view class="experienceBox-btn" @click="toChooseCard(2)">升级</view>
							</view>
						</view>
					</view>

					<view class="cardSlotPopupBox-cardInfo cardInfoBox">
						<view class="cardInfoBox-wrapper">
							<view class="cardInfoBox-card" :class="{ 'cardInfoBox-card--grayscale': cardSlotStatus == 0 }">
								<image src="@/static/public/card/icon-card-demo1.png" mode="widthFix"></image>
							</view>
							<view class="cardInfoBox-content">
								<view class="cardInfoBox-listBox">
									<view class="cardInfoBox-listBox__list">卡槽名称：小舞</view>
									<view class="cardInfoBox-listBox__list">英雄品质：{{ cardSlotStatus == 0 ? '---' : '红色' }}</view>
									<view class="cardInfoBox-listBox__list">基础算力：{{ cardSlotStatus == 0 ? '---' : '594312' }}</view>
								</view>
								<view class="cardInfoBox-buttonBox">
									<template v-if="cardSlotStatus == 0">
										<view class="cardInfoBox-buttonBox__btn cardInfoBox-buttonBox__btn--style1" @click="hidePopup('cardSlotPopup')">取消</view>
										<view class="cardInfoBox-buttonBox__btn cardInfoBox-buttonBox__btn--style2" @click="toChooseCard(0)">装备</view>
									</template>
									<template v-if="cardSlotStatus == 1">
										<view class="cardInfoBox-buttonBox__btn cardInfoBox-buttonBox__btn--style1" @click="hidePopup('cardSlotPopup')">拆卸</view>
										<view class="cardInfoBox-buttonBox__btn cardInfoBox-buttonBox__btn--style2" @click="toChooseCard(1)">替换</view>
									</template>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['cardSlotStatus'],
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
		toChooseCard(type) {
			this.$emit('changeCardChooseStatus', type);
			this.$emit('hidePopup', 'cardSlotPopup');
			this.$emit('openPopup', 'cardChoosePopup');
		},
		openPopup(e) {
			this.$emit('openPopup', e);
		},
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/cardSlotPopup';
</style>
