<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openShopBuySuccess" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapperbg">
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image :src="require(`@/static/exchange/icon-buy-title-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentBox">
						<view class="popupBox-contentBox__tips">{{ i18n.shop.openShopBuySuccess.title }}！</view>
						<view class="popupBox-contentBox__tipsContent">{{ i18n.shop.openShopBuySuccess.tips01 }}<text class="popupBox-contentBox__tipsContent--3">{{ successData.quantity }}个{{ successData.name }}</text>{{ i18n.shop.openShopBuySuccess.tips02 }}</view>
					</view>
					<view class="popupBox-btn">
						<view class="popupBox-btn__style" @click="hidePopup('openShopBuySuccess')">{{ i18n.global.finish }}</view>
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
		})
	},
	methods: {
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openShopBuySuccess';
</style>
