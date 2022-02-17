<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openRecord" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openRecord')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">认购记录</view>
					<view class="popupBox-contentbg">
						<scroll-view class="failureRecord-height" :scroll-y="true" :show-scrollbar="false">
							<view class="failureRecord-item" v-for="(item,index) in 10" :key="index">
								<view class="failureRecord-item__content">认购盲盒：普通盲盒</view>
								<view class="failureRecord-item__content">交易总金额(USDT)：2400</view>
								<view class="failureRecord-item__content">认购数量：10</view>
								<view class="failureRecord-item__content">交易时间：2021/11/04 19:21:22</view>
							</view>
						</scroll-view>
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
@import '/scss/openRecord';
</style>
