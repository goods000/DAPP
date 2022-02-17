<script>
// console.log('%c代码由%c lowkey %c开发', 'color: white;font-size: 18px;', 'color: white;font-size: 24px;', 'color: white;font-size: 18px;');

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
		
		(async () => {
			var obj = setInterval(async () => {
				if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
					clearInterval(obj);
					let userWalletAddress = window.tronWeb.defaultAddress.base58; //获取地址
					this.$store.commit('changeuserWalletAddress', userWalletAddress);
				}
			}, 10);
		})();

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
		
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>