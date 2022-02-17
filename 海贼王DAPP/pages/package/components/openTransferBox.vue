<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openTransferBox" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openTransferBox')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.package.openTransferBox.title }}</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__titleName">{{ boxDetails.ubxName }}</view>
						<view class="popupBox-contentbg__boxImage">
							<image :src="boxDetails.pic" mode="widthFix"></image>
							<view class="popupBox-contentbg__boxImage-title">{{ i18n.package.openTransferBox.tips01 }}：
								<view class="popupBox-contentbg__boxImage-title__num">1</view>
							</view>
						</view>
					</view>
					<!-- <view class="popupBox-cardTitle">请选择转赠数量</view>
					<view class="popupBox-operate">
						<view class="popupBox-operate__btn" @click="reduceBtn()">
							<image src="@/static/public/icon-reduce.png" mode="widthFix"></image>
						</view>
						<view class="popupBox-operate__num">{{ quantity }}</view>
						<view class="popupBox-operate__btn" @click="plusBtn()">
							<image src="@/static/public/icon-plus.png" mode="widthFix"></image>
						</view>
					</view> -->
					<view class="popupBox-input">
						<input type="text" :placeholder="i18n.package.openTransferBox.enterTitle" v-model="address" placeholder-class="popupBox-input__style"/>
					</view>
					<view class="popupBox-btn popupBox-btnPadding">
						<view class="popupBox-btn__style" @click="transfer">{{ i18n.package.openTransferBox.btn }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['boxDetails', 'randomValue'],
	data() {
		return {
			checkActive: '',
			quantity: 10,
			address:'',
		};
	},
	watch: {
		randomValue(newValue) {
			this.init();
		},
	},
	methods: {
		transfer(){
			// this.$emit('openPopup', 'openTransferBoxSuccess');
			// this.hidePopup('openTransferBox');
			// this.address = '';
			if (this.address == '') {
				return this.$tools.toast(this.i18n.package.openTransferBox.toast01);
			}
			this.$Ajax('',{
					address: this.$store.state.userWalletAddress,
					quantity: this.quantity,
					address: this.address,
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						that.$tools.toastJump(this.i18n.package.openTransferBox.toast02, './safety');
						this.$emit('openPopup', 'openPopupBoxDetail');
						this.hidePopup('openPopupBox');
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
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openPopupBox';
</style>
