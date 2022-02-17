<template>
	<view class="information">
		<view class="information-wrapper">
			<view class="information-headerBox">
				<view class="information-headerBox__image">
					<image src="@/static/team/icon-team-headerImage.png" mode="widthFix"></image>
				</view>
				<view class="information-headerBox__news">
					<view class="information-headerBox__news-name">
						{{ teamInfo.gangName != '' ?  teamInfo.gangName : i18n.team.noJion }}
						<text class="information-headerBox__news-invite" v-if="teamInfo.gangName != ''" @click="copyAddress()">{{ i18n.team.link }}</text>
						<text class="information-headerBox__news-invite" v-else @click="$tools.jump('../share/teamChoose')">{{ i18n.team.jion }}</text>
						<!-- <image src="@/static/team/icon-team-tips.png" mode="" @click="job"></image> -->
					</view>
					<view class="information-headerBox__news-level" @click="job">{{ i18n.team.Position }}：
						<text class="information-headerBox__news-level__1">{{ teamInfo.gangPosition == '' ? '----' : teamInfo.gangPosition }}</text>
					</view>
					<view class="information-headerBox__news-list">
					{{ i18n.team.Ranking }}：{{ teamInfo.gangRank1 == '' ? '----' : teamInfo.gangRank1 }}/{{ teamInfo.gangRank2 == '' ? '----' : teamInfo.gangRank2 }}</view>
					<!-- 签到 -->
					<!-- <view class="information-headerBox__news-btn" @click="sign">签到</view> -->
				</view>
			</view>
			<view class="information-itemBox">
				<template v-if="!seeNews">
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">
							{{ i18n.team.rewards }}
							<image src="@/static/team/icon-team-tips.png" mode="" @click="reward"></image>
						</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">{{ i18n.team.YesterdayReward }}({{ $store.state.projectCurrencyName }})：</view>
						<view class="information-itemBox__item-title">{{ teamInfo.gangYesterdayReward != '' ? teamInfo.gangYesterdayReward : '0' }}</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">{{ i18n.team.CumulativeReward }}({{ $store.state.projectCurrencyName }})：</view>
						<view class="information-itemBox__item-title">{{ teamInfo.gangTotalReward != '' ? teamInfo.gangTotalReward : '0' }}</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">{{ i18n.team.tips01 }}：{{ teamInfo.dynamicHashRate }}<text class="information-itemBox__item-title__see" @click="openAddress">{{ i18n.team.see }}</text></view>
						<!-- <view class="information-itemBox__item-title">{{ i18n.team.MyRanking }}：{{ teamInfo.myRank1 != '' ? teamInfo.myRank1 : '0' }}/{{ teamInfo.myRank2 != '' ? teamInfo.myRank2 : '0' }}</view> -->
					</view>
				</template>
				<template v-else>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">{{ i18n.team.tips02 }}：</view>
						<view class="information-itemBox__item-title">{{ teamInfo.currentHashRate != '' ? teamInfo.currentHashRate : '0' }}</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">{{ i18n.team.tips03 }}：</view>
						<view class="information-itemBox__item-title">{{ teamInfo.currentLowestHashRate }}</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">{{ i18n.team.tips04 }}：</view>
						<view class="information-itemBox__item-title">{{ teamInfo.yesterdayLowestHashRate }}</view>
					</view>
					<view class="information-itemBox__item">
						<view class="information-itemBox__item-title">
							{{ i18n.team.MyRanking }}：{{ teamInfo.myRank1 != '' ? teamInfo.myRank1 : '0' }}/{{ teamInfo.myRank2 != '' ? teamInfo.myRank2 : '0' }}
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
			teamInfo: {},
			invite:'',
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getTeamInfo();
			this.getInvite();
		},
		getTeamInfo() {
			this.$Ajax('/front/gang/address/info',{
					address: this.$store.state.userWalletAddress
				},
				res => {
					this.teamInfo = res.obj;
				}
			);
		},
		// 邀请链接
		getInvite(){
			this.$Ajax('/front/common/invite/link',{},
				res => {
					this.invite = res.obj;
				}
			);
		},
		copyAddress() {
			let inviteAddress = this.invite + '?address=' + this.$store.state.userWalletAddress;
			this.$tools.copy(inviteAddress);
		},
		// 派系职位说明
		openAddress(){
			this.$emit('openPopup', 'openAdditionAddress');
		},
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
