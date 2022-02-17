<template>
	<view class="worldList">
			<view class="initTabs">
				<view class="initTabs-records">
					<view class="initTabs-records__item" :class="{'initTabs-records__item--active' : typeActive == 0}" @click="changeTypeActive(0)">{{ i18n.list.check01 }}</view>
					<view class="initTabs-records__item" :class="{'initTabs-records__item--active' : typeActive == 1}" @click="changeTypeActive(1)">{{ i18n.list.check02 }}</view>
				</view>
			</view>
			<view class="worldList-listBox">
				<view class="listBox-header">
					<view class="listBox-header__item">{{ i18n.list.list01 }}</view>
					<view class="listBox-header__item" v-if="typeActive == 0">{{ i18n.list.list02 }}</view>
					<!-- <view class="listBox-header__item" v-if="typeActive == 0">
						战力
						<view class="listBox-header__item-open" :class="navigateFlag ? 'listBox-header__item-open--active' : ''">
							<image src="@/static/package/sort.png" mode="widthFix" @click="triggerCollapse()"></image>
						</view>
					</view> -->
					<view class="listBox-header__item listBox-header__item--width" v-if="typeActive == 1">{{ i18n.list.list03 }}</view>
					<view class="listBox-header__item">{{ i18n.list.list04 }}</view>
				</view>
				<scroll-view class="listBox__height" :scroll-y="true" :show-scrollbar="false">
					<view class="listBox-itemBox" v-for="(item,index) in personList" :key="index" v-if="typeActive == 0"
					:class="{'listBox-itemBox--active' : item.address == $store.state.userWalletAddress }">
						<view class="listBox-itemBox__item">{{ index +1}}</view>
						<view class="listBox-itemBox__item">{{ item.address | walletAddressConceal(4)  }}</view>
						<view class="listBox-itemBox__item">{{ item.hashRate }}</view>
					</view>
					<view class="listBox-itemBox" v-for="(item,index) in teamList" :key="index" v-if="typeActive == 1"
					:class="{'listBox-itemBox--active' : item.own }">
						<view class="listBox-itemBox__item">{{ index +1}}</view>
						<view class="listBox-itemBox__item">{{ item.gangName }}</view>
						<view class="listBox-itemBox__item listBox-itemBox__item--width">{{ item.hashRate }}</view>
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
				personList: [],
				teamList: [],
				usdtPrice:'',
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.typeActive == 0
				this.changeTypeActive(0);
				this.getPersonList();
				this.getTeamList();
				this.getUsdtPrice();
			},
			getUsdtPrice() {
				this.$Ajax('/front/common/get/usdt/price',{},
					res => {
						this.usdtPrice = res.obj;
					}
				);
			},
			getPersonList() {
				this.$Ajax('/front/common/land/rank1', {}, res => {
					this.personList = res.obj;
				});
			},
			getTeamList() {
				this.$Ajax('/front/common/land/rank2', {}, res => {
					this.teamList = res.obj;
				});
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
