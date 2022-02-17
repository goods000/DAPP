<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openSellingSuccess" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openSellingSuccess')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image :src="require(`@/static/exchange/icon-selling-title-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">{{ i18n.exchange.openSellingSuccess.title }}</view>
						<view class="popupBox-contentbg__tips">{{ successItem.role }}（{{ successItem.color }}） </view>
						<view class="popupBox-contentbg__colorContent">{{ i18n.exchange.openSellingSuccess.tips01 }}</view>
						</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="submit()">{{ i18n.global.finish }}</view>
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
			successItem:{},
		};
	},
	mounted() {
		var that = this;
		that.$Bus.$on('successItem',function(successItem){
			that.successItem = successItem;
		})
	},
	methods: {
		submit(){
			this.hidePopup('openSellingSuccess');
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
// @import '/scss/openPopupBox';
</style>
