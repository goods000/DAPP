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
			<bgBox />
			<view class="firstTop">
				<!-- 认购盲盒 -->
				<openBuyBox @openPopup="openPopup"/>
			</view>
			<!-- 购买盲盒弹框 -->
			<openPopupBuyBox :boxDetails="boxDetails" :tabsActive="tabsActive" ref="openPopupBuyBox" @openPopup="openPopup"/>
			<!-- 购买成功 -->
			<openSuccess ref="openSuccess" />
			<!-- 认购记录 -->
			<openRecord ref="openRecord"/>
			
			<openLanguage ref="openLanguage" />
		</view>
		</scroll-view>
	</view>
</template>

<script>
import bgBox from './components/bgBox';
import openBuyBox from './components/openBuyBox';
import openSuccess from './components/openSuccess';
import openPopupBuyBox from './components/openPopupBuyBox';
import openRecord from './components/openRecord';
import openLanguage from './components/openLanguage';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		openBuyBox,
		openSuccess,
		openPopupBuyBox,
		openRecord,
		openLanguage,
		lowkeyLoading
	},
	data() {
		return {
			boxDetails: {},
			tabsActive:1,
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	onShow() {
		
	},
	methods: {
		openPopup(e,item,i) {
			console.log("e",e,item,i);
			if (item != undefined) {
				this.boxDetails = item;
				this.tabsActive = i;
				this.$forceUpdate();
				this.$refs[e].$refs[e].open();
				// console.log("index----this.boxDetails：",this.boxDetails);
			} else {
				this.$refs[e].$refs[e].open();
			}
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
}
</script>

<style lang="scss" scoped>
@import '/scss/buyBox';
</style>
