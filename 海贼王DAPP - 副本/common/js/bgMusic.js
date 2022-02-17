const bgm = uni.createInnerAudioContext();
bgm.src = require('@/static/mp3/mp3-bg.mp3')
bgm.loop = true;
// bgm.autoplay = true;

var bgMusic = {
    //mute 表示是否是静音，，默认不静音 
	startBgm(src){
		if (!bgm) return;
		bgm.src = src;
		this.playBgm({ mute: true });
		bgm.play();
	},
    playBgm({mute=false}){
        if (!bgm) return;
        if(mute){
            bgm.pause()
        }else{
            bgm.play()
        }
        
        bgm.onPause(()=>{
            console.log('暂停背景音乐');
        })
        bgm.onPlay(() => {
            console.log('开始播放音乐#######');
        })
        bgm.onError((res) => {
            console.log(res)
        })
    }
}
module.exports = bgMusic