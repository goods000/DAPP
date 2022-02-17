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

export default tronWeb
