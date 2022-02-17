<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openLanguage" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-languageBg">
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle">
						<image :src="i18n.index.languageTitle" mode="widthFix"></image>
					</view>
					<view class="popupBox-languageContent">
						<view class="popupBox-languageContentBg">{{ i18n.index.tipsTitle }}</view>
						<view class="popupBox-languageContent__item popupBox-languageContent__item-flex">
							<!-- <view class="popupBox-languageContent__box"> -->
							<view class="popupBox-languageContent__box" v-for="(item,index) in langArray" :key="index"
							@click="check(item.value)">
								<!-- <image src="@/static/buyBox/icon-noActive.png" mode="widthFix"></image> -->
								<image :src="item.value == $store.state.initLanguage ? '../../static/buyBox/icon-active.png' : '../../static/buyBox/icon-noActive.png'" mode="widthFix"></image>
								<view class="popupBox-languageContent__box-title" :class="{'popupBox-languageContent__box-title--active' : item.value == $store.state.initLanguage}">{{ item.label }}</view>
							</view>
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__zore3" @click="hidePopup('openLanguage')">{{ i18n.index.btn01 }}</view>
						<view class="popupBox-btn__zore2" @click="checkLanguage()">{{ i18n.index.btn02 }}</view>
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
		check(value){
			this.langType = value;
			this.$store.commit('changeLanguage', this.langType);
		},
		checkLanguage(){
			this.$i18n.locale = this.langType;
			this.hidePopup('openLanguage');
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
// @import '/scss/openPopupBox';
</style>
