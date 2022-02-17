<template>
	<view class="buyBox">
		<view class="buyBox-bg">
			<image src="@/static/buyBox/icon-buyBox-bg.png" mode="widthFix"></image>
		</view>
		<view class="buyBox-wrapper">
			<view class="buyBox-image">
				<image src="@/static/first/icon-first-box.png" mode="widthFix"></image>
			</view>
			<view class="buyBox-flow">
				<image src="@/static/first/icon-first-flow.png" mode="widthFix"></image>
			</view>
			<view class="selection-box">
				<view class="selection-box__header">
					<image src="@/static/first/icon-first-headerBox.png" mode="widthFix"></image>
				</view>
				<view class="selection-box__item">
					<view class="popupBox-titleTips">
						<view class="popupBox-titleTips__bg">盲盒库</view>
						<view class="popupBox-titleTips__line"></view>
					</view>
					<view class="openBuyBox">
						<scroll-view class="openBuyBox__height1" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<view class="openBuyBox-typeBox">
							<view class="openBuyBox-typeBox__item" v-for="(item,index) in 3">
								<view class="typeBox-image">
									<image src="@/static/package/icon-type-1.png" mode="widthFix" v-if="index ==0"></image>
									<image src="@/static/package/icon-type-2.png" mode="widthFix" v-if="index ==1"></image>
									<image src="@/static/package/icon-type-3.png" mode="widthFix" v-if="index ==2"></image>
								</view>
								<view class="typeBox-details">
									<view class="typeBox-details__nameZh">普通盲盒</view>
									<view class="typeBox-details__nameEn">Ordinary blind box</view>
									<view class="typeBox-details__numBox">
										<view class="typeBox-details__numBox-numtitle">购买价格：</view>
									</view>
									<view class="typeBox-details__btnBox">
										<view class="typeBox-details__numBox-num">10</view>
										<view class="typeBox-details__btnBox-open" @click="openBox">购买</view>
									</view>
								</view>
							</view>
						</view>
						</scroll-view>	
					</view>
					<view class="openBuyBox-record" @click="see()">查看认购记录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	onShow() {
		// console.log('checkName',this.checkName);
	},
	methods: {
		openBox(){
			this.$emit('openPopup','openPopupBuyBox');
		},
		see(){
			this.$emit('openPopup','openRecord');
		},
	}
} 
</script>

<style lang="scss" scoped>
@import '/scss/openBuyBox';
</style>
