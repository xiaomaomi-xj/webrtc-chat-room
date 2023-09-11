var _a;
export class MessageBoxControl {
    static mount(el) {
        el.appendChild(this.messageBoxEl);
    }
    static unMount(el) {
        el.removeChild(this.messageBoxEl);
    }
    static createNode(message, callbackFun) {
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
            }
            finally {
                this.close();
            }
        });
        footerEl.appendChild(buttonEl);
        mainEl.appendChild(footerEl);
        return mainEl;
    }
    static open(message, callbackFun = () => { }) {
        this.messageBoxEl.innerHTML = '';
        this.messageBoxEl.appendChild(this.createNode(message, callbackFun));
        this.messageBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.messageBoxEl.style.opacity = '1';
        });
    }
    static close() {
        this.messageBoxEl.style.opacity = '0';
        setTimeout(() => {
            this.messageBoxEl.style.display = 'none';
            this.messageBoxEl.innerHTML = '';
        }, 600);
    }
}
_a = MessageBoxControl;
(() => {
    _a.messageBoxEl = document.createElement('div');
    _a.messageBoxEl.className = 'message-box';
})();
