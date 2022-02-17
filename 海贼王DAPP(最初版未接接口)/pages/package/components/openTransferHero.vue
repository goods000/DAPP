<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openTransferHero" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openTransferHero')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">转赠海贼英雄</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__tips">请选择转赠海贼英雄</view>
						<view class="popupBox-contentbg__info">
							<view class="popupBox-contentbg__cardImage" v-for="(item,index) in 2" :key="index">
								<view class="popupBox-contentbg__cardImage--bg" :class="{'popupBox-contentbg__cardImage--border' : index == 0 }">
									<image v-if="index == 0" src="@/static/public/icon-plus.png" mode="widthFix" class="popupBox-contentbg__cardImage--close"></image>
									<image v-if="index == 0" src="@/static/package/icon-card.png" mode="widthFix" class="popupBox-contentbg__cardImage--card"></image>
									<image v-else src="" mode="widthFix" class="popupBox-contentbg__cardImage--card"></image>
								</view>
								<view class="popupBox-contentbg__imageNum" v-if="index == 0">6/10</view>
								<view class="popupBox-contentbg__imageTitle" v-if="index == 1">添加其他卡牌</view>
							</view>
						</view>
					</view>
					<view class="popupBox-contentbg__boxImage-title">已选择海贼英雄(张)：
						<view class="popupBox-contentbg__boxImage-title__num">06</view>
					</view>
					<view class="popupBox-input">
						<input type="text" placeholder="长按粘贴或输入转赠钱包地址" v-model="address" placeholder-class="popupBox-input__style"/>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="transfer">转赠</view>
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
		reduceBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			if(this.inventory == this.quantity){
				this.$tools.toast('库存达到最大数量');
				this.quantity = this.inventory;
			}else{
				this.quantity++;
			}
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopupBox';
</style>
