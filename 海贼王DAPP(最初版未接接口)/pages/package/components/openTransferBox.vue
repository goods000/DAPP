<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openTransferBox" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openTransferBox')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">转赠盲盒</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__titleName">中级盲盒</view>
						<view class="popupBox-contentbg__boxImage">
							<image src="@/static/package/icon-box-01.png" mode="widthFix"></image>
							<view class="popupBox-contentbg__boxImage-title">盲盒数量：
								<view class="popupBox-contentbg__boxImage-title__num">10</view>
							</view>
						</view>
					</view>
					<view class="popupBox-cardTitle">请选择转赠数量</view>
					<view class="popupBox-operate">
						<view class="popupBox-operate__btn" @click="reduceBtn()">
							<image src="@/static/public/icon-reduce.png" mode="widthFix"></image>
						</view>
						<view class="popupBox-operate__num">{{ quantity }}</view>
						<view class="popupBox-operate__btn" @click="plusBtn()">
							<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
						</view>
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
			this.$emit('openPopup', 'openTransferBoxSuccess');
			this.hidePopup('openTransferBox');
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
