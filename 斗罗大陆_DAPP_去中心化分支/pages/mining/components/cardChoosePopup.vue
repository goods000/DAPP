<template>
	<!-- 排名筛选 -->
	<uni-popup ref="cardChoosePopup" type="center" :animation="true">
		<view class="cardChoosePopupBox">
			<view class="cardChoosePopupBox-wrapper">
				<!-- <view class="cardChoosePopupBox-close" @click="hidePopup('cardChoosePopup')"></view> -->
				<view class="cardChoosePopupBox-container">
					<view class="cardChoosePopupBox-title">
						<view class="cardChoosePopupBox-title__label" v-if="cardChooseStatus == 0">英雄装备</view>
						<view class="cardChoosePopupBox-title__label" v-if="cardChooseStatus == 1">英雄替换</view>
						<view class="cardChoosePopupBox-title__label" v-if="cardChooseStatus == 2">英雄升级</view>
					</view>

					<view class="cardChoosePopupBox-swiperBox swiperBox">
						<view class="swiperBox-swiper">
							<ls-swiper
								:list="demoImageList"
								imgKey="imgPath"
								:crown="true"
								:loop="false"
								:shadow="true"
								:height="swiperHeight"
								:previousMargin="swiperHeightPreviousMargin"
								:nextMargin="swiperHeightNextMargin"
								ref="lsSwiper"
								@change="swiperChange"
							/>
						</view>
						<view class="swiperBox-btn swiperBox-btn--prev" :class="{ 'swiperBox-btn--disabled': isFirstCurrent }" @click="swiperPrev()"></view>
						<view class="swiperBox-btn swiperBox-btn--next" :class="{ 'swiperBox-btn--disabled': isLastCurrent }" @click="swiperNext()"></view>
					</view>

					<view class="cardChoosePopupBox-convertBox convertBoxBox" v-if="cardChooseStatus == 0 || cardChooseStatus == 1">
						<view class="convertBox-wrapper">
							<view class="convertBox-label">算力：0</view>
							<view class="convertBox-decoration"></view>
							<view class="convertBox-data">59432</view>
						</view>
					</view>

					<view class="cardChoosePopupBox-infoBox infoBox" v-if="cardChooseStatus == 2">
						<view class="infoBox-wrapper">
							<view class="infoBox-list">
								<view class="infoBox-list__label infoBox-list__label--experience">经验值：</view>
								<view class="infoBox-list__data">1600*1</view>
							</view>
						</view>
					</view>

					<view class="cardChoosePopupBox-calculateBox calculateBox" v-if="cardChooseStatus == 2">
						<view class="calculateBox-wrapper">
							<view class="calculateBox-list">
								<view class="calculateBox-btn calculateBox-btn--minus" @click="minusBtn()"></view>
								<view class="calculateBox-input"><input type="number" placeholder="0" placeholder-class="calculateBox-placeholder" v-model="quantity" /></view>
								<view class="calculateBox-btn calculateBox-btn--plus" @click="plusBtn()"></view>
							</view>
							<view class="calculateBox-result">共{{ quantity }}张</view>
						</view>
					</view>
				</view>

				<view class="cardChoosePopupBox-buttonBox buttonBox">
					<template v-if="pageStep == 0">
						<view class="buttonBox-btn buttonBox-btn--style1" @click="hidePopup('cardChoosePopup')">取消</view>
						<view class="buttonBox-btn buttonBox-btn--style2" @click="toSuccessPopup()">确认</view>
					</template>
					<template v-if="pageStep == 1">
						<view class="buttonBox-btn buttonBox-btn--style1" @click="hidePopup('cardChoosePopup')">取消</view>
						<view class="buttonBox-btn buttonBox-btn--style2" @click="toSuccessPopup()">确认</view>
					</template>
					<template v-if="pageStep == 2">
						<view class="buttonBox-btn buttonBox-btn--style1" @click="hidePopup('cardChoosePopup')">取消</view>
						<view class="buttonBox-btn buttonBox-btn--style2" @click="toSuccessPopup()">确认</view>
					</template>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
import lsSwiper from '@/components/ls-swiper/index.vue';
export default {
	components: {
		lsSwiper
	},
	props: ['cardChooseStatus'],
	data() {
		return {
			demoImageList: [
				{
					imgPath: require('@/static/public/card/icon-card-demo1.png')
				},
				{
					imgPath: require('@/static/public/card/icon-card-demo2.png')
				},
				{
					imgPath: require('@/static/public/card/icon-card-demo3.png')
				}
			],
			swiperHeight: uni.upx2px(800),
			swiperHeightPreviousMargin: uni.upx2px(340),
			swiperHeightNextMargin: uni.upx2px(340),

			isFirstCurrent: true,
			isLastCurrent: false,

			pageStep: 0,
			quantity: 1,
			address: ''
		};
	},
	methods: {
		swiperChange(e) {
			let listLength = this.demoImageList.length;

			if (this.$refs.lsSwiper.current == 0) {
				this.isFirstCurrent = true;
			} else if (this.$refs.lsSwiper.current == listLength - 1) {
				this.isLastCurrent = true;
			} else {
				this.isFirstCurrent = false;
				this.isLastCurrent = false;
			}
		},
		swiperPrev() {
			let listLength = this.demoImageList.length;

			if (this.$refs.lsSwiper.current != 0) {
				this.$refs.lsSwiper.current = this.$refs.lsSwiper.current - 1;
			}
		},
		swiperNext() {
			let listLength = this.demoImageList.length;

			if (this.$refs.lsSwiper.current != listLength - 1) {
				this.$refs.lsSwiper.current = this.$refs.lsSwiper.current + 1;
			}
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
			this.$emit('hidePopup', 'cardChoosePopup');
			this.$emit('openPopup', 'successPopup');
		},
		hidePopup(e) {
			this.$refs.lsSwiper.current = 0;
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/cardChoosePopup';
</style>
