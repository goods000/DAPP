<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openTransferBoxSuccess" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openTransferBoxSuccess')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image src="@/static/package/icon-transfer-title.png" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">恭喜您成功转赠：</view>
						<view class="popupBox-contentbg__boxImage">
							<image src="@/static/package/icon-box-01.png" mode="widthFix"></image>
							<view class="popupBox-contentbg__boxImage-name">
								中级盲盒
								<view class="popupBox-contentbg__boxImage-name__num">X10</view>
							</view>
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openTransferBoxSuccess')">完成</view>
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
			address:'',
		};
	},
	methods: {
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopupBox';
</style>
