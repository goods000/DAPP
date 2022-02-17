<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openReceiveIncome" type="top" :animation="true" @change="init">
		<view class="popupBox">
			<view class="popupBox-wrapper">
				<view class="popupBox-close" @click="hidePopup('openReceiveIncome')">
					<image src="@/static/package/icon-close.png" mode="widthFix"></image>
				</view>
				<view class="popupBox-container">
					<view class="popupBox-header">{{ i18n.index.pledgeMiningPopup.btn_01 }}</view>
					<view class="popupBox-contentbg">
						<view class="popupBox-contentbg__item">
							<view class="popupBox-contentbg__item-info">{{ i18n.index.incomeReceivePopup.info_label_01 }}({{ $store.state.projectCurrencyName }}):</view>
							<view class="popupBox-contentbg__item-info popupBox-contentbg__item-info--active">{{ fundBalanceInfo.available }}</view>
						</view>
						<view class="popupBox-contentbg__item">
							<view class="popupBox-contentbg__item-info">{{ i18n.index.incomeReceivePopup.info_label_02 }}({{ $store.state.projectCurrencyName }}):</view>
							<view class="popupBox-contentbg__item-info popupBox-contentbg__item-info--active">{{ fundBalanceInfo.extracted }}</view>
						</view>
						<view class="popupBox-contentbg__item">
							<view class="popupBox-contentbg__item-info">{{ i18n.index.incomeReceivePopup.info_label_03 }}({{ $store.state.projectCurrencyName }}):</view>
							<view class="popupBox-contentbg__item-info popupBox-contentbg__item-info--active">{{ fundBalanceInfo.destroy }}</view>
						</view>
						<view class="popupBox-contentbg__item">
							<view class="popupBox-contentbg__item-info">{{ i18n.index.openDestoryRecord.title }}：</view>
							<view class="popupBox-contentbg__item-info popupBox-contentbg__item-info--active popupBox-contentbg__item-info--line"
							@click="openPopup('openDestoryRecord')">
								{{ i18n.index.click_btn }}</view>
						</view>
					</view>
				</view>
				<view class="popupBox-btn popupBox-btn--width">
					<view class="popupBox-btn__style"  @click="hidePopup('openReceiveIncome')">{{ i18n.global.ISee }}</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			fundBalanceInfo: 0,
		};
	},
	computed: {
		statusList() {
			return [this.i18n.index.incomeReceivePopup.status_01, this.i18n.index.incomeReceivePopup.status_02];
		}
	},
	methods: {
		init(e){
			this.getFundBalance();
		},
		getFundBalance() {
			this.$Ajax('/front/fund/balance', {}, res => {
				this.fundBalanceInfo = res.obj;
			});
		},
		openPopup(e,item) {			console.log(e)
			this.$emit('openPopup', e, item);			// this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/incomeReceivePopup';
</style>
