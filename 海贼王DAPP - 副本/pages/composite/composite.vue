<template>
	<view class="pages">
		<scroll-view scroll-y="true" class="scroll-height">
		<view class="main">
			<bgBox />
			<headerBox @openPopup="openPopup"/>
			<footerBox />
			<menuBox ref="menuPopup" />
			
			<!-- 我的海贼 -->
			<myHero :randomValue="randomValue" @openPopup="openPopup"/>
			<!-- 失败记录 -->
			<openfailureRecord ref="openfailureRecord" @openPopup="openPopup"/>
			<!-- 合成详情 -->
			<openCompositeDetail ref="openCompositeDetail"
				:detailInfo="detailInfo"
				:detailIndex="detailIndex"
				:randomValue="randomValue"
				@refreshData="refreshData"
				@openPopup="openPopup" />
			<!-- 合成成功 -->
			<openResult ref="openResult" :resultInfo="resultInfo"/>
			
			<!-- 详情 -->
			<openfailureDetail ref="openfailureDetail" :chooseItemInfo="chooseItemInfo" />
				
		</view>
		</scroll-view>
	</view>
</template>

<script>
import bgBox from './components/bgBox';
import headerBox from './components/headerBox';
import footerBox from '@/pages/common/footerBox';
import menuBox from '@/pages/common/menuBox.vue';
import myHero from './components/myHero.vue';
import openfailureRecord from './components/openfailureRecord.vue';
import openCompositeDetail from './components/openCompositeDetail.vue';
import openResult from './components/openResult.vue';
import openfailureDetail from './components/openfailureDetail.vue';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		headerBox,
		footerBox,
		menuBox,
		myHero,
		openfailureRecord,
		openCompositeDetail,
		openResult,
		openfailureDetail,
		lowkeyLoading
	},
	data() {
		return {
			// userWalletAddress: '---',
			loadingShow: true,
			detailInfo:{},
			detailIndex:0,
			randomValue:0,
			resultInfo:{},
			chooseItemInfo:{},
		};
	},
	onShow() {
		setTimeout(()=>{
			this.loadingShow = false;
		}, 3000)
	},
	methods: {
		refreshData(){
			console.log("更新了");
			this.randomValue = Math.random();
		},
		openPopup(e,item,index) {
			console.log("e",e);
			if (typeof e == 'string') {
				if(e == 'openCompositeDetail'){
					this.detailInfo = item;
					this.detailIndex = index;
				    console.log("eeee",this.detailInfo,this.detailIndex);
				}else if(e == 'openResult'){
					this.resultInfo = item;
					console.log("this.resultInfo",this.resultInfo);
				}else if(e == 'openfailureDetail'){
					this.chooseItemInfo = item;
					console.log("openfailureDetail",this.chooseItemInfo);
				}
				this.$refs[e].$refs[e].open();
			} else {
				this.$refs[e].$refs[e].open();
			}
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/index';
</style>
