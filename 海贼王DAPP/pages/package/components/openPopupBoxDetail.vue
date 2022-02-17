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
						<image :src="require(`@/static/package/icon-boxDetail-title-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">{{ i18n.package.openPopupBoxDetail.tips01 }}：{{ boxInfo.role }}（{{ boxInfo.color }}）。</view>
						<view class="popupBox-contentbg__colorContent">{{ i18n.package.openPopupBoxDetail.tips02 }}</view>
						<!-- <scroll-view class="popupBox-card__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto"> -->
						<!-- <view class="popupBox-card">
							<view class="popupBox-cardBox" >
								<image class="popupBox-cardBox__image" :src="boxInfo.pic" mode="widthFix"></image>
								<view class="popupBox-cardBox__num">X1</view>
							</view>
						</view> -->
						<!-- </scroll-view> -->
					</view>
					<view class="popupBox-btn popupBox-btnPadding--01">
						<view class="popupBox-btn__style" @click="hidePopup('openPopupBoxDetail')">{{ i18n.global.ISee }}</view>
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
			quantity: 1,
			boxInfo:''
		};
	},
	mounted() {
		var that = this;
		this.$Bus.$on('boxInfo',function(boxInfo){
			that.boxInfo = boxInfo;
		})
	},
	methods: {
		refreshData() {
			this.randomValue = Math.random();
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopupBoxDetail';
</style>
