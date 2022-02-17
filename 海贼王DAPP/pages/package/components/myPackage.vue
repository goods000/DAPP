<template>
	<view class="myPackage">
		<view class="myPackage-header">
			<image :src="require(`@/static/package/icon-header-${$store.state.initLanguage}.png`)" mode="widthFix"></image>
		</view>
		<view class="myPackage-box">
			<view class="myPackage-btnBox">
				<view class="myPackage-btnBox__item" :class="{ 'myPackage-btnBox__item--active': tabActive == 0 }" @click="changeTabsActive(0)">
					<view class="myPackage-btnBox__item-title" :class="{ 'myPackage-btnBox__item-title--active': tabActive == 0 }">{{ i18n.package.myPackage.tabTips01 }} {{ heroTotal }}</view>
				</view>
				<view class="myPackage-btnBox__item" :class="{ 'myPackage-btnBox__item--active': tabActive == 1 }" @click="changeTabsActive(1)">
					<view class="myPackage-btnBox__item-title" :class="{ 'myPackage-btnBox__item-title--active': tabActive == 1 }">{{ i18n.package.myPackage.tabTips02 }} {{ BoxTotal }}</view>
				</view>
			</view>
			<template v-if="tabActive == 0">
				<view>
					<view class="myPackage-tipsBox">
						<!-- <view class="myPackage-tipsBox__item">
							<view class="myPackage-tipsBox__item-title">我的海贼收集：</view>
							<view class="myPackage-tipsBox__item-num">24/60</view>
						</view>
						<view class="myPackage-tipsBox__item">
							<view class="myPackage-tipsBox__item-title">海贼筛选：</view>
							<view class="myPackage-tipsBox__item-num">已装备</view>
							<view class="myPackage-tipsBox__item-open" :class="navigateFlag ? 'myPackage-tipsBox__item-open--active' : ''">
								<image src="@/static/package/sort.png" mode="widthFix" @click="triggerCollapse()"></image>
							</view>
						</view> -->
					</view>
					<scroll-view class="myPackage__height" :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<view class="myPackage-cardBox">
							<!-- unlock 1 解锁 pokerId == 0 可装备 -->
							<view class="myPackage-cardItem myPackage-cardItem--active" v-for="(item,index) in heroList" :key="index"
							v-if="(tabActive == 0 && item.unlock != 0)"
							@click="openPopup('openPopupDetail', item)">
							<!-- @click="openPopup('openTransferHero', item)"> -->
							<!-- > -->
							<!-- <view class="myPackage-cardItem"> -->
								<view class="myPackage-cardItem__activeTitle" v-if="item.unlock == 1 && item.pokerId != 0">
									<image src="@/static/package/icon-title-active.png" mode="widthFix"></image>
								</view>
								<view class="myPackage-cardItem__cardBox">
									<!-- <image src="@/static/package/icon-card.png" mode="widthFix"></image> -->
									<image :src="item.pic" mode="widthFix"></image>
									<view class="myPackage-cardItem__cardBox-info">
										<image src="@/static/package/icon.png" mode="widthFix"></image>
										<view class="myPackage-cardItem__cardBox-info__num">{{ item.baseHashRate }}</view>
									</view>
								</view>
								<view class="myPackage-cardItem__num":class="[
									{ 'myPackage-cardItem__num--grey': item.color == null },
									{ 'myPackage-cardItem__num--grey': item.color == '灰色' },
									{ 'myPackage-cardItem__num--purple': item.color == '紫色' },
									{ 'myPackage-cardItem__num--ashen': item.color == '黑色' },
									{ 'myPackage-cardItem__num--red': item.color == '红色' },
									{ 'myPackage-cardItem__num--yellow': item.color == '黄色' }
								]">X1</view>
							</view>
						</view>
					</scroll-view>	
				</view>
			</template>
			<template v-if="tabActive == 1">
				<scroll-view class="myPackage__height1" :scroll-y="true"  @scrolltolower="scrolltolower">
				<view class="myPackage-typeBox">
					<view class="myPackage-typeBox__item" v-for="(item,index) in boxList" @click="openPopup('openPopupBox', item)">
						<view class="typeBox-details">
							<view class="typeBox-details__nameZh">{{ item.ubxName }}</view>
						</view>
						<view class="typeBox-image">
							<image :src="item.pic" mode="widthFix"></image>
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
		props: ['randomValue'],
		// props: ['tabActive','randomValue'],
		data(){
			return{
				tabActive: 0,
				navigateFlag: false,
				scrollInto: "",
				pageNum: 1,
				pageSize: 20,
				pages: 1,
				hero:[],
				heroList:[],
				boxList:[],
				heroTotal: 0, // 海贼海贼总数
				BoxTotal: 0, // 盲盒总数
			}
		},
		watch: {
			randomValue(newValue) {
				this.init();
			},
			// tabActive(newValue) {
			// 	if (newValue == 0) {
			// 		this.init();
			// 	}
			// }
		},
		mounted() {
			this.navigateFlag = false;
			var that = this;
			this.heroTotal = 0;
			this.BoxTotal = 0;
			this.hero = [];
			this.boxList = [];
			this.init();
			// that.$Bus.$on('removeBoxById',function(e){
			// 	that.boxList.forEach((item,index) => {
			// 		if(item.id == e){
			// 			that.boxList.splice(item, 1);
			// 			console.log("item.id：",item.id,"----that.boxList：",that.boxList);
			// 			console.log("heroTotal：",that.heroTotal,"----that.BoxTotal：",that.BoxTotal);
			// 			// that.heroTotal ++;
			// 			if(that.BoxTotal != 0){
			// 				that.BoxTotal --;
			// 			}
			// 			that.myHeroList();  // 我的海贼海贼
			// 		}
			// 	})
			// })
		},
		// watch:{
		// 	heroTotal(){
		// 		return this.heroList.length
		// 	}
		// },
		methods:{
			init(){
				this.hero = [];
				this.heroTotal = 0;
				this.BoxTotal = 0;
				this.boxList = [];
				this.heroList = [];
				this.myHeroList();  // 我的海贼海贼
				this.myboxList();   // 我的盲盒
			},
			// 我的海贼海贼
			myHeroList(){
				this.$Ajax('/front/poker/bag',{
				// this.$Ajax('/front/slot/list',{
						address: this.$store.state.userWalletAddress
					},
					res => {
						this.heroList = res.obj;
						// res.obj.forEach((item,index) => {
						// 	if(item.unlock != 0){
						// 		this.hero.push(item);
						// 	}
						// })
						// this.heroTotal = this.hero.length;
						this.heroTotal = this.heroList.length;
					}
				);
			},
			// 我的盲盒
			myboxList(){
				this.$Ajax('/front/ubx/bag',{
						address: this.$store.state.userWalletAddress,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					res => {
						this.BoxTotal = res.obj.total;
						this.pages = res.obj.pages;
						this.boxList = this.boxList.concat(res.obj.list);
						// this.boxList = [...this.boxList, ...res.obj.list];
					}
				);
			},
			scrolltolower() {
				if (this.pageNum >= this.pages) {
					return this.$tools.toast(this.i18n.global.atLast);
				} else {
					this.pageNum++;
					this.myboxList();
				}
			},
			triggerCollapse() {
				this.navigateFlag = !this.navigateFlag;
			},
			changeTabsActive(index){
				if (this.tabActive != index) {
					this.tabActive = index;
					if(this.tabActive == 0){
						this.myHeroList();
					}else{
						this.pageNum = 1;
						this.boxList = [];
						this.myboxList();
					}
				}
			},
			openPopup(e, item) {
				this.$emit('openPopup', e, item);
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '/scss/myPackage1';
</style>
