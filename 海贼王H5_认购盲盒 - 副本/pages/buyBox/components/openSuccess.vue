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
						<image :src="i18n.index.buyTitle" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">{{ i18n.index.tips02 }}{{ successData.name }}</view>
						<view class="popupBox-contentbg__tips">{{ successData.num }}{{ i18n.index.tips03 }}</view>
						<view class="popupBox-contentbg__colorContent">{{ i18n.index.tips04 }}</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openSuccess')">{{ i18n.index.ISee }}</view>
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
			successData: {},
		};
	},
	mounted() {
		var that = this;
		this.$Bus.$on('successData',function(successData){
			that.successData = successData;
			console.log("Data",that.successData);
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
