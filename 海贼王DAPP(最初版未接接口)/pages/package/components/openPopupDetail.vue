<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openPopupDetail" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openPopupDetail')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">海贼英雄详情</view>
					<view class="popupBox-content">
						<view class="popupBox-content__name">波雅.汉库克</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">英雄等级：</view>
							<view class="popupBox-content__item-info popupBox-content__item-info--active">SS (金色)</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">英雄战力：</view>
							<view class="popupBox-content__item-info">87620</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">卡槽等级：</view>
							<view class="popupBox-content__item-info">Lv.6</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">卡槽加成：</view>
							<view class="popupBox-content__item-info">20000</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">总战力值：</view>
							<view class="popupBox-content__item-info">107620</view>
						</view>
					</view>
					<view class="popupBox-cardTitle">海贼一览</view>
					<view class="popupBox-card">
						<view class="popupBox-cardBox" v-for="(item,index) in 3" :key="index" :class="{'popupBox-cardBox--grayscale' : checkActive != index }"
						@click="checkType(index)">
							<view class="popupBox-cardBox__activeTitle" v-if="index == 0">
								<image src="@/static/package/icon-title-active.png" mode="widthFix"></image>
							</view>
							<image class="popupBox-cardBox__image" src="@/static/package/icon-card.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="popupBox-btn">
						<!-- <view class="popupBox-btn__zore3">转赠英雄</view> -->
						<view class="popupBox-btn__zore1" @click="openTransferHero">转赠英雄</view>
						<view class="popupBox-btn__zore2">卸下英雄</view>
						<!-- <view class="popupBox-btn__zore2">装备英雄</view> -->
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
			checkActive: '',
		};
	},
	methods: {
		openTransferHero(){
			this.$emit('openPopup', 'openTransferHero');
			this.hidePopup('openPopupDetail');
		},
		checkType(index){
			if (this.checkActive != index) {
				this.checkActive = index;
			}
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopupDetail';
</style>
