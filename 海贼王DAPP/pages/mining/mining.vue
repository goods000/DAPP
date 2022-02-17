<template>
	<view class="pages">
		<scroll-view scroll-y="true" class="scroll-height">
		<view class="main">
			<bgBox />
			<headerBox @openPopup="openPopup"/>
			<footerBox />
			<menuBox ref="menuPopup" />
			
			<cardSlot :randomValue="randomValue" 
				@refreshData="refreshData"
				@openPopup="openPopup(arguments)"
				@changeCardSlotStatus="changeCardSlotStatus"/>
			
			<!-- 卡槽详情 -->
			<openCardSlotDetail ref="openCardSlotDetail" 
				:chooseItemInfo="chooseItemInfo" 
				:cardSlotStatus="cardSlotStatus"
				@changeCardChooseStatus="changeCardChooseStatus" 
				@refreshData="refreshData"
				@openPopup="openPopup(arguments)"
				@hidePopup="hidePopup"/>
			
			<!-- 记录 -->
			<openReceivingRecord ref="openReceivingRecord"/>
			<!-- 装备海贼、替换海贼 -->
			<openHero ref="openHero" 
			    :chooseItemInfo="chooseItemInfo"
				:cardChooseStatus="cardChooseStatus"
				:randomValue="randomValue" 
				@refreshData="refreshData"
				@openPopup="openPopup(arguments)"
				@hidePopup="hidePopup"/>
			<!-- 卡槽升级 -->
			<openCardSlotUpgrade ref="openCardSlotUpgrade"
				:chooseItemInfo="chooseItemInfo"
				:cardChooseStatus="cardChooseStatus"
				@refreshData="refreshData"
				@openPopup="openPopup(arguments)"
				@hidePopup="hidePopup"/>
			
			<!-- 领取收益成功弹框 -->
			<openSuccessPopup ref="openSuccessPopup" 
				:available="available"
				:cardChooseStatus="cardChooseStatus"
				@refreshData="refreshData"/>
			
			<!-- 升级成功 -->
			<openSuccessUpgrade ref="openSuccessUpgrade" 
				:income="income"
				@refreshData="refreshData"
			/>
			
		</view>
		</scroll-view>
	</view>
</template>

<script>
import bgBox from './components/bgBox';
import headerBox from './components/headerBox';
import footerBox from '@/pages/common/footerBox';
import menuBox from '@/pages/common/menuBox.vue';
import cardSlot from './components/cardSlot';
import openCardSlotDetail from './components/openCardSlotDetail';
import openReceivingRecord from './components/openReceivingRecord';
import openHero from './components/openHero';
import openCardSlotUpgrade from './components/openCardSlotUpgrade';
import openSuccessPopup from './components/openSuccessPopup';
import openSuccessUpgrade from './components/openSuccessUpgrade';


import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		headerBox,
		footerBox,
		menuBox,
		cardSlot,
		openCardSlotDetail,
		openReceivingRecord,
		openHero,
		openCardSlotUpgrade,
		openSuccessPopup,
		openSuccessUpgrade,
		lowkeyLoading
	},
	data() {
		return {
			// userWalletAddress: '---',
			loadingShow: true,
			randomValue: 0,
			chooseItemInfo: {},
			cardSlotStatus: 0, //0可装备 1已装备
			cardChooseStatus: 0 ,//0海贼装备 1海贼替换 2海贼升级
			available:'',
			income:'',
		};
	},
	onShow() {
		setTimeout(()=>{
			this.loadingShow = false;
		}, 3000);
		this.lockNum = 0;
		this.unlockNum = 0;
	},
	methods: {
		refreshData(){
			this.randomValue = Math.random();
		},
		changeCardSlotStatus(type) {
			this.cardSlotStatus = type;
		},
		changeCardChooseStatus(type) {
			this.cardChooseStatus = type;
		},
		openPopup(e) {
			console.log(e[0]);
			if (typeof e == 'object') {
				if(e[0] == 'openCardSlotDetail' || e[0] == 'openCardSlotUpgrade' || e[0] == 'openHero'){
					this.chooseItemInfo = e[1];
				    console.log("eeee",this.chooseItemInfo);
				}else if(e[0] == 'openSuccessPopup'){
					this.available = e[1];
					 // console.log("available",this.available);
				}else if(e[0] == 'openSuccessUpgrade'){
					this.income = e[1];
					 // console.log("income",this.income);
				}
				this.$refs[e[0]].$refs[e[0]].open();
			} else {
				this.$refs[e].$refs[e].open();
			}
		},
		hidePopup(e) {
			this.$refs[e].$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/mining';
</style>
