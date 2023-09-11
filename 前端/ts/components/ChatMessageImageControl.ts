import FileUtil from "../utils/FileUtil.js";

//因为自定义组件就在聊天上，没有办法再使用自定义组件，需要再写一个
export default class ChatMessageImageControl {
    private static chatMessageImageBoxEl;
    private static imageEl: HTMLImageElement;
    private static downloadFileUrl: string;
    private static downloadFileName: string;

    static {
        this.chatMessageImageBoxEl = document.createElement('div');
        this.chatMessageImageBoxEl.className = 'chat-message-image-box';
        const mainEl = document.createElement('div');
        mainEl.className = 'chat-message-image-box-main';
        const headerEl = document.createElement('div');
        headerEl.className = 'chat-message-image-box-header';
        const closeEl = document.createElement('div');
        closeEl.className = 'chat-message-image-box-close';
        closeEl.addEventListener('click', this.close.bind(this));
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
        this.imageEl = document.createElement('img');
        this.imageEl.className = 'chat-message-image-box-img';
        bodyEl.appendChild(this.imageEl);
        mainEl.appendChild(bodyEl);
        const footerEl = document.createElement('div');
        footerEl.className = 'chat-message-image-box-footer';
        const btnBox = document.createElement('div');
        btnBox.className = 'button-box';
        btnBox.innerText = '下载';
        btnBox.addEventListener('click', () => {
            FileUtil.downloadFile(this.downloadFileUrl, this.downloadFileName);
        });
        footerEl.appendChild(btnBox);
        mainEl.appendChild(footerEl);
        this.chatMessageImageBoxEl.appendChild(mainEl);
    }
    //挂载
    static mount(el: HTMLElement) {
        el.appendChild(this.chatMessageImageBoxEl);
    }
    //卸载
    static unMount(el: HTMLElement) {
        el.removeChild(this.chatMessageImageBoxEl);
    }

    //开启
    static open(imageBaseUrl: string, fileName: string) {
        this.downloadFileUrl = imageBaseUrl;
        this.downloadFileName = fileName;
        this.imageEl.src = imageBaseUrl;
        this.chatMessageImageBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.chatMessageImageBoxEl.style.opacity = '1';
        });
    }

    //关闭
    private static close() {
        try {
            this.downloadFileUrl = '';
            this.downloadFileName = '';
            this.imageEl.src = '';
        } finally {
            this.chatMessageImageBoxEl.style.opacity = '0';
            setTimeout(() => {
                this.chatMessageImageBoxEl.style.display = 'none';
            }, 600);
        }
    }
}