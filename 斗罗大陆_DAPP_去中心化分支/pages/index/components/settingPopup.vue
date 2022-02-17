<template>
	<!-- 设置 -->
	<uni-popup ref="settingPopup" type="center" :animation="true">
		<view class="initPopup">
			<view class="initPopup-wrapper">
				<view class="initPopup-picTitle"><image src="@/static/common/popup/icon-title.png" mode="widthFix"></image></view>
				<view class="initPopup-container">
					<view class="initPopup-close" @click="hidePopup('settingPopup')"></view>
					<view class="initPopup-title"><text>设置</text></view>
					<view class="initPopup-settingBox settingBox">
						<view class="settingBox-wrapper">
							<view class="settingBox-item">
								<view class="settingBox-item__label">声音设置</view>
								<view class="settingBox-item__checkBox checkBox">
									<view class="checkBox-item">
										<view class="checkBox-item__check" :class="{ 'checkBox-item__check--active': music }" @click="changeMusic()"></view>
										<view class="checkBox-item__label">音乐</view>
									</view>
									<view class="checkBox-item">
										<view class="checkBox-item__check" :class="{ 'checkBox-item__check--active': sound }" @click="changeSound()"></view>
										<view class="checkBox-item__label">音效</view>
									</view>
								</view>
							</view>
							<view class="settingBox-item">
								<view class="settingBox-item__label">语言设置</view>
								<view class="settingBox-item__checkBox checkBox">
									<view class="checkBox-item">
										<view class="checkBox-item__check checkBox-item__check--active"></view>
										<view class="checkBox-item__label">中文</view>
									</view>
								</view>
							</view>
						</view>
					</view>
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
@import '/scss/settingPopup';
</style>
