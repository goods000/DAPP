<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openPopupSelectHero" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openPopupSelectHero')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">选择挂单英雄</view>
					<view class="popupBox-contentbg__tips popupBox-contentbg__tips--margin">请选择挂卖的海贼英雄</view>
					<scroll-view class="myPackage__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<view class="myPackage-cardBox">
							<view class="myPackage-cardItem" :class="{'myPackage-cardItem--active':cardType == index}" v-for="(item,index) in 10" :key="index"
							@click="changeCardType(index)" >
							<!-- <view class="myPackage-cardItem"> -->
								<view class="myPackage-cardItem__activeTitle">
									<image src="@/static/package/icon-title-active.png" mode="widthFix"></image>
								</view>
								<view class="myPackage-cardItem__cardBox">
									<image src="@/static/package/icon-card.png" mode="widthFix"></image>
									<view class="myPackage-cardItem__cardBox-info">
										<image src="@/static/package/icon.png" mode="widthFix"></image>
										<view class="myPackage-cardItem__cardBox-info__num">130087</view>
									</view>
								</view>
								<view class="myPackage-cardItem__num">X2</view>
							</view>
						</view>
					</scroll-view>	
					<view class="popupBox-btn popupBox-btnPadding--01">
						<view class="popupBox-btn__zore3" @click="hidePopup('openPopupSelectHero')">返回</view>
						<view class="popupBox-btn__zore2" @click="submit()">确定</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			scrollInto: '',
			cardType: '',
		};
	},
	methods: {
		init(){
			this.cardType == 0;
		},
		changeCardType(index){
			if (this.cardType != index) {
				this.cardType = index;
			}
		},
		submit(){
			this.$emit('openPopup','openSellingSuccess')
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/pages/package/components/scss/openPopupBoxDetail';
@import 'scss/openPopupSelectHero';
</style>
