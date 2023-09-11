import { VideoMaxBoxControl } from "./VideoMaxBoxControl.js";
export default class VideoBoxControl {
    constructor(sfId) {
        this.videoId = '';
        this.sjWh = {
            w: 160,
            h: 214
        };
        this.dnWh = {
            w: 480,
            h: 360
        };
        this.currentWh = {
            w: 0,
            h: 0
        };
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
        videoMaskIdEl.className = 'video-mask-id';
        videoMaskIdEl.innerText = sfId;
        this.videoBoxMaskEl.appendChild(videoMaskIdEl);
        this.changeWh();
        this.listerClickEvent();
    }
    changeWh() {
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
    listerClickEvent() {
        this.videoBoxMaskEl.addEventListener('click', _ => {
            VideoMaxBoxControl.open(this.videoEl, this.videoBoxEl, null);
        });
    }
    createVideo(stream) {
        this.videoEl.srcObject = stream;
        this.videoEl.muted = false;
        this.videoEl.onloadedmetadata = _ => {
            this.changeVideo(this.videoEl.videoWidth, this.videoEl.videoHeight);
            this.videoEl.play();
        };
    }
    getVideoBoxEl() {
        return this.videoBoxEl;
    }
    setVideoId(id) {
        this.videoId = id;
    }
    getVideoId() {
        return this.videoId;
    }
    changeVideo(width, height) {
        if (width === 0 || height === 0) {
            this.videoEl.width = this.currentWh.w;
            this.videoEl.height = this.currentWh.h;
            return;
        }
        let wRotia = width / this.currentWh.w;
        let hRatio = height / this.currentWh.h;
        if (wRotia >= hRatio) {
            this.videoEl.width = this.currentWh.w;
            this.videoEl.height = Math.ceil(height / wRotia / 2) * 2;
            return;
        }
        this.videoEl.height = this.currentWh.h;
        this.videoEl.width = Math.ceil(width / hRatio / 2) * 2;
    }
}
