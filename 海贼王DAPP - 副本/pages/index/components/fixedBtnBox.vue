<template>
	<!-- 右上角按钮集群 -->
	<view class="fixedBtnBox">
		<view class="fixedBtnBox-wrapper">
			<view class="fixedBtnBox-btn" @click="openPopup('openLanguage')">
				<image :src="require(`@/static/index/fixedBtn/icon-fixedBtn-setting-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
			</view>
			<!-- <view class="fixedBtnBox-btn" :class="{'fixedBtnBox-btn--width' : $store.state.initLanguage == 'cn'}" @click="openPopup('incomeReceivePopup')"> -->
			<!-- <view class="fixedBtnBox-btn" @click="$tools.noOpen()"> -->
			<view class="fixedBtnBox-btn" @click="openPopup('incomeReceivePopup')">
				<image :src="require(`@/static/index/fixedBtn/icon-fixedBtn-ranking-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
			</view>
			<view class="fixedBtnBox-btn" @click="$tools.jump('../package/package')">
				<image :src="require(`@/static/index/fixedBtn/icon-fixedBtn-backpack-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		openPopup(e) {
			console.log(e)
			this.$emit('openPopup',e);
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/fixedBtnBox';
</style>
