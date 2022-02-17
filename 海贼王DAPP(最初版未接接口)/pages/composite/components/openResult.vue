<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openResult" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openResult')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<!-- <image src="@/static/composite/icon-composite-success.png" mode="widthFix"></image> -->
						<image src="@/static/composite/icon-composite-fail.png" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<!-- <view class="popupBox-contentbg__tips">恭喜您成功合成：</view> -->
						<view class="popupBox-contentbg__tips">抱歉，此次合成失败</view>
						<view class="popupBox-contentbg__boxImage">
							<!-- <view class="popupBox-cardbg">
								<view class="popupBox-border">
									<view class="popupBox-cardItem">
										<image src="@/static/package/icon-card.png" mode="widthFix"></image>
									</view>
								</view>
							</view> -->
							<view class="popupBox-cardMargin">
								<view class="popupBox-cardItem">
									<image src="@/static/composite/icon-card-fail.png" mode="widthFix"></image>
								</view>
							</view>
							
							<!-- <view class="popupBox-contentbg__boxImage-name">
								波雅.汉库克
								<view class="popupBox-contentbg__boxImage-name__num">S</view>
							</view> -->
							<view class="popupBox-contentbg__tips">已为您即时返还 5 Bili</view>
							<view class="popupBox-contentbg__tips">4 Bili锁仓释放</view>
							<view class="popupBox-contentbg__tips">1 Bili销毁</view>
							
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<!-- <view class="popupBox-btn__style" @click="hidePopup('openResult')">完成</view> -->
						<view class="popupBox-btn__style" @click="hidePopup('openResult')">我知道了</view>
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
@import '/scss/openResult';
</style>
