<template>
	<view class="pages">
		<view class="main">
			<!-- <bgBox /> -->
			
			<view class="share">
				<view class="share-wrapper">
					<!-- <view class="share-title">派系邀请</view> -->
					<view class="share-title">友情提示</view>
					<view class="share-tips">亲爱的用户您好，由于您未通过链接进入，我们已为您提供相关派系邀您自动选择，未加入派系无法进入游戏</view>
					<!-- <view class="share-tips">用户<text>HZW0246542241</text>向您发送邀请 推荐您加入派系</view> -->
					<!-- <view class="share-name">“草帽海贼团”</view> -->
					<view class="share-bg">该钱包地址一旦加入派系，除非自 己建立派系，否则无法更改</view>
					<view class="share-btn">
						<view class="share-btn__disabled">退出</view>
						<!-- <view class="share-btn__style">加入</view> -->
						<view class="share-btn__style" @click="$tools.jump('./teamChoose')">选择</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
import bgBox from './components/bgBox';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		lowkeyLoading
	},
	data() {
		return {
			// userWalletAddress: '---',
			loadingShow: true,
		};
	},
	onShow() {
		setTimeout(()=>{
			this.loadingShow = false;
		}, 3000)
	},
	methods: {
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
@import '/scss/share';
</style>
