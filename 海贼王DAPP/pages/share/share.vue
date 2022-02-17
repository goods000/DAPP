<template>
	<view class="pages">
		<view class="main">
			<!-- <bgBox /> -->
			
			<view class="share" v-if="invite && factionalData.myGang != '无'">
				<view class="share-wrapper">
					<view class="share-title">{{ i18n.share.title01 }}</view>
					<view class="share-tips">{{ i18n.share.name }}<text>{{ invite }}</text>{{ i18n.share.tips01 }}</view>
					<view class="share-name">“{{ factionalData.name }}”</view>
					<view class="share-bg">{{ i18n.share.tips02 }}</view>
					<view class="share-btn">
						<view class="share-btn__disabled">{{ i18n.share.btn01 }}</view>
						<!-- <view class="share-btn__style" @click="$tools.jump('../index/index')">加入</view> -->
						<view class="share-btn__style" @click="checkParentByAddress()">{{ i18n.share.jion }}</view>
					</view>
				</view>
			</view>
			<view class="share" v-else>
			<!-- <view class="share" v-if="invite && factionalData.myGang == '无'"> -->
				<view class="share-wrapper">
					<view class="share-title">{{ i18n.share.title02 }}</view>
					<view class="share-tips">{{ i18n.share.tips03 }}</view>
					<view class="share-bg">{{ i18n.share.tips04 }}</view>
					<view class="share-btn">
						<view class="share-btn__disabled">{{ i18n.share.btn01 }}</view>
						<view class="share-btn__style" @click="$tools.jump('./teamChoose')">{{ i18n.share.btn02 }}</view>
						<!-- <view class="share-btn__style" @click="$tools.jump('../index/index')">选择</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import bgBox from './components/bgBox';

import lowkeyLoading from '@/components/lowkey-loading/lowkey-loading'

export default {
	components: {
		bgBox,
		lowkeyLoading
	},
	data() {
		return {
			// userWalletAddress: '---',
			loadingShow: true,
			invite: '',
			locationSearch: '',
			factionalData:{},
		};
	},
	onShow() {
		this.addressID = window.location.search.indexOf('address=');
		// 
		if(window.location.href.indexOf('address=') > -1){
			this.invite = document.URL.split('?')[1].split('address=')[1].substring(0, 34);
		}
		
		console.log("this.addressID：",this.addressID,this.invite);
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58 && this.$store.state.token) {
					clearInterval(obj);
					
					// if(window.location.search.indexOf('address=') > -1){
					// 	this.locationSearch = window.location.search.split('?address=')[1].substring(0, 34);
					// }
					this.init();
					console.log("邀请链接：",this.locationSearch,"邀请链接：",this.invite);
				}
			}, 10);
		})();
	},
	methods: {
		init(){
			this.getFactionalData();
		},
		getFactionalData() {
			this.$Ajax('/front/gang/address/info',{
					address: this.$store.state.userWalletAddress
				},
				res => {
					if(res.obj.gangName == ''){
						this.getData();
						console.log("进绑定")
					}else{
						console.log("进首页")
						this.$tools.jump('../index/index');
					}
				}
			);
		},
		getData() {
			this.$Ajax('/front/gang/query',{
					address: this.invite
				},
				res => {
					this.factionalData = res.obj;
					// this.checkParentByAddress();
				}
			);
		},
		checkParentByAddress() {
			this.$Ajax('/front/common/query', {}, res => {
				console.log('欲绑定上级地址 -> ', this.invite);
		
				if (!res.obj && this.invite != '') {
					this.bindParent();
				}
			});
		},
		bindParent() {
			if (this.$store.state.userWalletAddress == this.invite) {
				return;
			}
			this.$Ajax(
				'/front/common/bind/parent',
				{
					parentAddress: this.invite
				},
				res => {
					this.$tools.jump('../index/index');
				}
			);
		},
		openPopup(e) {
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script> 

<style lang="scss" scoped>
@import '/scss/share';
</style>
