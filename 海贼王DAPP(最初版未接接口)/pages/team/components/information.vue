<template>
	<view class="information">
		<view class="information-wrapper">
			<view class="information-headerBox">
				<view class="information-headerBox__image">
					<image src="@/static/team/icon-team-headerImage.png" mode="widthFix"></image>
				</view>
				<view class="information-headerBox__news">
					<view class="information-headerBox__news-name">
						草帽海贼团 (50)
						<!-- <image src="@/static/team/icon-team-tips.png" mode="" @click="job"></image> -->
					</view>
					<view class="information-headerBox__news-level" @click="job">职位：
						<text class="information-headerBox__news-level__1">普通会员</text>
					</view>
					<view class="information-headerBox__news-list">派系排名：12/40</view>
					<!-- 签到 -->
					<view class="information-headerBox__news-btn" @click="sign">签到</view>
				</view>
			</view>
			<view class="information-itemBox">
				<template v-if="!seeNews">
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">
							派系奖励
							<image src="@/static/team/icon-team-tips.png" mode="" @click="reward"></image>
						</view>
						<view class="information-itemBox__item-title">派系TVL $0</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">昨日奖励(Bili)：0.00</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">累计奖励(Bili)：0.00</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">我的排名：6/12</view>
					</view>
				</template>
				<template v-else>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">今日战力变动值：+10</view>
						<view class="information-itemBox__item-title">今日签到：1/1</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">今日战力变动率：+100%</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">今日签到率：100%</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">
							今日派系活跃系数：100%
							<image src="@/static/team/icon-team-tips.png" mode="" @click="active"></image>
						</view>
					</view>
				</template>
				<view class="information-itemBox__transferBtn">
					<image src="@/static/team/icon-team-transfer.png" mode="widthFix" @click.native="transferBtn"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	// props:{
	// 	seeNews: Boolean,
	// },
	data() {
		return {
			seeNews: false,
		};
	},
	onShow() {
		this.seeNews = false;
	},
	methods: {
		// 派系职位说明
		reward(){
			this.$emit('openPopup', 'openRewardExplain');
		},
		// 派系奖励说明
		job(){
			this.$emit('openPopup', 'openJobExplain');
		},
		// 派系活跃说明
		active(){
			this.$emit('openPopup', 'openActiveExplain');
		},
		sign(){
			this.$emit('openPopup', 'openSignIn');
		},
		transferBtn(){
			this.seeNews = !this.seeNews;
			console.log("seeNews1：",this.seeNews)
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/information';
</style>
