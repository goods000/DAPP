<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openPopupSelectHero" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openPopupSelectHero')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.exchange.openPopupSelectHero.title }}</view>
					<view class="popupBox-contentbg__tips popupBox-contentbg__tips--margin">{{ i18n.exchange.openPopupSelectHero.tips01 }}</view>
					<scroll-view class="myPackage__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<view class="myPackage-cardBox">
							<view class="myPackage-cardItem" :class="{'myPackage-cardItem--active':cardType == index}" v-for="(item,index) in cardList" :key="index"
							@click="changeCardType(index,item)" >
							<!-- <view class="myPackage-cardItem"> -->
								<!-- <view class="myPackage-cardItem__activeTitle">
									<image src="@/static/package/icon-title-active.png" mode="widthFix"></image>
								</view> -->
								<view class="myPackage-cardItem__cardBox">
									<image :src="item.pic" mode="widthFix"></image>
									<view class="myPackage-cardItem__cardBox-info">
										<image src="@/static/package/icon.png" mode="widthFix"></image>
										<view class="myPackage-cardItem__cardBox-info__num">{{ item.role }}</view>
									</view>
								</view>
								<!-- <view class="myPackage-cardItem__num">X2</view> -->
							</view>
						</view>
					</scroll-view>	
					<view class="popupBox-btn popupBox-btnPadding--01">
						<view class="popupBox-btn__zore3" @click="hidePopup('openPopupSelectHero')">{{ i18n.global.cancel }}</view>
						<view class="popupBox-btn__zore2" @click="submit()">{{ i18n.global.enter }}</view>
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
			scrollInto: '',
			cardType: 0,
			cardList:[],
			chooseItem:{},
		};
	},
	methods: {
		init(e) {
			this.getCardList();
		},
		getCardList() {
			this.$Ajax('/front/poker/bag',{
					address: this.$store.state.userWalletAddress
				},
				res => {
					this.cardList = res.obj;
					this.chooseItem = this.cardList[0];
				}
			);
		},
		changeCardType(index,item){
			if (this.cardType != index) {
				this.cardType = index;
				this.chooseItem = item;
			}
		},
		submit(){
			let that = this;
			that.hidePopup('openPopupSelectHero');
			that.$Bus.$emit('chooseItem',that.chooseItem);
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/pages/package/components/scss/openPopupBoxDetail';
@import 'scss/openPopupSelectHero';
</style>
