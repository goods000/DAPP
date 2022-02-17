<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openCompositeDetail" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openCompositeDetail')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">合成详情</view>
					<view class="popupBox-content">
						<view class="detailBox">
							<view class="detailBox-image">
								<image src="@/static/package/icon-card.png" mode="widthFix"></image>
							</view>
							<image class="detailBox-nextBtn" src="@/static/shop/icon-shop-rightBtn.png" mode="widthFix"></image>
							<view class="detailBox-image">
								<image src="@/static/package/icon-popupBox-card.png" mode="widthFix"></image>
							</view>
						</view>
						
						<view class="popupBox-content__name">波雅.汉库克</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">英雄等级：</view>
							<view class="popupBox-content__item-info popupBox-content__item-info--active">A → S</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">英雄战力：</view>
							<view class="popupBox-content__item-info">500 → 800</view>
						</view>
					</view>
					<view class="popupBox-cardTitle">请选择合成消耗原英雄数量</view>
					<view class="popupBox-operate">
						<view class="popupBox-operate__btn" @click="reduceBtn()">
							<image src="@/static/public/icon-reduce.png" mode="widthFix"></image>
						</view>
						<view class="popupBox-operate__num">{{ quantity }}</view>
						<view class="popupBox-operate__btn" @click="plusBtn()">
							<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="popupBox-input">
						<view class="popupBox-input__style">当前合成成功率：<text>{{ fee }}</text></view>
						<!-- <input type="text" disabled="disabled" :value="'当前合成成功率：'+fee" placeholder-class="popupBox-input__style"/> -->
					</view>
					<view class="popupBox-btn popupBox-btnPadding--01">
						<view class="popupBox-btn__style" @click="openCompositeDetail">合成</view>
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
			quantity: 2,
			fee: '20%',
		};
	},
	methods: {
		openCompositeDetail(){
			this.$emit('openPopup', 'openResult');
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
@import '/scss/openCompositeDetail';
</style>
