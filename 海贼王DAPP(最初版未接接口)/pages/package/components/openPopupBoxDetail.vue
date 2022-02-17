<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openPopupBoxDetail" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openPopupBoxDetail')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-boxDetailImage">
						<image src="@/static/package/icon-boxDetail-title.png" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">恭喜您成功获得以下海贼英雄：</view>
						<scroll-view class="popupBox-card__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<view class="popupBox-card">
							<view class="popupBox-cardBox" v-for="(item,index) in 6" :key="index"
							@click="checkType(index)">
								<image class="popupBox-cardBox__image" src="@/static/package/icon-card.png" mode="widthFix"></image>
								<view class="popupBox-cardBox__num">X1</view>
							</view>
						</view>
						</scroll-view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding--01">
						<view class="popupBox-btn__style" @click="hidePopup('openPopupBoxDetail')">完成</view>
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
			checkActive: '',
			quantity: 10,
		};
	},
	methods: {
		reduceBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			if(this.inventory == this.quantity){
				this.$tools.toast('库存达到最大数量');
				this.quantity = this.inventory;
			}else{
				this.quantity++;
			}
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopupBoxDetail';
</style>
