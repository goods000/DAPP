import webUrl from './url.js'
import $tools from './tools.js'
import messagesCn from './language/cn';
import messagesEn from './language/en';

const ajax = (url, data, successCallback, failCallBack, type) => {
	var token = uni.getStorageSync('token');
	var lang = uni.getStorageSync('initLanguage');
	data.token = token;
	
	// manifest.json 配置地址

	uni.request({
		url: webUrl.webUrl + url,
		data: data,
		method: type || 'POST',
		dataType: 'json',
		header: {
			"x-requested-with": "XMLHttpRequest",
			"content-type": "application/x-www-form-urlencoded",
			"token": token,
			"lang": lang
		},
		success: (res) => {
			// console.log(webUrl.webUrl + url);
			var code = res.data.code;
			if (code == 0 || code == -6) {
				successCallback(res.data);
			} else if (code == -2) {
				if (getApp().globalData.is_flag) { 
					getApp().globalData.is_flag = false;
					console.log('没有登录');
					setTimeout(function() {
						let message;
						if (uni.getStorageSync('initLanguage') == 'cn') {
							message = messagesCn.toast.noLogin;
						} else if (uni.getStorageSync('initLanguage') == 'en') {
							message = messagesEn.toast.noLogin;
						}

						$tools.toastJump(message, '../index/index');
						uni.removeStorageSync('token');
					}, 100)

					setTimeout(() => {
						getApp().globalData.is_flag = true;
						console.log(getApp().globalData.is_flag);
					}, 1000)

				}

			} else if (code == -1) {
				console.log('此接口有报错：' + url + "--->" + JSON.stringify(data) + "--->" + JSON.stringify(res.data));
				
				let message;
				if (uni.getStorageSync('initLanguage') == 'cn') {
					message = messagesCn.toast.toastNull;
				} else if (uni.getStorageSync('initLanguage') == 'en') {
					message = messagesEn.toast.toastNull;
				}

				if (res.data.msg == '' || res.data.msg == null) {
					$tools.toast(message);
				} else {
					$tools.toast(res.data.msg);
				}

				if (failCallBack) {
					failCallBack(res.data);
				}
			} else if (code == -4) {
				$tools.toast(res.data.msg);
			} else if (code == -6) {
				$tools.toast(res.data.msg);
			}
		},
		fail: () => {
			let message;
			if (uni.getStorageSync('initLanguage') == 'cn') {
				message = messagesCn.toast.tryAgain;
			} else if (uni.getStorageSync('initLanguage') == 'en') {
				message = messagesEn.toast.tryAgain;
			}
			
			// this.$tools.toast('连接失败,请稍后再试');
			$tools.toast(message);
		}
	})
}
export default ajax
