<template>
	<view class="explain">
		<view class="explain-image">
			<image :class="langType == 'cn' ? 'explain-image--cn' : 'explain-image--en'" :src="i18n.index.img_01" mode="widthFix"></image>
		</view>
		<view class="explain-flow">
			<image src="@/static/first/icon-first-flow.png" mode="widthFix"></image>
		</view>
		<view class="explain-box">
			<view class="explain-bg" :class="{'explain-bg--en' : $store.state.initLanguage == 'en' }">
				<view class="explain-item">
					<view class="explain-item__box">
						<view class="explain-item__box-title">{{ i18n.index.tipsTitle }}</view>
						<view class="explain-item__box-content">{{ i18n.index.tipsContent }}</view>
					</view>
					<view class="explain-item__rightBox">
						<view class="explain-item__rightBox-content">{{ i18n.index.tipsContent01 }}</view>
						<view class="explain-item__rightBox-carefulBox">
							<view class="explain-item__rightBox-carefulBox__title">{{ i18n.index.beCareful }}</view>
							<view class="explain-item__rightBox-carefulBox__content">{{ i18n.index.beTips }}</view>
						</view>
						<!-- <view class="explain-item__box__time">{{ i18n.index.release }}</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props:['langType'],
	data() {
		return {
			// langType: '',
		};
	},
	mounted() {
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
@import '/scss/explain';
</style>
