<template>
	<view class="explain">
		<view class="explain-image">
			<image :class="langType == 'cn' ? 'explain-image--cn' : 'explain-image--en'" :src="i18n.index.img_01" mode="widthFix"></image>
		</view>
		<view class="explain-box">
			<view class="explain-bg">
				<view class="explain-item">
					<view class="explain-item__box">
						<view class="explain-item__box-title">
							<image class="explain-item__box-title--cn" :class="{'explain-item__box-title--en' : $store.state.initLanguage == 'en' }" 
							:src="require(`@/static/first/icon-explainTitle-${$store.state.initLanguage}.png`)" mode=""></image>
						</view>
						<view class="explain-item__box-content">{{ i18n.index.tipsContent }}</view>
					</view>
					<!-- <view class="explain-item__rightBox">
						<view class="explain-item__rightBox-content">{{ i18n.index.tipsContent01 }}</view>
						<view class="explain-item__rightBox-carefulBox">
							<view class="explain-item__rightBox-carefulBox__title">{{ i18n.index.beCareful }}</view>
							<view class="explain-item__rightBox-carefulBox__content">{{ i18n.index.beTips }}</view>
						</view>
					</view> -->
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
