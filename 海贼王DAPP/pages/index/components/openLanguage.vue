<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openLanguage" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-languageBg">
				<view class="popupBox-container">
					<view class="popupBox-headerTtitle popupBox-headerTtitle__margin">
						<!-- <image :src="require(`@/static/index/icon-language-title-${$store.state.initLanguage}.png`)" mode="widthFix"></image> -->
						<image :src="i18n.index.languageTitle" mode="widthFix"></image>
					</view>
					<view class="popupBox-languageContent">
						<view class="popupBox-languageContentBg">{{ i18n.index.tipsTitle01 }}</view>
						<view class="popupBox-languageContent__item">
							<!-- <view class="popupBox-languageContent__box"> -->
							<view class="popupBox-languageContent__box" v-for="(item,index) in musicArray" :key="index"
							@click="changeMuteBgMusic()">
							<!-- @click="checkMusic()"> -->
								<!-- <image src="@/static/buyBox/icon-noActive.png" mode="widthFix"></image> -->
								<image :src="!$store.state.muteBgMusic ? '../../static/buyBox/icon-active.png' : '../../static/buyBox/icon-noActive.png'" mode="widthFix"></image>
								<view class="popupBox-languageContent__box-title" :class="{'popupBox-languageContent__box-title--active' : !$store.state.muteBgMusic}">{{ item.label }}</view>
							</view>
						</view>
					</view>
					<view class="popupBox-languageContent">
						<view class="popupBox-languageContentBg">{{ i18n.index.tipsTitle }}</view>
						<view class="popupBox-languageContent__item">
							<!-- <view class="popupBox-languageContent__box"> -->
							<view class="popupBox-languageContent__box" v-for="(item,index) in langArray" :key="index"
							@click="checkLanguage(item.value)">
							<!-- @click="check(item.value)"> -->
								<!-- <image src="@/static/buyBox/icon-noActive.png" mode="widthFix"></image> -->
								<image :src="item.value == $store.state.initLanguage ? '../../static/buyBox/icon-active.png' : '../../static/buyBox/icon-noActive.png'" mode="widthFix"></image>
								<view class="popupBox-languageContent__box-title" :class="{'popupBox-languageContent__box-title--active' : item.value == $store.state.initLanguage}">{{ item.label }}</view>
							</view>
						</view>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="hidePopup('openLanguage')">{{ i18n.global.close }}</view>
						<!-- <view class="popupBox-btn__zore3" @click="hidePopup('openLanguage')">{{ i18n.index.btn01 }}</view>
						<view class="popupBox-btn__zore2" @click="checkLanguage()">{{ i18n.index.btn02 }}</view> -->
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
	computed: {
		musicArray() {
			return [
				{label:this.i18n.music.sound},
				// {label:this.i18n.music.soundType},
			];
		},
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
			this.langType = uni.getStorageSync('initLanguage');
			let lang = uni.getStorageSync('initlanguage');
			if (lang == 'cn') {
				
			} else if (lang == 'en') {
				
			}
		},
		checkMusic(){
			this.$store.state.musicActive = !this.$store.state.musicActive;
			// this.$store.commit('changeMusicActive', this.$store.state.musicActive);
			// console.log("this.$store.state.musicActive��",this.$store.state.musicActive);
		},
		changeMuteBgMusic() {
			this.$bgMusic.playBgm({ mute: !this.$store.state.muteBgMusic });
			this.$store.commit('changeMuteBgMusic', !this.$store.state.muteBgMusic);
		},
		checkLanguage(langType){
			this.$i18n.locale = langType;
			this.$store.commit('changeLanguage', langType);
		},
		// check(value){
		// 	this.langType = value;
		// 	this.$store.commit('changeLanguage', this.langType);
		// },
		// checkLanguage(){
		// 	console.log("this.$store.state.musicActive��",this.$store.state.musicActive);
		// 	this.$i18n.locale = this.langType;
		// 	if(this.$store.state.musicActive == true){
		// 		this.changeMuteBgMusic();
		// 		this.$store.commit('changeMusicActive', !this.$store.state.musicActive);
		// 	}
		// 	this.hidePopup('openLanguage');
		// },
		openPopup(e) {			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
	.popupBox{
		&-btn{
			& > view{
				width: 46%;
			}
			&__style{
				width: 100% !important;
			}
		}
	}
</style>
