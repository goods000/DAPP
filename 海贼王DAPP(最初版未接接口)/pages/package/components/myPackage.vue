<template>
	<view class="myPackage">
		<view class="myPackage-header">
			<image src="@/static/package/icon-header.png" mode="widthFix"></image>
		</view>
		<view class="myPackage-box">
			<view class="myPackage-btnBox">
				<view class="myPackage-btnBox__item" :class="{ 'myPackage-btnBox__item--active': tabActive == 0 }" @click="changeTabsActive(0)">
					<view class="myPackage-btnBox__item-title" :class="{ 'myPackage-btnBox__item-title--active': tabActive == 0 }">我的海贼 62</view>
				</view>
				<view class="myPackage-btnBox__item" :class="{ 'myPackage-btnBox__item--active': tabActive == 1 }" @click="changeTabsActive(1)">
					<view class="myPackage-btnBox__item-title" :class="{ 'myPackage-btnBox__item-title--active': tabActive == 1 }">我的盲盒 12</view>
				</view>
			</view>
			<template v-if="tabActive == 0">
				<view>
					<view class="myPackage-tipsBox">
						<view class="myPackage-tipsBox__item">
							<view class="myPackage-tipsBox__item-title">我的海贼收集：</view>
							<view class="myPackage-tipsBox__item-num">24/60</view>
						</view>
						<view class="myPackage-tipsBox__item">
							<view class="myPackage-tipsBox__item-title">海贼筛选：</view>
							<view class="myPackage-tipsBox__item-num">已装备</view>
							<view class="myPackage-tipsBox__item-open" :class="navigateFlag ? 'myPackage-tipsBox__item-open--active' : ''">
								<image src="@/static/package/sort.png" mode="widthFix" @click="triggerCollapse()"></image>
							</view>
						</view>
					</view>
					<scroll-view class="myPackage__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<view class="myPackage-cardBox">
							<view class="myPackage-cardItem myPackage-cardItem--active" v-for="(item,index) in 10" :key="index"
							@click="openDetail" >
							<!-- <view class="myPackage-cardItem"> -->
								<view class="myPackage-cardItem__activeTitle">
									<image src="@/static/package/icon-title-active.png" mode="widthFix"></image>
								</view>
								<view class="myPackage-cardItem__cardBox">
									<image src="@/static/package/icon-card.png" mode="widthFix"></image>
									<view class="myPackage-cardItem__cardBox-info">
										<image src="@/static/package/icon.png" mode="widthFix"></image>
										<view class="myPackage-cardItem__cardBox-info__num">130087</view>
									</view>
								</view>
								<view class="myPackage-cardItem__num">X2</view>
							</view>
						</view>
					</scroll-view>	
				</view>
			</template>
			<template v-if="tabActive == 1">
				<scroll-view class="myPackage__height1" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
				<view class="myPackage-typeBox">
					<view class="myPackage-typeBox__item" v-for="(item,index) in 3">
						<view class="typeBox-image">
							<image src="@/static/package/icon-type-1.png" mode="widthFix" v-if="index ==0"></image>
							<image src="@/static/package/icon-type-2.png" mode="widthFix" v-if="index ==1"></image>
							<image src="@/static/package/icon-type-3.png" mode="widthFix" v-if="index ==2"></image>
						</view>
						<view class="typeBox-details">
							<view class="typeBox-details__nameZh">普通盲盒</view>
							<view class="typeBox-details__nameEn">Ordinary blind box</view>
							<view class="typeBox-details__numBox">
								<view class="typeBox-details__numBox-numtitle">盲盒数量：</view>
								<view class="typeBox-details__numBox-num">10</view>
							</view>
							<view class="typeBox-details__btnBox">
								<view class="typeBox-details__btnBox-tranfer" @click="openTransferBox">转增</view>
								<view class="typeBox-details__btnBox-open" @click="openBox">开启</view>
							</view>
						</view>
					</view>
				</view>
				</scroll-view>	
			</template>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tabActive: 0,
				navigateFlag: false,
				scrollInto: "",
			}
		},
		onShow() {
			this.navigateFlag = false;
		},
		methods:{
			init(){
				this.tabActive == 0
				this.changeTabsActive(0);
			},
			// 查看卡片详情
			openDetail(){
				this.$emit('openPopup', 'openPopupDetail');
			},
			// 开启盲盒
			openBox(){
				this.$emit('openPopup', 'openPopupBox');
			},
			// 开启盲盒
			openTransferBox(){
				this.$emit('openPopup', 'openTransferBox');
			},
			triggerCollapse() {
				this.navigateFlag = !this.navigateFlag;
			},
			changeTabsActive(index){
				if (this.tabActive != index) {
					this.tabActive = index;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
@import '/scss/myPackage';
</style>
