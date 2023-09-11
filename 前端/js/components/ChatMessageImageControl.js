var _a;
import FileUtil from "../utils/FileUtil.js";
class ChatMessageImageControl {
    static mount(el) {
        el.appendChild(this.chatMessageImageBoxEl);
    }
    static unMount(el) {
        el.removeChild(this.chatMessageImageBoxEl);
    }
    static open(imageBaseUrl, fileName) {
        this.downloadFileUrl = imageBaseUrl;
        this.downloadFileName = fileName;
        this.imageEl.src = imageBaseUrl;
        this.chatMessageImageBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.chatMessageImageBoxEl.style.opacity = '1';
        });
    }
    static close() {
        try {
            this.downloadFileUrl = '';
            this.downloadFileName = '';
            this.imageEl.src = '';
        }
        finally {
            this.chatMessageImageBoxEl.style.opacity = '0';
            setTimeout(() => {
                this.chatMessageImageBoxEl.style.display = 'none';
            }, 600);
        }
    }
}
_a = ChatMessageImageControl;
(() => {
    _a.chatMessageImageBoxEl = document.createElement('div');
    _a.chatMessageImageBoxEl.className = 'chat-message-image-box';
    const mainEl = document.createElement('div');
    mainEl.className = 'chat-message-image-box-main';
    const headerEl = document.createElement('div');
    headerEl.className = 'chat-message-image-box-header';
    const closeEl = document.createElement('div');
    closeEl.className = 'chat-message-image-box-close';
    closeEl.addEventListener('click', _a.close.bind(_a));
    const leftEl = document.createElement('div');
    leftEl.className = 'chat-message-image-box-left';
    const rightEl = document.createElement('div');
    rightEl.className = 'chat-message-image-box-right';
    closeEl.appendChild(leftEl);
    closeEl.appendChild(rightEl);
    headerEl.appendChild(closeEl);
    mainEl.appendChild(headerEl);
    const bodyEl = document.createElement('div');
    bodyEl.className = 'chat-message-image-box-body';
    _a.imageEl = document.createElement('img');
    _a.imageEl.className = 'chat-message-image-box-img';
    bodyEl.appendChild(_a.imageEl);
    mainEl.appendChild(bodyEl);
    const footerEl = document.createElement('div');
    footerEl.className = 'chat-message-image-box-footer';
    const btnBox = document.createElement('div');
    btnBox.className = 'button-box';
    btnBox.innerText = '下载';
    btnBox.addEventListener('click', () => {
        FileUtil.downloadFile(_a.downloadFileUrl, _a.downloadFileName);
    });
    footerEl.appendChild(btnBox);
    mainEl.appendChild(footerEl);
    _a.chatMessageImageBoxEl.appendChild(mainEl);
})();
export default ChatMessageImageControl;
