<template>
	<view class="myPackage">
		<view class="myPackage-header">
			<image src="@/static/composite/icon-header.png" mode="widthFix"></image>
		</view>
		<view class="myPackage-box">
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
						<view class="myHero-cardItem" v-for="(item,index) in 10" :key="index"
						@click="openDetail" >
							<view class="myPackage-cardItem myPackage-cardItem--active">
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
							<view class="myHero-btn">可合成</view>
						</view>
					</view>
				</scroll-view>	
				<view class="myHero-recordTips" @click="openRecords">合成失败记录</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
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
			// 查看英雄详情
			openDetail(){
				this.$emit('openPopup', 'openCompositeDetail');
			},
			// 查看合成失败记录
			openRecords(){
				this.$emit('openPopup', 'openfailureRecord');
			},
			triggerCollapse() {
				this.navigateFlag = !this.navigateFlag;
			},
		}
	}
</script>

<style lang="scss" scoped>
@import '@/pages/package/components/scss/myPackage';
@import '/scss/myHero'
</style>
