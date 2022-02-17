<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openActiveExplain" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openActiveExplain')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-header">{{ i18n.team.activeTitle }}</view>
				<view class="popupBox-container">
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips"></view>
						<view class="popupBox-contentbg__tipsContent">{{ i18n.team.activeTips01 }}</view>
						<view class="popupBox-contentbg__tipsTitle">‘{{ i18n.team.activeTips02 }}’</view>
						<view class="popupBox-contentbg__tipsTitle">+</view>
						<view class="popupBox-contentbg__tipsTitle">{{ i18n.team.activeTips03 }}</view>
						<view class="popupBox-contentbg__tipsTitle">=</view>
						<view class="popupBox-contentbg__tipsContent">‘{{ i18n.team.activeTips04 }}’</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openActiveExplain')">{{ i18n.global.ISee }}</view>
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
		};
	},
	methods: {
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopup';
</style>
