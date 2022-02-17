<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openSellingHeroes" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openSellingHeroes')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">挂卖海贼英雄</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">请选择挂卖的海贼英雄</view>
						<view class="popupBox-contentbg__info">
							<view class="popupBox-contentbg__cardImage">
								<view class="popupBox-contentbg__cardImage--bg" :class="{'popupBox-contentbg__cardImage--border' : heroImage != heroImageTest }">
									<image v-if="heroImage != heroImageTest" src="@/static/public/icon-plus.png" mode="widthFix" class="popupBox-contentbg__cardImage--close"></image>
									<image :src="heroImage" mode="widthFix" class="popupBox-contentbg__cardImage--card" @click="chioce"></image>
								</view>
								<view class="popupBox-contentbg__imageNum" v-if="heroImage != heroImageTest">6/10</view>
								<view class="popupBox-contentbg__imageTitle" v-else>添加海贼英雄</view>
							</view>
						</view>
					</view>
					<view class="popupBox-contentbg__boxImage-title">已选择海贼英雄(张)：
						<view class="popupBox-contentbg__boxImage-title__num">{{ heroImage == heroImageTest ? '--' : '06' }}</view>
					</view>
					<view class="popupBox-cardTitle">请选择出售方式</view>
					<view class="popupBox-chioceBox">
						<view class="popupBox-chioce" v-for="(item,index) in ruleList" :key="index"  @click="agreement(index,item.id,item.version)">
							<label class="popupBox-chioce__box" :class="[item.version ? 'popupBox-chioce__box--active' : '']">
								<!-- <view class="checkbox" ></view> -->
							</label>
							<view class="popupBox-chioce__title" :class="[item.version ? 'popupBox-chioce__title--active' : '']" v-if="index == 0">一口价</view>
							<view class="popupBox-chioce__title" :class="[item.version ? 'popupBox-chioce__title--active' : '']" v-if="index == 1">荷兰式拍卖</view>
							<view class="popupBox-chioce__title" :class="[item.version ? 'popupBox-chioce__title--active' : '']" v-if="index == 2">英式拍卖</view>
						</view>
					</view>
					<view class="popupBox-input">
						<input type="text" placeholder="请输入出售单价" v-model="price" placeholder-class="popupBox-input__style"/>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="transfer">挂单</view>
						<!-- <view class="popupBox-btn__grey" @click="transfer">挂单</view> -->
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
			price:'',
			heroImageTest:'@/static/package/icon-card.png',
			heroImage:'@/static/package/icon-card.png',
			ruleList:[
				{version: false},
				{version: false},
				{version: false},
			]
		};
	},
	methods: {
		// 选择
		chioce(){
			this.$emit('openPopup', 'openPopupSelectHero');
		},
		transfer(){
			this.$emit('openPopup', 'openTransferHeroSuccess');
			this.hidePopup('openTransferHero');
			this.address = '';
			// if (this.address == '') {
			// 	return this.$tools.toast('请输入转赠钱包地址');
			// }
			// this.$Ajax('',{
			// 		quantity: this.quantity,
			// 		address: this.address,
			// 	},
			// 	res => {
			// 		console.log(JSON.stringify(res));
			// 		if (res.code == 0) {
			// 			that.$tools.toastJump('修改成功', './safety');
			// 			this.$emit('openPopup', 'openPopupBoxDetail');
			// 			this.hidePopup('openPopupBox');
			// 			this.address = '';
			// 		}
			// 	}
			// );
		},
		agreement(i,fclId,version){
			console.log("i：",i);
			this.ruleList.filter((item,j) => {
				if(i == j){
					item.version = !item.version;
					if(item.version == false){
						this.fclId = '';
					}else{
						this.fclId = fclId;
					}
				}else{
					item.version = 0;
					this.fclId == '';
				}
			})
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/pages/package/components/scss/openPopupBox';
@import 'scss/openSellingHeroes';
</style>
