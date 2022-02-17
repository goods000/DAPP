<template>
	<!-- 公告模块 -->
	<view class="noticeBox">
		<view class="noticeBox-wrapper">
			<swiper class="noticeBox-list noticeBox-swiper" vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item class="noticeBox-swiper__item" v-for="(item, index) in 10" :key="index">
					<view class="noticeBox-swiper__item-message">
						<span class="noticeBox-swiper__item-label">恭喜 {{ $store.state.userWalletAddress | walletAddressConceal(3) }} 获得了</span>
						<span class="noticeBox-swiper__item-data">路飞</span>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		timer(e) {
			console.log(e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/noticeBox';
</style>
