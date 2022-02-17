<template>
	<view class="pages">
		<view class="main">
			<view class="initHeader initHeader--black initHeader--fixed">
				<view class="initHeader-wrapper">
					<view class="initHeader-back" @click="$tools.back(1)"></view>
					<view class="initHeader-title">航海家</view>
				</view>
			</view>
			<bgBox />
			
			<view class="firstTop">
				<!-- 认购盲盒 -->
				<openBuyBox @openPopup="openPopup"/>
				
			</view>
			<!-- 购买盲盒弹框 -->
			<openPopupBuyBox ref="openPopupBuyBox" @openPopup="openPopup"/>
			<!-- 购买成功 -->
			<openSuccess ref="openSuccess" />
			
			<!-- 认购记录 -->
			<openRecord ref="openRecord"/>
		</view>
	</view>
</template>

<script>
import bgBox from './components/bgBox';
import openBuyBox from './components/openBuyBox';
import openSuccess from './components/openSuccess';
import openPopupBuyBox from './components/openPopupBuyBox';
import openRecord from './components/openRecord';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		openBuyBox,
		openSuccess,
		openPopupBuyBox,
		openRecord,
		lowkeyLoading
	},
	data() {
		return {
			scrollInto,
		};
	},
	onShow() {
		
	},
	methods: {
		openPopup(e) {
			console.log("e：",e);
			console.log(this.$refs[e].$refs);
			this.$refs[e].$refs[e].open();
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
