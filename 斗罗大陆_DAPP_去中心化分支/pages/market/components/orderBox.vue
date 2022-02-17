<template>
	<!-- 英雄卡组 -->
	<view class="orderBox">
		<scroll-view scroll-y="true" class="orderBox-wrapper">
			<view class="orderBox-plane">
				<view class="orderBox-item" v-for="(item, index) in 18" :key="index" @click="openPopup('buyCardPopup')">
					<view class="orderBox-item__left">
						<view class="orderBox-item__type" :class="`orderBox-item__type--style${(index % 5) + 1}`">金色品质英雄出售</view>
						<view class="orderBox-item__info">·唐三·10张·红色</view>
					</view>
					<view class="orderBox-item__right">
						<view class="orderBox-item__price">
							120
							<text>WHL/张</text>
						</view>
					</view>
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
	methods: {
		openPopup(e) {
			this.$emit('openPopup', e);
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/orderBox';
</style>
