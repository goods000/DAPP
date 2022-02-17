/* 本地 */
const IP = '192.168.2.7:8385';
const webSocketIP = '192.168.2.7:8385';
const ISHTTPS = false;
const version = "v0.01";

/* 测试服 */
// const IP = '47.57.241.206:8026';
// const webSocketIP = '47.57.241.206:8026';
// const ISHTTPS = false;
// const version = "v0.01";

/* 正式服 */
// const version = "v0.01";
// const IP = 'ecd.today';
// const webSocketIP = 'ecd.today';
// const ISHTTPS = true;

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;

export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	version: version
}
