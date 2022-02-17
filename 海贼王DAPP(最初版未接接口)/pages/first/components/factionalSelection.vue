<template>
	<view class="factionalSelection">
		<view class="selection-image">
			<image src="@/static/first/icon-first-type.png" mode="widthFix"></image>
		</view>
		<view class="selection-box">
			<view class="selection-box__header">
				<image src="@/static/first/icon-first-headerBox.png" mode="widthFix"></image>
			</view>
			<view class="selection-box__item">
				<view class="factional">
					<view class="factional-box" v-for="(item,index) in type" :key="index"
					@click="checkType(index,item.name)">
						<view class="factional-box__item">
							<view class="factional-box__item-box" :class="{'factional-box__item-box--active' : checkActive == index}">
								<view class="factional-box__item-box__name" :class="{'factional-box__item-box__name--active' : item.check == 1}">{{ item.name }}</view>
							</view>
							<image v-if="checkActive == index" class="factional-box__item-image" src="@/static/first/active.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="subscription-head">
					<image src="@/static/first/icon-first-bottomTitle.png" mode="widthFix"></image>
				</view>
				<view class="subscription-box">
					<view class="subscription-box__tipsName">您当前已选择</view>
					<view class="subscription-box__name">“{{ checkName }}”</view>
					<view class="subscription-box__tips">请及时认购海贼团，防止海贼团名额被他人抢购哦！</view>
				</view>
				<view class="popupBox-btn subscription-margin">
					<view class="popupBox-btn__zore3" @click="getCheckName()">点击授权</view>
					<view class="popupBox-btn__zore2" @click="submit()">点击购买</view>
				</view>
				<view class="subscription-data ">
					<view class="subscription-data__num">需支付：2400.00</view>
					<view class="subscription-data__num">钱包余额：20000.000</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type:[
				{name:'罗杰海贼团',check:'1'},{name:'白胡子海贼团',check:'0'},{name:'百兽海贼团',check:'0'},{name:'BIG MOM 海贼团',check:'0'},{name:'红发海贼团',check:'0'},
				{name:'黑胡子海贼团',check:'1'},{name:'草帽海贼团',check:'0'},{name:'飞空海贼团',check:'0'},{name:'堂吉珂得海贼团',check:'1'},{name:'亚尔丽塔海贼团',check:'1'},
				{name:'巴基海贼团',check:'1'},{name:'黑猫海贼团',check:'1'},{name:'克利克海贼团',check:'0'},{name:'恶龙海贼团',check:'0'},{name:'巨人海贼团',check:'0'},
				{name:'白铁海贼团',check:'0'},{name:'贝拉米海贼团',check:'0'},{name:'福克西海贼团',check:'1'},{name:'新鱼人海贼团',check:'0'},{name:'乌普索海贼团',check:'0'},
				{name:'艾斯海贼团',check:'1'},{name:'四皇海贼团',check:'0'},{name:'心脏海贼团',check:'0'},{name:'小丑巴基海贼团',check:'1'},{name:'ON AIR海贼团',check:'1'},
				{name:'德雷克海贼团',check:'1'},{name:'破戒僧海贼团',check:'1'},{name:'基德海贼团',check:'0'},{name:'霍金斯海贼团',check:'0'},{name:'火焰坦克海贼团',check:'0'},
			],
			checkActive: 0,
			checkName: '',
		};
	},
	created() {
		this.getCheckName();
	},
	methods: {
		getCheckName(){
			if(this.checkName == ''){
				this.checkName = this.type[0].name;
			}
			console.log('type',this.type[0].name);
			// this.$emit('typeList',this.type);
		},
		submit(){
			this.$emit('openPopup','openSuccessfulSubscription');
		},
		openTransferHero(){
			this.$emit('openPopup', 'openTransferHero');
			this.hidePopup('openPopupDetail');
		}, 
		checkType(index,name){
			if (this.checkActive != index) {
				this.checkActive = index;
				this.checkName = name;
			}
		},
	}
}
</script>

<style lang="scss" scoped>
@import '/scss/factionalSelection';
</style>
