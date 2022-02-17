<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openLanguage" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-languageBg">
				<view class="popupBox-container">
					<view class="popupBox-header">
						<image class="popupBox-header__image" :src="require(`@/static/index/icon-open-langTitle-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
					</view>
					<view class="popupBox-languageContent">
						<view class="popupBox-languageContent__item">
							<!-- <view class="popupBox-languageContent__box"> -->
							<view class="popupBox-languageContent__box" v-for="(item,index) in langArray" :key="index"
							@click="checkLanguage(item.value)">
								<view class="popupBox-languageContent__box--activeImage">
									<image :src="item.value == $store.state.initLanguage ? '../../static/index/icon-active.png' : ''" mode=""></image>
								</view>
								<view class="popupBox-languageContent__box-title" :class="{'popupBox-languageContent__box-title--active' : item.value == $store.state.initLanguage}">{{ item.label }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="popupBox-close popupBox-close--marginB" @click="hidePopup('openLanguage')">
				<image src="@/static/public/icon-colse.png" mode="widthFix"></image>
			</view>
			
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			successData: {},
			// langArray: [],
		};
	},
	computed: {
		langArray() {
			return [
				{
					label: this.i18n.language.cn,
					value: 'cn'
				},
				{
					label: this.i18n.language.en,
					value: 'en'
				}
			];
		}
	},
	mounted() {
		var that = this;
		this.$Bus.$on('successData',function(successData){
			that.successData = successData;
		});
	},
	methods: {
		init(e){
			if(e.show){
				this.langType = uni.getStorageSync('initLanguage');
				let lang = uni.getStorageSync('initlanguage');
				if (lang == 'cn') {
					
				} else if (lang == 'en') {
					
				}
			}
		},
		checkLanguage(langType){
			this.$i18n.locale = langType;
			this.$store.commit('changeLanguage', langType);
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
// @import '/scss/openPopupBox';
</style>
