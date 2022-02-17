const tronWeb = {};

//获取主网币TRX的余额
tronWeb.getBalance = (userWalletAddress, contractDecimal) => {
	/* 
	 userWalletAddress：需要查询余额的钱包地址
	 contractDecimal：TRX的精度
	 */

	// console.log("userWalletAddress---" + userWalletAddress);
	// console.log("contractDecimal---" + contractDecimal);

	return new Promise((resolve, reject) => {
		window.tronWeb.trx.getBalance(userWalletAddress).then(result => {
			let data = (result / Math.pow(10, contractDecimal));
			resolve(data);
		})
	});
}

//获取代币的余额
tronWeb.getContractBalance = (userWalletAddress, contractAddress, contractDecimal) => {
	/* 
	 userWalletAddress：需要查询余额的钱包地址
	 contractAddress：代币的合约地址
	 contractDecimal：代币的精度
	 */

	// console.log("userWalletAddress---" + userWalletAddress);
	// console.log("contractAddress---" + contractAddress);
	// console.log("contractDecimal---" + contractDecimal);

	const parameter1 = [{
		type: 'address',
		value: userWalletAddress
	}];

	return new Promise((resolve, reject) => {
		window.tronWeb.transactionBuilder
			.triggerConstantContract(
				window.tronWeb.address.toHex(contractAddress),
				'balanceOf(address)', {},
				parameter1,
				window.tronWeb.address.toHex(userWalletAddress)
			)
			.then(result => {
				let data = (window.tronWeb.toDecimal('0x' + result.constant_result[0]) / Math.pow(10,
					contractDecimal));
				resolve(data);
			});
	});
}

//代币转账获取交易哈希
tronWeb.getHashByTransfer = (userWalletAddress, contractAddress, contractDecimal, toContactAddress, quantity) => {
	/*
	userWalletAddress: 需要转出的钱包地址,
	 contractAddress：代币的合约地址
	 contractDecimal：代币的精度
	 toContactAddress：转账的钱包地址
	 quantity：转账数量
	 */

	// console.log("userWalletAddress---" + userWalletAddress);
	// console.log("contractAddress---" + contractAddress);
	// console.log("contractDecimal---" + contractDecimal);
	// console.log("toContactAddress---" + toContactAddress);
	// console.log("quantity---" + quantity);


	let parameter1 = [{
		type: 'address',
		value: toContactAddress
	}, {
		type: 'uint256',
		value: quantity * Math.pow(10, contractDecimal)
	}];

	return new Promise((resolve, reject) => {
		window.tronWeb.transactionBuilder
			.triggerSmartContract(
				window.tronWeb.address.toHex(contractAddress),
				'transfer(address,uint256)', {},
				parameter1,
				window.tronWeb.address.toHex(userWalletAddress)
			)
			.then(transaction => {
				window.tronWeb.trx.sign(transaction.transaction).then(signedtxn => {
					window.tronWeb.trx.sendRawTransaction(signedtxn).then(result => {
						resolve(result.txid);
					});
				});
			});
	});
}

//调取合约地址的方法（不修改链上数据）
tronWeb.triggerConstantContract = (_userWalletAddress, _contractAddress, _methods, _parameter = []) => {
	let _options = {
		feeLimit: 1000000000,
	};
	return new Promise((resolve, reject) => {
		window.tronWeb.transactionBuilder
			.triggerConstantContract(window.tronWeb.address.toHex(_contractAddress), _methods, _options,
				_parameter, window.tronWeb.address.toHex(_userWalletAddress))
			.then(result => {
				resolve(result);
			}).catch(error => {
				reject(error);
			});
	});
}

//调取合约地址的方法（签名 => 修改链上数据）
tronWeb.triggerSmartContract = (_userWalletAddress, _contractAddress, _methods, _parameter = []) => {
	let _options = {
		feeLimit: 1000000000,
	};
	
	return new Promise((resolve, reject) => {
		window.tronWeb.transactionBuilder
			.triggerSmartContract(window.tronWeb.address.toHex(_contractAddress), _methods, _options,
				_parameter,
				window.tronWeb.address.toHex(_userWalletAddress))
			.then(transaction => {
				window.tronWeb.trx.sign(transaction.transaction).then(signedtxn => {
					window.tronWeb.trx.sendRawTransaction(signedtxn).then(result => {
						resolve(result);
					});
				}).catch(error => {
					reject(error);
				});
			});
	});
}

//根据交易哈希查询交易信息
tronWeb.getTransactionInfo = (_txid) => {
	return new Promise((resolve, reject) => {
		window.tronWeb.trx.getUnconfirmedTransactionInfo(_txid).then(result=>{
			resolve(result);
		}).catch(error =>{
			reject(error);
		})
	});
}

//订阅某个合约的某个事件触发
tronWeb.watchContractEvent = async (_contractAddress, _methods) => {
	let instance = await window.tronWeb.contract().at(_contractAddress);
	
	return new Promise((resolve, reject) => {
		try {
			instance[_methods]().watch((err, eventResult) => {
				if (err) {
					return console.error('Error with "method" event:', err);
				}
				if (eventResult) { 
					console.log('eventResult:',eventResult);
					resolve(eventResult);
				}
			  });
				
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
}

//获取合约回调的数据并格式化输出
tronWeb.getFormatData = (_HEX, _LENGTH, _BOOLEAN = false) => {
	/* 
	_HEX：接收的HEX数据
	_LENGTH：前后端定义的参数数量，根据数量整合数据
	_BOOLEAN：是否截取前两个数值（指针和数据的个数）
	 */
	var sliceArray = [];
	let formatArray = [];
	let childArray = [];
	var sliceLength = 64; //ETH/TRON 地址 是256位，行业规则以64位截取

	for (var i = 0, l = _HEX.length; i < l / sliceLength; i++) {
		let sliceItem = _HEX.slice(sliceLength * i, sliceLength * (i + 1));
		sliceArray.push(sliceItem);
	}

	// console.log(sliceArray);

	//智能合约用Push的new Array会编写Length，因此前两个数据代表的是指针和数据的个数，可以删除，键值从第3个开始算起
	for (var i = 2; i < sliceArray.length; i++) {
		let itemData = window.tronWeb.toDecimal('0x' + sliceArray[i]);
		childArray.push(itemData);

		if (i % _LENGTH == 1 && i !== 0) {
			formatArray.push(childArray);
			childArray = [];
		}
	}

	return _BOOLEAN ? formatArray : sliceArray;
}

export default tronWeb
