<template>
	<!-- 排名筛选 -->
	<uni-popup ref="filterPopup" type="center" :animation="true">
		<view class="initPopup">
			<view class="initPopup-wrapper">
				<view class="initPopup-picTitle"><image src="@/static/common/popup/icon-title.png" mode="widthFix"></image></view>
				<view class="initPopup-container initPopup-container--alignCenter">
					<view class="initPopup-title"><text>排名筛选</text></view>
					<view class="initPopup-filterBox filterBox">
						<view class="filterBox-wrapper">
							<view class="filterBox-item">
								<view class="filterBox-item__checkBox initCheckBox">
									<view class="initCheckBox-item">
										<view class="initCheckBox-item__choose" :class="{ 'initCheckBox-item__choose--active': music }" @click="changeMusic()"></view>
										<view class="initCheckBox-item__label">按算力排行</view>
									</view>
									<view class="initCheckBox-item">
										<view class="initCheckBox-item__choose" :class="{ 'initCheckBox-item__choose--active': sound }" @click="changeSound()"></view>
										<view class="initCheckBox-item__label">按集卡排行</view>
									</view>
									<view class="initCheckBox-item">
										<view class="initCheckBox-item__choose" :class="{ 'initCheckBox-item__choose--active': sound }" @click="changeSound()"></view>
										<view class="initCheckBox-item__label">按APY排行</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="initPopup-btn" @click="hidePopup('filterPopup')">确 定</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			music: true,
			sound: true,
			lang: 'cn'
		};
	},
	methods: {
		changeMusic() {
			this.music = !this.music;
		},
		changeSound() {
			this.sound = !this.sound;
		},
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/filterPopup';
</style>
