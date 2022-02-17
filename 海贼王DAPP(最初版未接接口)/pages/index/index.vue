<template>
	<view class="pages">
		<view class="main">
			<bgBox />
			<headerBox @openPopup="openPopup" />
			<footerBox />
			<fixedBtnBox />
			<noticeBox />
			<menuBox ref="menuPopup" />
			<!-- <ourLoading isFullScreen :active="loadingShow" background-color="rgba(255,255,255,1)" text="资源加载中..." /> -->
			<!-- <lowkeyLoading isFullScreen :active="loadingShow" background-color="rgba(255,255,255,1)" text="资源加载中..." /> -->
		</view>
	</view>
</template>

<script>
import bgBox from './components/bgBox';
import headerBox from './components/headerBox';
import footerBox from './components/footerBox';
import fixedBtnBox from './components/fixedBtnBox';
import noticeBox from './components/noticeBox';
import menuBox from '@/pages/common/menuBox.vue';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading.vue'

export default {
	components: {
		bgBox,
		headerBox,
		footerBox,
		fixedBtnBox,
		noticeBox,
		menuBox,
		lowkeyLoading
	},
	data() {
		return {
			// userWalletAddress: '---',
			loadingShow: true,
		};
	},
	onShow() {
		// (async () => {
		// 	var obj = setInterval(async () => {
		// 		if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
		// 			clearInterval(obj);
		// 			let userWalletAddress = window.tronWeb.defaultAddress.base58; //获取地址
		// 			this.$store.commit('changeuserWalletAddress', userWalletAddress);
		// 			// $tronWeb.getBalance(this.userWalletAddress, 6).then(result => {
		// 			// 	this.trxBalance = result;
		// 			// });
		// 			// $tronWeb.getContractBalance(this.userWalletAddress, usdtContractAddress, 6).then(result => {
		// 			// 	this.usdtBalance = result;
		// 			// });
		// 		}
		// 	}, 10);
		// })();
		
		setTimeout(()=>{
			this.loadingShow = false;
		}, 3000)
	},
	methods: {
		openPopup(e) {
			console.log(this.$refs[e].$refs);
			this.$refs[e].$refs[e].open();
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
