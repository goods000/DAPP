/* 本地 */
// const IP = '192.168.0.128:8389';
// const webSocketIP = '192.168.0.128:8389';
// const ISHTTPS = false;
// const version = "v0.01";

/* 测试服 */
// const IP = '47.75.120.242:8070';
// const webSocketIP = '47.75.120.242:8070';
// const ISHTTPS = false;
// const version = "v0.01";

/* 正式服 */
const version = "v0.01";
const IP = 'www.forestworldtale.com';
const webSocketIP = 'www.forestworldtale.com';
const ISHTTPS = true;

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;

export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	version: version
}
