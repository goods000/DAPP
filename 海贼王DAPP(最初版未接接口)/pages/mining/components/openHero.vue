<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openHero" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openHero')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header" v-if="!checkValue">替换英雄</view>
					<view class="popupBox-header" v-else>装备英雄</view>
					<view class="popupBox-content">
						<view class="popupBox-content__name">波雅.汉库克</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">英雄等级：</view>
							<view class="popupBox-content__item-info popupBox-content__item-info--active" v-if="!checkValue">SS →S
							<image src="@/static/mining/icon-mining-up.png" mode="widthFix"></image></view>
							<view class="popupBox-content__item-info popupBox-content__item-info--active" v-else>SS (金色)</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">英雄战力：</view>
							<view class="popupBox-content__item-info" v-if="!checkValue">1000000 → 10000
							<image src="@/static/mining/icon-mining-down.png" mode="widthFix"></image></view>
							<view class="popupBox-content__item-info" v-else>87620</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">卡槽等级：</view>
							<view class="popupBox-content__item-info">Lv.6</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">卡槽加成：</view>
							<view class="popupBox-content__item-info">20000</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">总战力值：</view>
							<view class="popupBox-content__item-info" v-if="!checkValue">1020000 → 10200
							<image src="@/static/mining/icon-mining-down.png" mode="widthFix"></image></view>
							<view class="popupBox-content__item-info" v-else>107620</view>
						</view>
					</view>
					<view class="popupBox-cardTitle">装备选择</view>
					<view class="popupBox-card">
						<view class="popupBox-cardBox" v-for="(item,index) in 3" :key="index" :class="{'popupBox-cardBox--grayscale' : typeActive != index }"
						@click="checkType(index)">
							<view class="popupBox-cardBox__activeTitle" v-if="index == 0">
								<image src="@/static/package/icon-title-active.png" mode="widthFix"></image>
							</view>
							<image class="popupBox-cardBox__image" src="@/static/package/icon-card.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="popupBox-btn">
						<view class="popupBox-btn__zore1" v-if="!checkValue" @click="hidePopup('openHero')">取消</view>
						<view class="popupBox-btn__zore2" v-if="!checkValue" @click="config">替换英雄</view>
						<view class="popupBox-btn__style" v-if="checkValue" @click="config">装备英雄</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props:{
		checkValue : Boolean,
	},
	data() {
		return {
			typeActive: '',
		};
	},
	created() {
		this.config()
	},
	methods: {
		config(){
			this.$on("myFun",(checkActive)=>{   
				//这里最好用箭头函数，不然this指向有问题
				this.checkValue = checkActive      
				console.log('checkActive：',checkActive);
			})
			console.log('checkValue：',this.checkValue);
		},
		openTransferHero(){
			this.$emit('openPopup', 'openTransferHero');
			this.hidePopup('openHero');
		},
		checkType(index){
			if (this.typeActive != index) {
				this.typeActive = index;
			}
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/pages/package/components/scss/openPopupDetail';
</style>
