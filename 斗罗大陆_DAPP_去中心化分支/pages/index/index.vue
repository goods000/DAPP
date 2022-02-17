<template>
	<view class="pages">
		<view class="main">
			<userInfoBox></userInfoBox>
			<menuBox></menuBox>
			
			<!-- 背景元素 -->
			<bgBox></bgBox>
			
			<!-- 右上浮动按钮 -->
			<fixedBtnBox @openPopup="openPopup"></fixedBtnBox>
			
			<!-- 收益详情 -->
			<rewardBox @openPopup="openPopup"></rewardBox>
		</view>

		<!-- 活跃度说明 -->
		<settingPopup ref="settingPopup" @hidePopup="hidePopup"></settingPopup>
			
		<lowkeyLoading isFullScreen :active="$store.state.pageLazyLoading.index.loading" text="初次资源加载中..." v-show="$store.state.pageLazyLoading.index.loading" />
	</view>
</template>

<script>
import bgBox from './components/bgBox';
import fixedBtnBox from './components/fixedBtnBox';
import rewardBox from './components/rewardBox';
import settingPopup from './components/settingPopup';
export default {
	components: {
		bgBox,
		fixedBtnBox,
		rewardBox,
		settingPopup
	},
	data() {
		return {
			
		};
	},
	onShow() {
		if(this.$store.state.pageLazyLoading.index.loading){
			setTimeout(()=>{
				this.$store.commit('changePageLazyLoading', 'index');
			}, 3000)
		}
	},
	methods: {
		openPopup(e) {
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/index';
</style>
