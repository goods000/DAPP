<template>
	<view class="worldList">
			<view class="initTabs">
				<view class="initTabs-records">
					<view class="initTabs-records__item" :class="{'initTabs-records__item--active' : typeActive == 0}" @click="changeTypeActive(0)">玩家榜单</view>
					<view class="initTabs-records__item" :class="{'initTabs-records__item--active' : typeActive == 1}" @click="changeTypeActive(1)">派系榜单</view>
				</view>
			</view>
			<view class="worldList-listBox">
				<view class="listBox-header">
					<view class="listBox-header__item">排行</view>
					<view class="listBox-header__item" v-if="typeActive == 0">地址</view>
					<view class="listBox-header__item" v-if="typeActive == 0">
						战力
						<view class="listBox-header__item-open" :class="navigateFlag ? 'listBox-header__item-open--active' : ''">
							<image src="@/static/package/sort.png" mode="widthFix" @click="triggerCollapse()"></image>
						</view>
					</view>
					<view class="listBox-header__item listBox-header__item--width" v-if="typeActive == 1">俱乐部名称</view>
					<view class="listBox-header__item" v-if="typeActive == 1">战力</view>
					<view class="listBox-header__item listBox-header__item--flex" v-if="typeActive == 1">币种($)</view>
				</view>
				<scroll-view class="listBox__height" :scroll-y="true" :show-scrollbar="false">
					<view class="listBox-itemBox" v-for="(item,index) in 10" :key="index" v-if="typeActive == 0"
					:class="{'listBox-itemBox--active' : index == 4}">
						<view class="listBox-itemBox__item">{{ index +1}}</view>
						<view class="listBox-itemBox__item">{{ address | walletAddressConceal(4)  }}</view>
						<view class="listBox-itemBox__item">54782.000664.00</view>
					</view>
					<view class="listBox-itemBox" v-for="(item,index) in 10" :key="index" v-if="typeActive == 1"
					:class="{'listBox-itemBox--active' : index == 3}">
						<view class="listBox-itemBox__item">{{ index +1}}</view>
						<view class="listBox-itemBox__item">草帽海贼团</view>
						<view class="listBox-itemBox__item">243.00</view>
						<view class="listBox-itemBox__item listBox-itemBox__item--width">546.3224.00</view>
					</view>
				</scroll-view>
			</view>
	</view>
</template>

<script>
	export default {
		// 接受父组件的值
		data() {
			return {
				typeActive: 0,
				address: 'HZW02sSFdD45gf4SDFSDFSFDSFDSF5455sg2357',
				navigateFlag: false,
			};
		},
		onShow() {
			
		},
		methods: {
			init(){
				this.typeActive == 0
				this.changeTabsActive(0);
			},
			changeTypeActive(index){
				if (this.typeActive != index) {
					this.typeActive = index;
				}
			},
			triggerCollapse() {
				this.navigateFlag = !this.navigateFlag;
			},
			openPopup(e) {
				this.$refs[e].$refs[e].open();
			},
			hidePopup(e) {
				this.$refs[e].close();
			}
		}
	};
</script>

<style lang="scss" scoped>
@import '/scss/worldList';
</style>
