import { VideoMaxBoxControl } from "./VideoMaxBoxControl.js";

//此为别人专属的显示，直接使用视频组件进行显示即可
export default class VideoBoxControl {
    private videoBoxEl: HTMLDivElement;
    private videoEl: HTMLVideoElement;
    private videoBoxMaskEl: HTMLDivElement;
    private videoId: string = '';
    //手机和电脑的尺寸
    private sjWh = {
        w: 160,
        h: 214
    };
    private dnWh = {
        w: 480,
        h: 360
    };
    private currentWh = {
        w: 0,
        h: 0
    }
    public constructor(sfId: string) {
        this.videoBoxEl = document.createElement('div');
        this.videoBoxMaskEl = document.createElement('div');
        this.videoEl = document.createElement('video');
        this.videoEl.width = 0;
        this.videoEl.height = 0;
        this.videoBoxEl.appendChild(this.videoBoxMaskEl);
        this.videoBoxEl.appendChild(this.videoEl);
        this.videoBoxEl.classList.add('video-box');
        this.videoBoxMaskEl.className = 'video-box-mask';
        const videoMaskIdEl = document.createElement('div');
        videoMaskIdEl.className='video-mask-id';
        videoMaskIdEl.innerText = sfId;
        this.videoBoxMaskEl.appendChild(videoMaskIdEl);
        this.changeWh();
        this.listerClickEvent();
    }

    //自处理
    private changeWh() {
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        if (windowWidth > windowHeight) {
            this.videoBoxEl.style.width = this.dnWh.w + 'px';
            this.videoBoxEl.style.height = this.dnWh.h + 'px';
            this.currentWh.w = this.dnWh.w;
            this.currentWh.h = this.dnWh.h;
            return;
        }
        this.videoBoxEl.style.width = this.sjWh.w + 'px';
        this.videoBoxEl.style.height = this.sjWh.h + 'px';
        this.currentWh.w = this.sjWh.w;
        this.currentWh.h = this.sjWh.h;
    }

    //点击事件
    private listerClickEvent() {
        this.videoBoxMaskEl.addEventListener('click', _ => {
            VideoMaxBoxControl.open(this.videoEl, this.videoBoxEl, null);
        });
    }

    //创建视频
    public createVideo(stream: MediaStream) {
        this.videoEl.srcObject = stream;
        this.videoEl.muted = false;
        this.videoEl.onloadedmetadata = _ => {
            this.changeVideo(this.videoEl.videoWidth, this.videoEl.videoHeight);
            this.videoEl.play();
        }
    }

    //获取整个节点，用于删除和添加
    public getVideoBoxEl(): HTMLDivElement {
        return this.videoBoxEl;
    }

    //设置id
    public setVideoId(id: string) {
        this.videoId = id;
    }

    //获取id
    public getVideoId(): string {
        return this.videoId;
    }

    //调节视频的大小
    private changeVideo(width: number, height: number) {
        if (width === 0 || height === 0) {
            this.videoEl.width = this.currentWh.w;
            this.videoEl.height = this.currentWh.h;
            return;
        }
        let wRotia = width / this.currentWh.w;
        let hRatio = height / this.currentWh.h;
        //视频很宽
        if (wRotia >= hRatio) {
            this.videoEl.width = this.currentWh.w;
            //防止分辨率错误
            this.videoEl.height = Math.ceil(height / wRotia / 2) * 2
            return;
        }
        this.videoEl.height = this.currentWh.h;
        //防止分辨率错误
        this.videoEl.width = Math.ceil(width / hRatio / 2) * 2
    }
}