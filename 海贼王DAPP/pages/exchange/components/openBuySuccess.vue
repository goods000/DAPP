<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openBuySuccess" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openBuySuccess')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image :src="require(`@/static/exchange/icon-buy-title-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">{{ i18n.exchange.openBuySuccess.title }}</view>
						<view class="popupBox-contentbg__tips"> {{ successItem.role }}（{{ successItem.color }}）</view>
						<view class="popupBox-contentbg__colorContent">{{ i18n.exchange.openBuySuccess.tips01 }}</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openBuySuccess')">{{ i18n.global.ISee }}</view>
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
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
// @import '/scss/openPopupBox';
</style>
