<script>
console.log('%c代码由%c lowkey %c开发', 'color: white;font-size: 18px;', 'color: white;font-size: 24px;', 'color: white;font-size: 18px;');

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
		let that = this;
		let web3;
		
		// if (typeof web3 !== 'undefined') {
		//   web3 = new that.$web3(web3.currentProvider);
		// } else {
		//   // set the provider you want from Web3.providers
		//   web3 = new that.$web3(new that.$web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));
		// }
		
		// ethereum.request({ method: 'eth_requestAccounts' }).then(accounts =>{
		// 	web3.eth.defaultAccount = accounts[0];
		// 	that.$store.commit('changeuserWalletAddress', accounts[0]);
		// });
		
		// // web3.eth.defaultAccount = '0x1DF1353C05BD5c66457109e32D90A178aC9B20ed';
		// // that.$store.commit('changeuserWalletAddress', '0x1DF1353C05BD5c66457109e32D90A178aC9B20ed');
		
		// web3.eth.getBalance("0x1DF1353C05BD5c66457109e32D90A178aC9B20ed").then(result=>{
		// 	console.log(result);
		// 	console.log(web3.utils.fromWei(result,'ether'))
		// });
		
		// var contractAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
		
		// var contractAddress = "0x6c65c4b2f45dfe8648383dd8296efde731438a01";
		
		// var currentAccount = "0x1DF1353C05BD5c66457109e32D90A178aC9B20ed";
		
		// var myContract = new web3.eth.Contract(contractAbi, contractAddress, {
		//     from: currentAccount // default from address
		// })
		
		// myContract.methods.balanceOf(currentAccount).call({from: currentAccount}, function(error, result){
		//     if(!error) {
		//         console.log(result);
		//     } else {
		//         console.log(error);
		//     }
		// });
		
		// myContract.methods.getOwner().call({from: currentAccount}, function(error, result){
		//     if(!error) {
		//       console.log(result);
		//      } else {
		//       console.log(error);
		//      }
		// });
		
		// myContract.methods.name().call({from: currentAccount}, function(error, result){
		//     if(!error) {
		//         console.log('获取到的余额：' + result);
		//     } else {
		//         console.log(error);
		//     }
		// });
		
		// myContract.methods.totalSupply().call({from: currentAccount}, function(error, result){
		//     if(!error) {
		//       console.log(result);
		//      } else {
		//       console.log(error);
		//      }
		// });
		
		/* 获取默认的地址 */
		// ethereum.request({ method: 'eth_requestAccounts' }).then(accounts =>{
		// 	console.log(accounts[0]);
		// 	that.$store.commit('changeuserWalletAddress', accounts[0]);
		// });
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
page,.pages{
	background-color: #FFFFFF;
}
</style>