//video-max-box组件，用于放大显示
export class VideoMaxBoxControl {
    private static videoMaxBoxEl;
    static {
        this.videoMaxBoxEl = document.createElement('div');
        this.videoMaxBoxEl.className = 'video-max-box';
    }
    //挂载
    static mount(el: HTMLElement) {
        el.appendChild(this.videoMaxBoxEl);
    }
    //卸载
    static unMount(el: HTMLElement) {
        el.removeChild(this.videoMaxBoxEl);
    }
    //创建节点
    private static createNode(canvasOrVideoEl: HTMLCanvasElement | HTMLVideoElement, videoBoxEl: HTMLDivElement, hideCanvas: HTMLCanvasElement | null): HTMLElement {
        const mainEl = document.createElement('div');
        mainEl.className = 'video-max-box-main';
        const headerEl = document.createElement('div');
        headerEl.className = 'video-max-box-header';
        const closeEl = document.createElement('div');
        closeEl.className = 'video-max-box-close';
        closeEl.addEventListener('click', this.close.bind(this, canvasOrVideoEl, videoBoxEl, hideCanvas));
        const leftEl = document.createElement('div');
        leftEl.className = 'video-max-box-left';
        const rightEl = document.createElement('div');
        rightEl.className = 'video-max-box-right';
        closeEl.appendChild(leftEl);
        closeEl.appendChild(rightEl);
        headerEl.appendChild(closeEl);
        mainEl.appendChild(headerEl);
        const bodyEl = document.createElement('div');
        bodyEl.className = 'video-max-box-body';
        //放大一倍
        if (hideCanvas != null) {
            hideCanvas.width *= 2;
            hideCanvas.height *= 2;
        }
        canvasOrVideoEl.width *= 2;
        canvasOrVideoEl.height *= 2;
        bodyEl.appendChild(canvasOrVideoEl);
        mainEl.appendChild(bodyEl);
        const footerEl = document.createElement('div');
        footerEl.className = 'video-max-box-footer';
        mainEl.appendChild(footerEl);
        return mainEl;
    }

    //开启,其他人的话传视频就好了，自己的传canvas，因为自己的存在换流操作
    static open(canvasOrVideoEl: HTMLCanvasElement | HTMLVideoElement, videoBoxEl: HTMLDivElement, hideCanvas: HTMLCanvasElement | null) {
        //先清空
        this.videoMaxBoxEl.innerHTML = '';
        this.videoMaxBoxEl.appendChild(this.createNode(canvasOrVideoEl, videoBoxEl, hideCanvas));
        this.videoMaxBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.videoMaxBoxEl.style.opacity = '1';
        });
    }

    //关闭
    private static close(canvasOrVideoEl: HTMLCanvasElement | HTMLVideoElement, videoBoxEl: HTMLDivElement, hideCanvas: HTMLCanvasElement | null) {
        this.videoMaxBoxEl.style.opacity = '0';
        setTimeout(() => {
            if (null != hideCanvas) {
                hideCanvas.width /= 2;
                hideCanvas.height /= 2;
            }
            //把组件再还回去，不用来回创造了,把宽高调一下
            canvasOrVideoEl.width /= 2;
            canvasOrVideoEl.height /= 2;
            videoBoxEl.appendChild(canvasOrVideoEl);
        }, 400);
        setTimeout(() => {
            this.videoMaxBoxEl.style.display = 'none';
            this.videoMaxBoxEl.innerHTML = '';
        }, 600);
    }
}