<template>
	<view class="pages">
		<view class="main">
			<view class="teamChoose">
				<view class="teamChoose-title">
					<image src="@/static/share/icon-share-teamTitle.png" mode="widthFix"></image>
				</view>
				<scroll-view scroll-y="true" class="teamChoose-height">
					<view class="teamChoose-wrapper">
						<view class="teamChoose-item" v-for="(item,index) in teamList" :key="index" @click="checkType(index,item.name,item.price)">
							<view class="teamChoose-item__box" :class="{'teamChoose-item__box--active' : checkActive == index}">
								<view class="teamChoose-item__box-title" :class="{'teamChoose-item__box-title--active' : item.sold == 1}">{{ item.name }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="teamChoose-btn">
					<view class="teamChoose-btn__style" @click="$tools.back()">返回</view>
					<view class="teamChoose-btn__style" @click="getBuy()">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loadingShow: true,
			// teamList:[],
			teamList:[
				{name:'罗杰海贼团',check:'1'},{name:'白胡子海贼团',check:'0'},{name:'百兽海贼团',check:'0'},{name:'BIG MOM 海贼团',check:'0'},{name:'红发海贼团',check:'0'},
				{name:'黑胡子海贼团',check:'1'},{name:'草帽海贼团',check:'0'},{name:'飞空海贼团',check:'0'},{name:'堂吉珂得海贼团',check:'1'},{name:'亚尔丽塔海贼团',check:'1'},
				{name:'巴基海贼团',check:'1'},{name:'黑猫海贼团',check:'1'},{name:'克利克海贼团',check:'0'},{name:'恶龙海贼团',check:'0'},{name:'巨人海贼团',check:'0'},
				{name:'白铁海贼团',check:'0'},{name:'贝拉米海贼团',check:'0'},{name:'福克西海贼团',check:'1'},{name:'新鱼人海贼团',check:'0'},{name:'乌普索海贼团',check:'0'},
				{name:'艾斯海贼团',check:'1'},{name:'四皇海贼团',check:'0'},{name:'心脏海贼团',check:'0'},{name:'小丑巴基海贼团',check:'1'},{name:'ON AIR海贼团',check:'1'},
				{name:'德雷克海贼团',check:'1'},{name:'破戒僧海贼团',check:'1'},{name:'基德海贼团',check:'0'},{name:'霍金斯海贼团',check:'0'},{name:'火焰坦克海贼团',check:'0'},
			],
			checkActive: 0,
			checkName: '',
			price: '',
		};
	},
	onShow() {
		console.log("window.tronWeb：",window.tronWeb);
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58 && this.$store.state.token) {
					clearInterval(obj);
					
					this.init();
				}
			}, 10);
		})();
	},
	methods: {
		init(){
			this.getTeamList();
		},
		// 获取所有门派
		getTeamList() {
			this.$Ajax('/front/gang/list', {}, res=>{
				this.teamList = res.obj;
				if(this.checkName == ''){
					this.checkName = this.teamList[0].name;
				}
				if(this.price == ''){
					this.price = this.teamList[0].price;
				}
				console.log('teamList',this.teamList[0].name);
			})
		},
		// 点击购买启动链上
		getBuy(){
			this.$tools.jump('../index/index');
			// if(uni.getStorageSync('userWalletAddress') == ''){
			// 	return this.$tools.toast('请点击获取授权');
			// }
			// if (this.teamList[this.checkActive].sold == 1) {
			// 	return this.$tools.toast('当前派系已被认购');
			// }
			
			// let parameter = [
			// 	{
			// 		type: 'address',
			// 		value: this.$store.state.clienteContractAddress
			// 	},
			// 	{
			// 		type: 'uint256',
			// 		value: this.teamList[this.checkActive].price * Math.pow(10, 8)
			// 	}
			// ];
			// this.$tronWeb.triggerSmartContract(this.$store.state.userWalletAddress, this.$store.state.usdtContractAddress, 'transfer(address,uint256)', parameter).then(result => {
			// 	uni.showLoading({
			// 		title: '链上确认中',
			// 		mask: true
			// 	});
			
			// 	let timer = setInterval(() => {
			// 		this.$tronWeb.getTransactionInfo(result.txid).then(transcationInfo => {
			// 			console.log('transcationInfo ---> ', transcationInfo);
			// 			if (transcationInfo != null && transcationInfo.receipt != null) {
			// 				clearInterval(timer);
			// 				uni.hideLoading();
			
			// 				if (transcationInfo.receipt.result == 'SUCCESS') {
			// 					this.submit(result.txid);
			// 				} else {
			// 					this.$tools.toast('认购失败');
			// 				}
			// 			}
			// 		});
			// 	}, 1000);
			// });
		},
		// 点击购买
		submit(hash){
			this.$Ajax(
				'/front/gang/buy',
				{
					address: this.$store.state.userWalletAddress,
					hash: hash,
					id: this.teamList[this.checkActive].id
				},
				res => {
					this.openPopup('openSuccessfulSubscription');
					this.teamList[this.checkActive].sold = 1;
				}
			);
		},
		checkType(index,name,price){
			if (this.checkActive != index) {
				this.checkActive = index;
				this.checkName = name;
				this.price = price;
				this.$Bus.$emit('checkName',this.checkName);
			}
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
@import '/scss/teamChoose';
</style>
