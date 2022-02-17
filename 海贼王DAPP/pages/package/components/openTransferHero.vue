<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openTransferHero" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openTransferHero')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.package.openTransferHero.title }}</view>
					<view class="popupBox-contentbg">
						<!-- <view class="popupBox-contentbg__tips">请选择转赠海贼海贼</view> -->
						<view class="popupBox-contentbg__info">
							<!-- <view class="popupBox-contentbg__cardImage" v-for="(item,index) in 1" :key="index"> -->
							<view class="popupBox-contentbg__cardImage">
								<view class="popupBox-contentbg__cardImage--bg popupBox-contentbg__cardImage--border">
									<!-- <image v-if="index == 0" src="@/static/public/icon-plus.png" mode="widthFix" class="popupBox-contentbg__cardImage--close"></image> -->
									<image :src="heroDetails.pic" mode="widthFix" class="popupBox-contentbg__cardImage--card"></image>
									<!-- <image v-else src="" mode="widthFix" class="popupBox-contentbg__cardImage--card"></image> -->
								</view>
								<view class="popupBox-contentbg__imageNum">{{ heroDetails.role }}</view>
								<!-- <view class="popupBox-contentbg__imageTitle">{{ heroDetails.role }}</view> -->
							</view>
						</view>
					</view>
					<!-- <view class="popupBox-contentbg__boxImage-title">已选择海贼海贼(张)：
						<view class="popupBox-contentbg__boxImage-title__num">01</view>
					</view> -->
					<view class="popupBox-contentbg__tips">{{ i18n.package.openTransferHero.walletAddress }}</view>
					<view class="popupBox-input">
						<input type="text" :placeholder="i18n.package.openTransferBox.enterTitle" v-model="address" placeholder-class="popupBox-input__style"/>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__zore3"  @click="hidePopup('openTransferHero')">{{ i18n.global.cancel }}</view>
						<view class="popupBox-btn__zore2" @click="transfer">{{ i18n.package.openTransferBox.btn }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props:['heroDetails'],
	data() {
		return {
			checkActive: '',
			quantity: 10,
			address:'',
		};
	},
	// mounted() {
	// 	this.init();
	// },
	methods: {
		init(){
			console.log("heroDetails：",this.heroDetails);
		},
		transfer(){
			// this.$emit('openPopup', 'openTransferHeroSuccess',this.heroDetails);
			if (this.address == '') {
				return this.$tools.toast(this.i18n.package.openTransferHero.toast01);
			}
			this.$Ajax('/front/poker/send',{
					pokerId: this.heroDetails.id,
					target: this.address,
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$emit('refreshData');
						this.$emit('openPopup', 'openTransferHeroSuccess',this.heroDetails);
						this.hidePopup('openTransferHero');
						this.address = '';
					}
				}
			);
		},
		reduceBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			this.quantity++;
		},
		openPopup(e) {			
			console.log(e)			
			this.$refs[e].$refs[e].open();		
		},		
		hidePopup(e) {			
			this.$refs[e].close();		
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopupBox';
</style>
