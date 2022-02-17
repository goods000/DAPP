<script>

import version from '@/common/js/url.js';
import h5PageAnimation from './components/h5-page-animation/';
export default {
	mixins: [h5PageAnimation],
	// 修复了未登录的重复跳转问题
	globalData: {
		is_flag: true,
		/* 修复nvue页面的多语言功能使用 */
		_i18n: '',
		$t: ''
	},
	onLaunch() {
		const context = this;
		// 这是原型链上的 $i18n
		this.globalData._i18n = this.$i18n;
		this.globalData.$t = function(str) {
			return context.$t(str);
		};

		var needLang = uni.getStorageSync('initLanguage') == 'cn' ? 'zh' : 'en';

		// uni.request({
		// 	url: version.webUrl + '/search/changeLanauage',
		// 	method: 'POST',
		// 	dataType: 'json',
		// 	data: {
		// 		lang: needLang
		// 	},
		// 	header: {
		// 		'content-type': 'application/x-www-form-urlencoded'
		// 	},
		// 	success: res => {}
		// });
	},
	onShow() {
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
					clearInterval(obj);
					this.$store.commit('changeUserWalletAddress', window.tronWeb.defaultAddress.base58);
					uni.request({
						url: version.webUrl + '/front/common/init',
						method: 'POST',
						dataType: 'json',
						data: {
							address: window.tronWeb.defaultAddress.base58
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: res => {
							this.$store.commit('changeToken', res.data.obj);
							if (uni.getStorageSync('functionQueue')) {
								// this.doFunctionQueue(); //修复链上成功的错误
							} else {
								let newArray = [];
								uni.setStorageSync('functionQueue', JSON.stringify(newArray));
							}
						}
					});
				}
			}, 10);
		})();
		/* 修复链上确认的错误 */
		this.doFunctionQueue();
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods:{
		doFunctionQueue() {
			let functionQueue = JSON.parse(uni.getStorageSync('functionQueue'));
		
			if (functionQueue.length > 0) {
				functionQueue.forEach((item, index) => {
					if (item.postType == 'buyGang') {
						this.$Ajax('/front/gang/buy', item.postData, res => {
							console.log('宗门信息：', res);
						});
					} 
					functionQueue.splice(index, 1);
					uni.setStorageSync('functionQueue', JSON.stringify(functionQueue));
				});
			}
		},
	}
};
</script>
