<template>
	<view class="pages">
		<view class="main">
			<bgBox />
			<headerBox @openPopup="openPopup" />
			<footerBox />
			<fixedBtnBox @openPopup="openPopup" />
			<!-- <noticeBox /> -->
			<menuBox ref="menuPopup" />
			
			<!-- 加入派系成功弹框 -->
			<!-- <openJoinSuccess ref="openJoinSuccess" @openPopup="openPopup"/> -->
			
			<openLanguage ref="openLanguage" />
			
			<!-- 收益按钮 -->
			<incomeBtnBox @openPopup="openPopup"></incomeBtnBox>
			<!-- 流动性挖矿质押 -->
			<incomeReceivePopup ref="incomeReceivePopup" @openPopup="openPopup" />
			<!-- 质押记录 -->
			<openPledgeRecord ref="openPledgeRecord" @openPopup="openPopup" />
			<!-- 质押记录详情 -->
			<openPledgeRecordDetails ref="openPledgeRecordDetails" :chooseItemInfo="chooseItemInfo" @openPopup="openPopup" />
			<!-- 领取收益 -->
			<openReceiveIncome ref="openReceiveIncome" @openPopup="openPopup" />
			<!-- 销毁记录 -->
			<openDestoryRecord ref="openDestoryRecord" />
		</view>
	</view>
</template>

<script>
import bgBox from './components/bgBox';
import headerBox from './components/headerBox';
import footerBox from '@/pages/common/footerBox';
import fixedBtnBox from './components/fixedBtnBox';
import noticeBox from './components/noticeBox';
import menuBox from '@/pages/common/menuBox.vue';
import openJoinSuccess from './components/openJoinSuccess';
import openLanguage from './components/openLanguage';
import incomeBtnBox from './components/incomeBtnBox';
import incomeReceivePopup from './components/incomeReceivePopup';
import openPledgeRecord from './components/openPledgeRecord';
import openPledgeRecordDetails from './components/openPledgeRecordDetails';
import openReceiveIncome from './components/openReceiveIncome';
import openDestoryRecord from './components/openDestoryRecord';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading.vue'

export default {
	components: {
		bgBox,
		headerBox,
		footerBox,
		fixedBtnBox,
		noticeBox,
		menuBox,
		openJoinSuccess,
		openLanguage,
		incomeBtnBox,
		incomeReceivePopup,
		openPledgeRecord,
		openPledgeRecordDetails,
		openReceiveIncome,
		openDestoryRecord,
		lowkeyLoading
	},
	data() {
		return {
			// userWalletAddress: '---',
			loadingShow: true,
			chooseItemInfo:[],
		};
	},
	onShow() {
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58 && this.$store.state.token) {
					clearInterval(obj);
					
					if(window.location.search.indexOf('address=') > -1){
						this.locationSearch = window.location.search.split('?address=')[1].substring(0, 34);
					}
					this.init();
				}
			}, 10);
		})();
	},
	methods: {
		init(){
			// this.openPopup('openJoinSuccess');
			this.getTotalHash();
			// this.checkParentByAddress();
		},
		checkParentByAddress() {
			this.$Ajax('/front/common/query', {}, res => {
				console.log('欲绑定上级地址 -> ', this.locationSearch);
		
				if (!res.obj && this.locationSearch != '') {
					this.bindParent();
				}
			});
		},
		bindParent() {
			if (this.$store.state.userWalletAddress == this.locationSearch) {
				return;
			}
			this.$Ajax(
				'/front/common/bind/parent',
				{
					parentAddress: this.locationSearch
				},
				res => {}
			);
		},
		getTotalHash() {
			this.$Ajax('/front/common/total/hash', {}, res => {
				this.$store.commit('changeHeaderInfo', res.obj);
			});
		},
		openPopup(e,item) {
			// console.log("e",item);
			if (typeof e == 'string') {
				if (e == 'openPledgeRecordDetails') {
					this.chooseItemInfo = item;
					// console.log('1111',this.chooseItemInfo);
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
