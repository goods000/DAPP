<template>
	<view class="pages">
		<scroll-view :scroll-y="true" style="height: 100vh;overflow-y: auto;">
		<view class="main">
			<!-- <view class="initHeader initHeader--black initHeader--fixed">
				<view class="initHeader-wrapper">
					<view class="initHeader-back" @click="$tools.back(1)"></view>
					<view class="initHeader-title">{{ i18n.index.title }}</view>
				</view>
			</view> -->
			<view class="buyBox-bg">
				<view class="buyBox-address">
					<view class="buyBox-address__name">{{ $store.state.userWalletAddress | walletAddressConceal(6) }}</view>
					<view class="buyBox-address__name buyBox-address__lang">{{ $store.state.initLanguage.toUpperCase() }}</view>
					<image src="@/static/buyBox/icon-check.png" class="buyBox-address__image" @click="openPopup('openLanguage')"></image>
				</view>
			</view>
			<bgBox />
			<view class="firstTop">
				<!-- 招募合作说明 -->
				<explain :langType="langType"/>
				<!-- 派系选择 -->
				<factionalSelection @openPopup="openPopup"/>
			</view>
			<!-- 认购成功 -->
			<openSuccessfulSubscription ref="openSuccessfulSubscription"/>
			
			<!-- 认购宗门记录 -->
			<openRecord ref="openRecord" :gang="gang"/>
			
			<openLanguage ref="openLanguage" />
		</view>
		</scroll-view>
	</view>
</template>

<script>
import bgBox from './components/bgBox';
import explain from './components/explain';
import factionalSelection from './components/factionalSelection';
import openSuccessfulSubscription from './components/openSuccessfulSubscription';
import openRecord from './components/openRecord';
import openLanguage from './components/openLanguage';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		explain,
		factionalSelection,
		openSuccessfulSubscription,
		openRecord,
		openLanguage,
		lowkeyLoading
	},
	data() {
		return {
			langType: '',
			gang:{},
		};
	},
	onShow() {
		this.langType = uni.getStorageSync('initLanguage');
		// console.log("this.langType：",this.langType);
	},
	methods: {
		openPopup(e,item) {
			console.log("e：",e);
			if(e == 'openRecord'){
				this.gang = item;
				console.log("gang",this.gang);
			}
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
}
</script>

<style lang="scss" scoped>
@import '/scss/first';
</style>
