<template>
	<!-- 排名筛选 -->
	<uni-popup ref="choosePopup" type="center" :animation="true">
		<view class="choosePopupBox">
			<view class="choosePopupBox-wrapper">
				<view class="choosePopupBox-container">
					<view class="choosePopupBox-title"><view class="choosePopupBox-title__label">选择宗门</view></view>

					<view class="choosePopupBox-subscribeBox subscribeBox">
						<view class="subscribeBox-wrapper">
							<view class="subscribeBox-itemBox itemBox">
								<view class="itemBox-label">*请选择你想要加入的宗门：</view>
								<view class="itemBox-body">
									<view
										class="itemBox-item"
										:class="{ 'itemBox-item--active': tabsActive == index }"
										v-for="(item, index) in 21"
										:key="index"
										@click="changeTabsActive(index)"
									>
										玄天宗
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="choosePopupBox-buttonBox buttonBox">
					<view class="buttonBox-btn buttonBox-btn--style1" @click="hidePopup('choosePopup')">取消</view>
					<view class="buttonBox-btn buttonBox-btn--style2" @click="toSuccessPopup()">确认</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			tabsActive: 0,
			pageStep: 0,
			quantity: 1,
			address: ''
		};
	},
	methods: {
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
			}
		},
		toSuccessPopup() {
			this.$emit('hidePopup', 'choosePopup');
			this.$emit('openPopup', 'successPopup');
		},
		hidePopup(e) {
			this.$emit('hidePopup', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/choosePopup';
</style>
