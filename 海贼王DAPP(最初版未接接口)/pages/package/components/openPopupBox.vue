<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openPopupBox" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openPopupBox')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">开启盲盒</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__titleName">普通盲盒</view>
						<view class="popupBox-contentbg__boxImage">
							<image src="@/static/package/icon-box-01.png" mode="widthFix"></image>
							<view class="popupBox-contentbg__boxImage-title">盲盒数量：
								<view class="popupBox-contentbg__boxImage-title__num">10</view>
							</view>
						</view>
					</view>
					<view class="popupBox-cardTitle">请选择开启数量</view>
					<view class="popupBox-operate">
						<view class="popupBox-operate__btn" @click="reduceBtn()">
							<image src="@/static/public/icon-reduce.png" mode="widthFix"></image>
						</view>
						<view class="popupBox-operate__num">{{ quantity }}</view>
						<view class="popupBox-operate__btn" @click="plusBtn()">
							<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="openPopupBoxDetail">开启</view>
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
			quantity: 10,
		};
	},
	methods: {
		openPopupBoxDetail(){
			this.$emit('openPopup', 'openPopupBoxDetail');
			this.hidePopup('openPopupBox');
		},
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
@import '/scss/openPopupBox';
</style>
