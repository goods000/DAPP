<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openShopBuySuccess" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapperbg">
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image src="@/static/exchange/icon-buy-title.png" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentBox">
						<view class="popupBox-contentBox__tips">恭喜你！</view>
						<view class="popupBox-contentBox__tipsContent">已成功购买<text>10个紫色盲盒</text>可前往 海贼英雄池 进行查看</view>
					</view>
					<view class="popupBox-btn">
						<view class="popupBox-btn__zore3" @click="hidePopup('openShopBuySuccess')">取消</view>
						<view class="popupBox-btn__zore2" >前往英雄池</view>
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
	methods: {
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openShopBuySuccess';
</style>
