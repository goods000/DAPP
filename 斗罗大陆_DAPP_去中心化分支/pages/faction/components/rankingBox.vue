<template>
	<!-- 排行 -->
	<view class="containerBox">
		<scroll-view scroll-y="true" class="containerBox-wrapper">
			<view class="containerBox-plane">
				<view class="containerBox-title initTitle"><view class="initTitle-label">宗门成员榜</view></view>
				<view class="containerBox-tableBox tableBox">
					<view class="tableBox-theader">
						<view class="tableBox-tr">
							<view class="tableBox-th">排名</view>
							<view class="tableBox-th tableBox-th--flex2">地址</view>
							<view class="tableBox-th">地位</view>
							<view class="tableBox-th">算力</view>
							<view class="tableBox-th">TVL($)</view>
						</view>
					</view>
					<scroll-view scroll-y="true" class="tableBox-tbody">
						<view class="tableBox-tr" v-for="(item, index) in 20" :key="index">
							<view class="tableBox-td">{{ index + 1 }}</view>
							<view class="tableBox-td tableBox-td--flex2">0x9****40f</view>
							<view class="tableBox-td">堂主</view>
							<view class="tableBox-td">12</view>
							<view class="tableBox-td">45.36</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
@import '/scss/rankingBox';
</style>
