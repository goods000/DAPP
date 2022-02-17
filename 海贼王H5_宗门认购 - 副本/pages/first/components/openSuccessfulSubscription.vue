<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openSuccessfulSubscription" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openSuccessfulSubscription')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image :src="i18n.index.buySuccess" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">{{ i18n.index.Congratulations }}"{{ name }}"</view>
						<view class="popupBox-contentbg__tips">{{ i18n.index.result }}</view>
						<view class="popupBox-contentbg__colorContent">{{ i18n.index.typeName }}</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openSuccessfulSubscription')">{{ i18n.index.gotIt }}</view>
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
			name: ''
		};
	},
	mounted() {
		var that = this;
		this.$Bus.$on('checkName',function(name){
			that.name = name;
		})
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
			text-align: center;
		}
	}
}
</style>
