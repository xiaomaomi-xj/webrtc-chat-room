import { MessageBoxControl } from "./MessageBoxControl.js";
import { VideoMaxBoxControl } from "./VideoMaxBoxControl.js";

//此为发送者也就是自己专属的显示，附带canvas，用于变换样式
export default class SelfVideoBoxControl {
    private videoBoxEl: HTMLDivElement;
    private videoEl: HTMLVideoElement;
    private videoBoxMaskEl: HTMLDivElement;
    private canvasEl: HTMLCanvasElement;
    private ctxEl: CanvasRenderingContext2D;
    private stream: MediaStream;
    private videoId: string = '';
    private hideCanvas: HTMLCanvasElement;
    private hideCtx: CanvasRenderingContext2D;
    //是否绘画的是显示的那个canvas
    private isShowCanvasSwitch: boolean = true;
    //当前需要绘画的函数
    private draw: Function = () => { };
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
    public constructor() {
        this.stream = new MediaStream();
        this.videoBoxEl = document.createElement('div');
        this.videoBoxMaskEl = document.createElement('div');
        this.videoEl = document.createElement('video');
        this.hideCanvas = document.createElement('canvas');
        this.videoEl.width = 0;
        this.videoEl.height = 0;
        this.videoEl.style.opacity = '0';
        this.videoEl.style.position = 'absolute';
        this.videoEl.style.top = '0';
        this.videoEl.style.left = '0';
        this.canvasEl = document.createElement('canvas');
        this.ctxEl = this.canvasEl.getContext('2d', { alpha: false, willReadFrequently: true }) as CanvasRenderingContext2D;
        this.hideCtx = this.hideCanvas.getContext('2d', { alpha: false, willReadFrequently: true }) as CanvasRenderingContext2D;
        this.videoBoxEl.appendChild(this.videoBoxMaskEl);
        this.videoBoxEl.appendChild(this.videoEl);
        this.videoBoxEl.appendChild(this.hideCanvas);
        this.videoBoxEl.appendChild(this.canvasEl);
        this.hideCanvas.className = 'hide-canvas';
        this.videoBoxEl.classList.add('video-box');
        this.videoBoxMaskEl.className = 'video-box-mask';
        this.changeWh();
        this.listerClickEvent();
        //默认样式
        this.listerSetCanvas();
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
            VideoMaxBoxControl.open(this.canvasEl, this.videoBoxEl, this.hideCanvas);
        });
    }

    //创建视频,自己不需要听见自己的声音
    public createVideo(stream: MediaStream) {
        const videoTracks = stream.getVideoTracks();
        const audioTracks = stream.getAudioTracks();
        if (videoTracks.length < 1 || audioTracks.length < 1) {
            MessageBoxControl.open("视频或音频缺失！", () => window.location.reload());
        }
        audioTracks.forEach(track => this.stream.addTrack(track))
        this.videoEl.srcObject = stream;
        //静音
        this.videoEl.muted = true;
        this.videoEl.width = this.canvasEl.width / 10;
        this.videoEl.height = this.canvasEl.height / 10;
        this.videoEl.onloadedmetadata = _ => {
            this.changeCanvasByVideo(this.videoEl.videoWidth, this.videoEl.videoHeight);
            this.hideCanvas.width = Math.ceil(this.canvasEl.width / 5);
            this.hideCanvas.height = Math.ceil(this.canvasEl.height / 5);
            this.videoEl.play();
        }
    }

    //获取整个节点，用于添加
    public getVideoBoxEl(): HTMLDivElement {
        return this.videoBoxEl;
    }


    //设置id
    public setVideoId(id: string) {
        this.videoId = id;
    }

    //获取id
    public getVideoId() {
        this.videoId;
    }

    //监听设置canvas,两个canvas，根据样式需要设置不同的canvas
    private listerSetCanvas() {
        if (this.isShowCanvasSwitch) {
            this.ctxEl.drawImage(this.videoEl, 0, 0, this.canvasEl.width, this.canvasEl.height);
            this.draw();
        } else {
            this.hideCtx.drawImage(this.videoEl, 0, 0, this.hideCanvas.width, this.hideCanvas.height);
            this.ctxEl.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.ctxEl.fillStyle = 'white';
            this.ctxEl.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.draw();
        }
        //需要绑定this
        setTimeout(this.listerSetCanvas.bind(this));
    }

    //根据视频的大小控制canvas的大小
    private changeCanvasByVideo(width: number, height: number) {
        if (width === 0 || height === 0) {
            this.canvasEl.width = this.currentWh.w;
            this.canvasEl.height = this.currentWh.h;
            return;
        }
        let wRotia = width / this.currentWh.w;
        let hRatio = height / this.currentWh.h;
        //视频很宽
        if (wRotia >= hRatio) {
            this.canvasEl.width = this.currentWh.w;
            //防止分辨率错误
            this.canvasEl.height = Math.ceil(height / wRotia / 2) * 2
            return;
        }
        this.canvasEl.height = this.currentWh.h;
        //防止分辨率错误
        this.canvasEl.width = Math.ceil(width / hRatio / 2) * 2
    }

    //如果有屏幕共享的话，需要修改video内容来影响canvas
    public modifyVideo(stream: MediaStream) {
        this.videoEl.srcObject = stream;
    }

    //获取canvas流
    public getStream(): MediaStream {
        const canvasStream = this.canvasEl.captureStream();
        const videoTracks = canvasStream.getVideoTracks();
        videoTracks.forEach(track => this.stream.addTrack(track));
        return this.stream;
    }

    //修改canvas的样式内容
    public modifyStyle(styleName: string) {
        try {
            eval(`this.${styleName}();`);
        } catch (e) {
            MessageBoxControl.open("不存在的人脸样式！");
        }
    }

    //普通，不做处理，默认就是这个
    private original() {
        this.isShowCanvasSwitch = true;
        this.draw = () => { };
    }

    //黑白
    private grayscale() {
        this.isShowCanvasSwitch = true;
        this.draw = this.handleGrayscale;
    }

    //数据处理
    private handleGrayscale() {
        const imgData = this.ctxEl.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
            var avg = Math.floor(0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
        }
        this.ctxEl.putImageData(imgData, 0, 0);
    }

    //复古
    private sepia() {
        this.isShowCanvasSwitch = true;
        this.draw = this.handleSepia;
    }

    //数据处理
    private handleSepia() {
        const imgData = this.ctxEl.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
            let red = data[i], green = data[i + 1], blue = data[i + 2];
            data[i] = Math.min(Math.round(0.393 * red + 0.769 * green + 0.189 * blue), 255);
            data[i + 1] = Math.min(Math.round(0.349 * red + 0.686 * green + 0.168 * blue), 255);
            data[i + 2] = Math.min(Math.round(0.272 * red + 0.534 * green + 0.131 * blue), 255);
        }
        this.ctxEl.putImageData(imgData, 0, 0);
    }

    //反差
    private invert() {
        this.isShowCanvasSwitch = true;
        this.draw = this.handleInvert;
    }

    //数据处理
    private handleInvert() {
        const imgData = this.ctxEl.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
        this.ctxEl.putImageData(imgData, 0, 0);
    }

    //简单美颜
    private applyBeautyEffect() {
        this.isShowCanvasSwitch = true;
        this.draw = this.handleApplyBeautyEffect;
    }

    //数据处理
    private handleApplyBeautyEffect() {
        const imgData = this.ctxEl.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i] += 50;
            data[i + 1] += 50;
            data[i + 2] += 50;
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] += avg * 0.1;
            data[i + 1] += avg * 0.1;
            data[i + 2] += avg * 0.1;
        }
        this.ctxEl.putImageData(imgData, 0, 0);
    }

    //字符化
    private characterize() {
        this.isShowCanvasSwitch = false;
        this.draw = this.handleCharacterize;
    }

    //数据处理
    private handleCharacterize() {
        const imgData = this.hideCtx.getImageData(0, 0, this.hideCanvas.width, this.hideCanvas.height);
        const data = imgData.data;
        let x = 0;
        let y = 0;
        let asciiArr = "#$@WOo[(/?=~*^_` ".split("");
        let ratio = 257 / asciiArr.length;
        for (let i = 0; i < data.length; i += 4) {
            var avg = Math.floor(0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
            let index = Math.round(Math.floor(avg / ratio));
            this.ctxEl.fillStyle = 'black';
            this.ctxEl.font = "5px Arial";
            this.ctxEl.fillText(asciiArr[index], x, y);
            x += 5;
            if (x >= this.canvasEl.width) {
                y += 5;
                x = 0;
            }
        }
    }
}