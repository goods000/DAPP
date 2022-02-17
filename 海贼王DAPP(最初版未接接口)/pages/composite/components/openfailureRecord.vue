<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openfailureRecord" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openfailureRecord')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">失败记录</view>
					<view class="popupBox-contentbg">
						<scroll-view class="failureRecord-height" :scroll-y="true" :show-scrollbar="false">
							<view class="failureRecord-item" v-for="(item,index) in 5" :key="index">
								<view class="failureRecord-item__box">
									<view class="failureRecord-item__content">合成英雄：月光</view>
									<view class="failureRecord-item__content">预计品质：<text class="failureRecord-item__content--active">A → S</text></view>
								</view>
								<view class="failureRecord-item__content">合成消耗英雄价值：2400 (* 3）</view>
								<view class="failureRecord-item__content">失败返还：3600</view>
								<view class="failureRecord-item__content">失败锁仓：2880</view>
								<view class="failureRecord-item__content">失败销毁：720</view>
								<view class="failureRecord-item__content">时间：2021/11/04 19:21:22</view>
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
@import '/scss/openfailureRecord';
</style>
