//message-box组件，用于提示消息
export class MessageBoxControl {
    private static messageBoxEl;
    static {
        this.messageBoxEl = document.createElement('div');
        this.messageBoxEl.className = 'message-box';
    }
    //挂载
    static mount(el: HTMLElement) {
        el.appendChild(this.messageBoxEl);
    }
    //卸载
    static unMount(el: HTMLElement) {
        el.removeChild(this.messageBoxEl);
    }
    //创建节点
    private static createNode(message: string, callbackFun: Function): HTMLElement {
        const mainEl = document.createElement('div');
        mainEl.className = 'message-box-main';
        const headerEl = document.createElement('div');
        headerEl.className = 'message-box-header';
        const tipsEl = document.createTextNode("提示");
        headerEl.appendChild(tipsEl);
        mainEl.appendChild(headerEl);
        const bodyEl = document.createElement('div');
        bodyEl.className = 'message-box-body';
        bodyEl.innerText = message;
        mainEl.appendChild(bodyEl);
        const footerEl = document.createElement('div');
        footerEl.className = 'message-box-footer';
        const buttonEl = document.createElement('div');
        buttonEl.className = 'message-box-button';
        buttonEl.innerText = '确定';
        buttonEl.addEventListener('click', () => {
            try {
                callbackFun();
            } finally {
                //无论怎样要关闭
                this.close();
            }
        });
        footerEl.appendChild(buttonEl);
        mainEl.appendChild(footerEl);
        return mainEl;
    }
    //开启
    static open(message: string, callbackFun: Function = () => { }) {
        //先清空
        this.messageBoxEl.innerHTML = '';
        this.messageBoxEl.appendChild(this.createNode(message, callbackFun));
        this.messageBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.messageBoxEl.style.opacity = '1';
        });
    }
    //关闭
    private static close() {
        this.messageBoxEl.style.opacity = '0';
        setTimeout(() => {
            this.messageBoxEl.style.display = 'none';
            this.messageBoxEl.innerHTML = '';
        }, 600);
    }
}