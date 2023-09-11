import FileUtil from "../utils/FileUtil.js";

//因为自定义组件就在聊天上，没有办法再使用自定义组件，需要再写一个
export default class ChatMessageVideoControl {
    private static chatMessageVideoBoxEl;
    private static videoEl: HTMLVideoElement;
    private static downloadFileUrl: string;
    private static downloadFileName: string;

    static {
        this.chatMessageVideoBoxEl = document.createElement('div');
        this.chatMessageVideoBoxEl.className = 'chat-message-video-box';
        const mainEl = document.createElement('div');
        mainEl.className = 'chat-message-video-box-main';
        const headerEl = document.createElement('div');
        headerEl.className = 'chat-message-video-box-header';
        const closeEl = document.createElement('div');
        closeEl.className = 'chat-message-video-box-close';
        closeEl.addEventListener('click', this.close.bind(this));
        const leftEl = document.createElement('div');
        leftEl.className = 'chat-message-video-box-left';
        const rightEl = document.createElement('div');
        rightEl.className = 'chat-message-video-box-right';
        closeEl.appendChild(leftEl);
        closeEl.appendChild(rightEl);
        headerEl.appendChild(closeEl);
        mainEl.appendChild(headerEl);
        const bodyEl = document.createElement('div');
        bodyEl.className = 'chat-message-video-box-body';
        this.videoEl = document.createElement('video');
        this.videoEl.className = 'chat-message-video-box-video';
        this.videoEl.controls = true;
        bodyEl.appendChild(this.videoEl);
        mainEl.appendChild(bodyEl);
        const footerEl = document.createElement('div');
        footerEl.className = 'chat-message-video-box-footer';
        const btnBox = document.createElement('div');
        btnBox.className = 'button-box';
        btnBox.innerText = '下载';
        btnBox.addEventListener('click', () => {
            FileUtil.downloadFile(this.downloadFileUrl, this.downloadFileName);
        });
        footerEl.appendChild(btnBox);
        mainEl.appendChild(footerEl);
        this.chatMessageVideoBoxEl.appendChild(mainEl);
    }
    //挂载
    static mount(el: HTMLElement) {
        el.appendChild(this.chatMessageVideoBoxEl);
    }
    //卸载
    static unMount(el: HTMLElement) {
        el.removeChild(this.chatMessageVideoBoxEl);
    }

    //开启
    static open(videoBaseUrl: string, fileName: string) {
        this.downloadFileUrl = videoBaseUrl;
        this.downloadFileName = fileName;
        this.videoEl.src = videoBaseUrl;
        this.videoEl.onloadedmetadata = () => {
            this.videoEl.play();
        }
        this.chatMessageVideoBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.chatMessageVideoBoxEl.style.opacity = '1';
        });
    }

    //关闭
    private static close() {
        try {
            this.downloadFileUrl = '';
            this.downloadFileName = '';
            this.videoEl.pause();
            this.videoEl.src = '';
        } finally {
            this.chatMessageVideoBoxEl.style.opacity = '0';
            setTimeout(() => {
                this.chatMessageVideoBoxEl.style.display = 'none';
            }, 600);
        }
    }
}