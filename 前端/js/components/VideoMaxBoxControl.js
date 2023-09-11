var _a;
export class VideoMaxBoxControl {
    static mount(el) {
        el.appendChild(this.videoMaxBoxEl);
    }
    static unMount(el) {
        el.removeChild(this.videoMaxBoxEl);
    }
    static createNode(canvasOrVideoEl, videoBoxEl, hideCanvas) {
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
    static open(canvasOrVideoEl, videoBoxEl, hideCanvas) {
        this.videoMaxBoxEl.innerHTML = '';
        this.videoMaxBoxEl.appendChild(this.createNode(canvasOrVideoEl, videoBoxEl, hideCanvas));
        this.videoMaxBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.videoMaxBoxEl.style.opacity = '1';
        });
    }
    static close(canvasOrVideoEl, videoBoxEl, hideCanvas) {
        this.videoMaxBoxEl.style.opacity = '0';
        setTimeout(() => {
            if (null != hideCanvas) {
                hideCanvas.width /= 2;
                hideCanvas.height /= 2;
            }
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
_a = VideoMaxBoxControl;
(() => {
    _a.videoMaxBoxEl = document.createElement('div');
    _a.videoMaxBoxEl.className = 'video-max-box';
})();
