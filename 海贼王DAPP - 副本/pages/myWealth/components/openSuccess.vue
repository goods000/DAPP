<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openSuccess" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openSuccess')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image src="@/static/myWealth/icon-wealthList-withdraw.png" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">您已成功提币：</view>
						<view class="popupBox-contentbg__tipsContent">210 {{ $store.state.projectCurrencyName }}</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openSuccess')">完成</view>
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
// @import '/scss/openPopupBox';
.popupBox{
	&-contentbg{
		&__tipsContent{
			font-size: 34upx;
			font-family: HYZhengYuan, HYZhengYuan-95S;
			font-weight: 900;
			text-align: center;
			color: #f0e1d2;
			letter-spacing: -1upx;
		}
	}
}
</style>
