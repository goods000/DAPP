/* 英文 */
const messagesEn = {
	/* 全局通用参数 */
	global: {
		record: 'Record',
		detail: 'Detail',
		account: 'Account',
		phone: 'Phone',
		password: 'Password',
		tradePassword: 'Transaction password',
		send: 'Send',
		resend: 'Resend',
		modify: 'Modify',
		close: 'Close',
		cancel: 'Cancel',
		enter: 'Enter',
		confirm: 'Confirm',
		finish: 'Finish',
		default: 'Default',
		buy: 'Buy',
		buyIn: 'Buy',
		buyType: 'B',
		sell: 'Sell',
		sellOut: 'Sell',
		sellType: 'S',
		import: 'Import',
		search: 'Search',
		more: 'More',
		next: 'Next',
		sumbit: 'Sumbit',
		apply: 'Appley',
		all: 'All',
		copy: 'Copy',
		share: 'Share',
		no: 'No',
		yes: 'Yes',
		revoke: 'Revoke',
		digits_6: 'Depth 6',
		digits_5: 'Depth 5',
		digits_4: 'Depth 4',
		digits_3: 'Depth 3',
		digits_2: 'Depth 2',
		recharge: 'Recharge',
		withdraw: 'Withdraw',
		transfer: 'Transfer',
		time: 'Time',
		status: 'Status',
		price: 'Price',
		unitPrice: 'Unit price',
		quantity: 'Quantity',
		using: 'Using',
		freeze: 'Freeze',
		amount: 'Amount',
		remark: 'Remark',
		type: 'Type',
		method: 'Method',
		number: 'Number',
		coinType: 'Currency',
		profit: 'Profit',
		income: 'Income',
		totalProfit: 'Total profit',
		strategy: 'Strategy',
		hash: 'Hash',
		chooseCoinType: 'Choose currency',
		chooseChainType: 'Chain type',
		tradeAmount: 'Amount',
		totalAmount: 'Amount',
		waitRelease: 'Wait release',
		address: 'Address',
		reminder: 'Reminder',
		serviceCharge: 'Service charge',
		actualReceipt: 'Actual receipt',
		available: 'Available',
		walletName: 'Wallet name',
		blockHeight: 'Block height',
		limitOrder: 'Limit',
		marketOrder: 'Market',
		executed: 'Executed',
		position: 'Position',
		minerFee: 'Miner fee',
		finalPrice: 'Final Price',
		volume: 'Volume',
		turnover: 'Turnover',
		totalRevenue: 'Total revenue',
		day: 'Day',
		yearType: 'Y',
		monthType: 'M',
		dayType: 'D',
		sendSuccess: 'Send success',
		modifySuccess: 'Modify success',
		copySuccess: 'Copy success',
		revokeSuccess: 'Revoke success',
		atLast: 'At last',
		noData: 'No data',
		comingSoon: 'Not yet activated',
		qrcodeLoading: 'Loading',
		loading: 'Loading'
	},

	/* 首页 */
	banner: {
		img_01: '../../static/index/img-header-title-en.jpg',
	},

	/* 简介 */
	introduction: {
		title: '../../static/index/icon-title-introduction-en.png',
	},

	/* 账户 */
	account: {
		title: '../../static/index/icon-title-account-en.png',
		assetsType_01: 'Wallet account',
		assetsType_02: 'Reserve account',
	},

	/* 兑换 */
	exchange: {
		title: 'ECD Exchange',
		label: 'USDT account:',
		btn: 'Confirm exchange',
		exchangeRecord: 'Exchange Record'
	},

	/* 质押 */
	pledge: {
		title: '../../static/index/icon-title-pledge-en.png',
		planeLabel: 'Mining pool',
		quantityLabel: 'Pledge quantity',
		usingLable: 'Available quantity:',
		btn: 'Confirm pledge',
		pledge_record_01: 'Pledge Record',
		pledge_record_02: 'Income statistics',
	},

	/* 数据统计 */
	statistics: {
		title: '../../static/index/icon-title-statistics-en.png',
		subTitle_01: 'Personal data statistics',
		subTitle_02: 'Invitation data statistics',
		subTitle_03: 'Smart contract statistics',
		label_01: 'Total amount of personal pledge:',
		label_02: 'Personal total income:',
		label_03: 'My wallet address:',
		label_04: 'Node:',
		label_05: 'Number of invitation wallet addresses:',
		label_06: 'Number of interactive wallet addresses:',
		label_07: 'ECD circulation:',
		label_08: 'ECD mining output:',
		label_09: 'Real-time price:',
		label_10: 'Number of liquidity mining:',
		label_11: 'My invitation link:',
	},

	/* copyright */
	copyright: {
		title: 'ECD team provides technical support',
	},

	/* 兑换记录 */
	exchangeRecord: {
		title: '../../static/index/icon-title-exchangeRecord-en.png',
		assetsType_01: 'Wallet',
		assetsType_02: 'Reserve',
		label_01: 'Account',
		label_02: 'Exchange',
		label_03: 'Get',
	},

	/* 兑换记录 */
	pledgeRecord: {
		title: '../../static/index/icon-title-pledgeRecord-en.png',
		btn: 'Revoke pledge',
		label_01: 'Time',
		label_02: 'Amount',
		label_03: 'Status',
	},

	/* 质押状态 */
	pledgeStatus: {
		status_01: 'Processing',
		status_02: 'Success',
		status_03: 'Failed',
		status_04: 'Removed',
	},

	/* 收益记录 */
	income: {
		title: '../../static/index/icon-title-income-en.png',
		label_01: 'Total amount of personal pledge:',
		label_02: 'Asset pledge income:',
		label_03: 'Invited interactive revenue:',
		tabs_01: 'Pledge',
		tabs_02: 'Invite',
		tabs_03: 'Circulation'
	},

	/* 节点收益 */
	node: {
		title: '../../static/index/icon-title-node-en.png',
		label_01: 'Node:',
		label_02: 'Cumulative income:',
	},

	/* 单位 */
	unit: {
		times: ' times'
	},

	/* 状态 */
	status: {
		applying: 'Applying',
		success: 'Success',
		cancelled: 'Cancelled',
		confirming: 'Confirming',
		completed: 'Completed',
		doing: 'Doing',
	},

	toast: {
		noLogin: 'Please log in first',
		tryAgain: 'Please try again later',
		toastNull: 'System abnormality(Null)',
		dataRepair: 'Data repairing'
	},

	date: {
		day: 'D',
		hour: 'H',
		minute: 'M',
		second: 'S'
	},

	language: {
		cn: 'Simplified Chinese',
		en: 'English',
		ko: 'Korean',
		fr: 'French',
	}
}
export default messagesEn
