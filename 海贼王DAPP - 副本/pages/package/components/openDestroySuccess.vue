<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openDestroySuccess" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openDestroySuccess')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image :src="require(`@/static/package/icon-destroy-title-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">{{ i18n.package.openDestroySuccess.tips01 }}</view>
						<view class="popupBox-contentbg__tips">{{ cardDetails.role }}（{{ cardDetails.color }}）1{{ i18n.package.openDestroySuccess.Sheet }}</view>
						<view class="popupBox-contentbg__colorContent">{{ i18n.package.openDestroySuccess.tips02 }}</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openDestroySuccess')">{{ i18n.global.ISee }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props:['cardDetails'],
	data() {
		return {
		};
	},
	methods: {
		init(){
			console.log("cardDetails：",this.cardDetails);
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopupBox';
.popupBox{
	&-contentbg{
		&__tipsContent{
			text-align: center;
		}
	}
}
</style>
