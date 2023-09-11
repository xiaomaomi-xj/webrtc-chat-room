var _a;
import FileUtil from "../utils/FileUtil.js";
class ChatMessageVideoControl {
    static mount(el) {
        el.appendChild(this.chatMessageVideoBoxEl);
    }
    static unMount(el) {
        el.removeChild(this.chatMessageVideoBoxEl);
    }
    static open(videoBaseUrl, fileName) {
        this.downloadFileUrl = videoBaseUrl;
        this.downloadFileName = fileName;
        this.videoEl.src = videoBaseUrl;
        this.videoEl.onloadedmetadata = () => {
            this.videoEl.play();
        };
        this.chatMessageVideoBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.chatMessageVideoBoxEl.style.opacity = '1';
        });
    }
    static close() {
        try {
            this.downloadFileUrl = '';
            this.downloadFileName = '';
            this.videoEl.pause();
            this.videoEl.src = '';
        }
        finally {
            this.chatMessageVideoBoxEl.style.opacity = '0';
            setTimeout(() => {
                this.chatMessageVideoBoxEl.style.display = 'none';
            }, 600);
        }
    }
}
_a = ChatMessageVideoControl;
(() => {
    _a.chatMessageVideoBoxEl = document.createElement('div');
    _a.chatMessageVideoBoxEl.className = 'chat-message-video-box';
    const mainEl = document.createElement('div');
    mainEl.className = 'chat-message-video-box-main';
    const headerEl = document.createElement('div');
    headerEl.className = 'chat-message-video-box-header';
    const closeEl = document.createElement('div');
    closeEl.className = 'chat-message-video-box-close';
    closeEl.addEventListener('click', _a.close.bind(_a));
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
    _a.videoEl = document.createElement('video');
    _a.videoEl.className = 'chat-message-video-box-video';
    _a.videoEl.controls = true;
    bodyEl.appendChild(_a.videoEl);
    mainEl.appendChild(bodyEl);
    const footerEl = document.createElement('div');
    footerEl.className = 'chat-message-video-box-footer';
    const btnBox = document.createElement('div');
    btnBox.className = 'button-box';
    btnBox.innerText = '下载';
    btnBox.addEventListener('click', () => {
        FileUtil.downloadFile(_a.downloadFileUrl, _a.downloadFileName);
    });
    footerEl.appendChild(btnBox);
    mainEl.appendChild(footerEl);
    _a.chatMessageVideoBoxEl.appendChild(mainEl);
})();
export default ChatMessageVideoControl;
