<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openResult" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openResult')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image v-if="resultInfo == null" :src="require(`@/static/composite/icon-composite-fail-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
						<image v-else :src="require(`@/static/composite/icon-composite-success-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
						<!-- <image v-if="resultInfo == ''" src="@/static/composite/icon-composite-fail.png" mode="widthFix"></image>
						<image v-else src="@/static/composite/icon-composite-success.png" mode="widthFix"></image> -->
					</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips" v-if="resultInfo == null" >{{ i18n.composite.openResult.tips01 }}</view>
						<view class="popupBox-contentbg__tips" v-else>{{ i18n.composite.openResult.tips02 }}：</view>
						<view class="popupBox-contentbg__boxImage">
							<!-- <view class="popupBox-cardMargin" v-if="resultInfo == null">
								<view class="popupBox-cardItem">
									<image src="@/static/composite/icon-card-fail.png" mode="widthFix"></image>
								</view>
							</view> -->
							<view class="popupBox-cardbg" v-if="resultInfo != null">
								<view class="popupBox-border">
									<view class="popupBox-cardItem">
										<image :src="resultInfo.pic" mode="widthFix"></image>
									</view>
								</view>
							</view>
							
							<view class="popupBox-contentbg__boxImage-name" v-if="resultInfo != null" >
								{{ resultInfo.role }}
								<view class="popupBox-contentbg__boxImage-name__num">{{ resultInfo.color }}</view>
							</view>
							<!-- <view class="popupBox-contentbg__tips">已为您即时返还 5 {{ $store.state.projectCurrencyName }}</view> -->
							<view class="popupBox-contentbg__tips" v-if="resultInfo == null">{{ i18n.composite.openResult.tips03 }}</view>
							<view class="popupBox-contentbg__tips" v-if="resultInfo == null">{{ i18n.composite.openResult.tips04 }}</view>
							
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openResult')" v-if="resultInfo == null">{{ i18n.global.ISee }}</view>
						<view class="popupBox-btn__style" @click="hidePopup('openResult')" v-else>{{ i18n.global.finish }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props:['resultInfo'],
	data() {
		return {
			checkActive: '',
			quantity: 10,
			address:'',
		};
	},
	methods: {
		init(e){
			console.log("resultInfo：",this.resultInfo);
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openResult';
</style>
