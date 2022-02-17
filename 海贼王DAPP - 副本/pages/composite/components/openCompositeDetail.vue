<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openCompositeDetail" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openCompositeDetail')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.composite.openCompositeDetail.title }}</view>
					<view class="popupBox-content">
						<view class="detailBox">
							<view class="detailBox-image">
								<image :src="((detailInfo.pokerList || {})[detailIndex] || {}).pic" mode="widthFix"></image>
							</view>
							<!-- <image class="detailBox-nextBtn" src="@/static/shop/icon-shop-rightBtn.png" mode="widthFix"></image>
							<view class="detailBox-image">
								<image  :src="((detailInfo.pokerList || {})[detailIndex + 1] || {}).pic" mode="widthFix"></image>
							</view> -->
						</view>
						
						<view class="popupBox-content__name">{{ ((detailInfo.pokerList || {})[detailIndex] || {}).role }}</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">{{ i18n.composite.openCompositeDetail.heroTitle01 }}：</view>
							<view class="popupBox-content__item-info popupBox-content__item-info--active">{{ detailInfo.color }} → {{ detailInfo.nextColor }}</view>
						</view>
						<view class="popupBox-content__item">
							<view class="popupBox-content__item-title">{{ i18n.composite.openCompositeDetail.heroTitle02 }}：</view>
							<view class="popupBox-content__item-info">{{ detailInfo.currencyHashRate }} → {{ detailInfo.nextHashRate }}</view>
						</view>
					</view>
					<view class="popupBox-cardTitle">{{ i18n.composite.openCompositeDetail.tips01 }}</view>
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
						<view class="popupBox-input__style">{{ i18n.composite.openCompositeDetail.tips02 }}：<text>{{ (detailInfo.successMap || {})[quantity] }}%</text></view>
						<!-- <input type="text" disabled="disabled" :value="'当前合成成功率：'+fee" placeholder-class="popupBox-input__style"/> -->
					</view>
					<view class="popupBox-btn popupBox-btnPadding--01">
						<view class="popupBox-btn__style" @click="openComposite">{{ i18n.composite.openCompositeDetail.btn01 }}</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props:['detailInfo', 'detailIndex', 'randomValue'],
	data() {
		return {
			quantity: 1,
		};
	},
	watch: {
		randomValue(newValue) {
			this.init();
		}
	},
	methods: {
		init(e){
			// console.log("detailInfo：",this.detailInfo,this.detailIndex);
			this.quantity = 1;
		},
		openComposite(){
			// let obj = null;
			// let obj = {
			// 	pic: '@/static/composite/icon-card-fail.png',
			// 	rolo:'银熊',
			// 	color:'黑色'
			// };
			// console.log("res.obj ：",obj );
			// if(obj == null){
			// 	console.log(111)
			// 	this.$emit('openPopup', 'openResult', obj);
			// }else{
			// 	console.log(222)
			// 	this.$emit('openPopup', 'openResult', obj);
			// }
			this.$Ajax('/front/poker/combine', {
				colorId: this.detailInfo.colorId,
				count: this.quantity,
				roleId: this.detailInfo.pokerList[this.detailIndex].roleId
			}, res=>{
				this.$emit('refreshData');
				this.hidePopup('openCompositeDetail');
				if(res.obj == null){
					this.$emit('openPopup', 'openResult', res.obj);
				}else{
					this.$emit('openPopup', 'openResult', res.obj);
				}
			})
		},
		checkType(index){
			if (this.checkActive != index) {
				this.checkActive = index;
			}
		},
		reduceBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			if (this.quantity < this.detailInfo.pokerList[this.detailIndex].count) {
				this.quantity++;
			}
		},
		openPopup(e,item) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openCompositeDetail';
</style>
