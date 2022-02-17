<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openCardSlotUpgrade" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openCardSlotUpgrade')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">卡槽升级</view>
					<view class="popupBox-contentbg">
						<view class="upgrade">
							<view class="upgrade-header">
								<view class="upgrade-header__image">
									<image src="@/static/mining/icon-mining-header.png" mode="widthFix"></image>
								</view>
								<view class="upgrade-box">
									<view class="upgrade-box__item">
										<view class="upgrade-box__item-name">汉库克卡槽</view>
										<view class="upgrade-box__item-dataBox">
											<view class="upgrade-box__item-dataBox__num">+1900</view>
											<image src="@/static/mining/icon-mining-level.png" mode="widthFix"></image>
										</view>
									</view>
									<view class="upgrade-box__item">
										<view class="upgrade-box__item-num">LV2<text>/10</text></view>
										<view class="upgrade-box__item-num">100/200</view>
									</view>
									<view class="upgrade-box__item">
										<view class="upgrade-box__item-content">
											<view class="upgrade-box__item-content__chart">
												<view class="upgrade-box__item-content__chart-line" :style="{ width: ((100 / 200) *100) + '%' }"></view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="popupBox-titleTips">
								<view class="popupBox-titleTips__bg">英雄库</view>
								<view class="popupBox-titleTips__line"></view>
							</view>
							<view class="">
								<scroll-view class="myPackage__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
									<view class="myPackage-cardBox">
										<view class="myPackage-cardItem" :class="{'myPackage-cardItem--active':index < 3 }" v-for="(item,index) in 10" :key="index"
										@click="changeCardType(index)" >
											<image v-if="index < 3" src="@/static/public/icon-reduce.png" mode="widthFix" class="myPackage-cardItem--close"></image>
											<view class="myPackage-cardItem__cardBox">
												<image src="@/static/package/icon-card.png" mode="widthFix"></image>
											</view>
										</view>
									</view>
								</scroll-view>	
							</view>
							
							<view class="popupBox-titleTips">
								<view class="popupBox-titleTips__bg">已选择</view>
								<view class="popupBox-titleTips__line"></view>
							</view>
							<view class="upgrade-levelBox">
								<view class="upgrade-levelBox__image" v-for="(item,index) in uploadList" :key="index" v-if="uploadList != ''">
									<!-- <image :src="item" mode="widthFix" @click="chooseImg(item)"></image> -->
									<view class="upgrade-levelBox__image-bg" :style="'background-image: url( '+ item +');background-size: 100% 100%;background-repeat: no-repeat;'"
									 @click="chooseImg(item)">
									</view>
									<view class="upgrade-levelBox__image-num">X1</view>
								</view>
								<view class="upgrade-levelBox__image" v-if="uploadList.length < 5">
									<view class="upgrade-levelBox__image-bg" :style="'background-image: url( '+ upload +');background-size: 100% 100%;background-repeat: no-repeat;'"
									 @click="chooseImg()">
									</view>
								</view>
							</view>
						</view>
						
					</view>
					<view class="popupBox-btn popupBox-btnPadding--01">
						<view class="popupBox-btn__zore3" @click="hidePopup('openCardSlotUpgrade')">取消</view>
						<view class="popupBox-btn__zore2" @click="submit()">升级卡槽</view>
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
			cardType: '',
			upload: [
				'@/static/public/img-upload-2.png',
			],
			uploadList: [
				'@/static/mining/icon-mining-btnBg.png',
				'@/static/mining/icon-mining-02.png',
				'@/static/mining/icon-mining-03.png',
				'@/static/mining/icon-mining-04.png',
			],
		};
	},
	methods: {
		submit(){
			
		},
		init(){
			this.cardType == 0;
		},
		chooseImg(type) {
			let that = this;
			var token = uni.getStorageSync('token');
			uni.chooseImage({
				count: 9, //默认9
				sizeType: ["compressed"],//可以指定是原图还是压缩图，默认二者都有
				// sourceType: ['camera', 'album'], //从相册选择
				sourceType: ['album'], //从相册选择
				success: res => {
					console.log(res.tempFilePaths);
					console.log("type",type);
					if(this.uploadList.length <= 9){
						if(type != undefined){
							this.uploadList.forEach((item,index) => {
								if(type == item){
									// this.uploadList.remove(type);
									this.uploadList.splice(index,1,res.tempFilePaths[0]);
									console.log("this.uploadList---1",this.uploadList)
								}
							})
						}else{
							this.uploadList = this.uploadList.concat(res.tempFilePaths);
							console.log("this.uploadList---2",this.uploadList)
						}
					}
				},
				fail: function() {
					console.log('上传图片接口调用失败');
					return;
				}
			});
		},
		changeCardType(index){
			if (this.cardType != index) {
				this.cardType = index;
			}
		},
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import 'scss/openCardSlotUpgrade';
</style>
