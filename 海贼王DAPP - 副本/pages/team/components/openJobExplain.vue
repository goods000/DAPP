<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openJobExplain" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openJobExplain')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-header">{{ i18n.team.jobTitle }}</view>
				<view class="popupBox-container">
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">‘{{ i18n.team.jobTips01 }}’</view>
						<view class="popupBox-contentbg__tipsName">{{ i18n.team.jobTips02 }}</view>
						<view class="popupBox-contentbg__tips">‘{{ i18n.team.jobTips03 }}’</view>
						<view class="popupBox-contentbg__tipsName">{{ i18n.team.jobTips04 }}</view>
						<view class="popupBox-contentbg__tips">‘{{ i18n.team.jobTips05 }}’</view>
						<view class="popupBox-contentbg__tipsName">{{ i18n.team.jobTips06 }}</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openJobExplain')">{{ i18n.global.ISee }}</view>
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
