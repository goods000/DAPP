<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openTransferHeroSuccess" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openTransferHeroSuccess')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image :src="require(`@/static/package/icon-transfer-title-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">{{ i18n.package.openTransferBoxSuccess.title }}：{{ heroDetails.role }}</view>
						<view class="popupBox-contentbg__tips">（{{ heroDetails.color }}）。</view>
						<view class="popupBox-contentbg__colorContent">{{ i18n.package.myHero }}</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openTransferHeroSuccess')">{{ i18n.global.finish }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props:['heroDetails'],
	data() {
		return {
			
		};
	},
	methods: {
		init(){
			console.log("heroDetails：",this.heroDetails);
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
