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
				<!-- 招募合作说明 -->
				<explain />
				<!-- 派系选择 -->
				<factionalSelection @openPopup="openPopup"/>
			</view>
			<!-- 认购成功 -->
			<openSuccessfulSubscription ref="openSuccessfulSubscription"/>
		</view>
	</view>
</template>

<script>
import bgBox from './components/bgBox';
import explain from './components/explain';
import factionalSelection from './components/factionalSelection';
import openSuccessfulSubscription from './components/openSuccessfulSubscription';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		explain,
		factionalSelection,
		openSuccessfulSubscription,
		lowkeyLoading
	},
	data() {
		return {
			// type: [],
		};
	},
	onShow() {
		// this.getTypeList();
		// if(this.checkName == ''){
		// 	this.checkName = this.type[0].name;
		// }
		// console.log('type',this.type);
		// console.log('checkName',this.checkName);
	},
	methods: {
		// getTypeList(typeList){
		// 	console.log('t',this.typeList)
		// 	this.checkName = this.typeList[0].name;
		// },
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
@import '/scss/first';
</style>
