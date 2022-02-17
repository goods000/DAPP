<template>
	<!-- 菜单模块 -->
	<uni-popup ref="openJoinSuccess" type="top" :animation="true">
		<view class="popupBox">
			<view class="popupBox-wrapperbg">
				<view class="popupBox-container">
					<view class="popupBox-headerImage">
						<image :class="langType == 'cn' ? 'popupBox-headerImage--cn' : 'popupBox-headerImage--en'" :src="i18n.index.indexTitle" mode="widthFix"></image>
					</view>
					<view class="popupBox-contentBox">
						<view class="popupBox-contentBox__tips">{{ i18n.index.tips01 }}</view>
						<view class="popupBox-contentBox__name">“草帽海贼团”</view>
						<view class="popupBox-contentBox__tipsContent">{{ i18n.index.tips02 }}</view>
					</view>
					<view class="popupBox-btn">
						<view class="popupBox-btn__zore3" @click="hidePopup('openJoinSuccess')">{{ i18n.index.btn01 }}</view>
						<view class="popupBox-btn__zore2" @click="$tools.jump('../package/package')">{{ i18n.index.btn02 }}</view>
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
			successData: {},
			langType:'',
		};
	},
	mounted() {
		this.langType = uni.getStorageSync('initLanguage');
		console.log("langType：",this.langType);
		var that = this;
		this.$Bus.$on('successData',function(successData){
			that.successData = successData;
		})
	},
	methods: {
		openPopup(e) {			console.log(e)			this.$refs[e].$refs[e].open();		},		hidePopup(e) {			this.$refs[e].close();		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/openJoinSuccess';
</style>
