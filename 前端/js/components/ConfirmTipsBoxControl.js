var _a;
export class ConfirmTipsBoxControl {
    static mount(el) {
        el.appendChild(this.confirmTipsBoxEl);
    }
    static unMount(el) {
        el.removeChild(this.confirmTipsBoxEl);
    }
    static createNode(message, callbackFun) {
        const mainEl = document.createElement('div');
        mainEl.className = 'confirm-tips-box-main';
        const headerEl = document.createElement('div');
        headerEl.className = 'confirm-tips-box-header';
        const tipsEl = document.createTextNode("特别提示");
        headerEl.appendChild(tipsEl);
        mainEl.appendChild(headerEl);
        const bodyEl = document.createElement('div');
        bodyEl.className = 'confirm-tips-box-body';
        bodyEl.innerHTML = message;
        mainEl.appendChild(bodyEl);
        const footerEl = document.createElement('div');
        footerEl.className = 'confirm-tips-box-footer';
        const cancellBthEl = document.createElement('div');
        cancellBthEl.className = 'confirm-tips-box-calcel';
        cancellBthEl.innerText = '取消';
        cancellBthEl.addEventListener('click', this.close.bind(this));
        const determineBthEl = document.createElement('div');
        determineBthEl.className = 'confirm-tips-box-determine';
        determineBthEl.innerText = '确定';
        determineBthEl.addEventListener('click', () => {
            try {
                callbackFun();
            }
            finally {
                this.close();
            }
        });
        footerEl.appendChild(cancellBthEl);
        footerEl.appendChild(determineBthEl);
        mainEl.appendChild(footerEl);
        return mainEl;
    }
    static open(message, callbackFun) {
        this.confirmTipsBoxEl.innerHTML = '';
        this.confirmTipsBoxEl.appendChild(this.createNode(message, callbackFun));
        this.confirmTipsBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.confirmTipsBoxEl.style.opacity = '1';
        });
    }
    static close() {
        this.confirmTipsBoxEl.style.opacity = '0';
        setTimeout(() => {
            this.confirmTipsBoxEl.style.display = 'none';
            this.confirmTipsBoxEl.innerHTML = '';
        }, 600);
    }
}
_a = ConfirmTipsBoxControl;
(() => {
    _a.confirmTipsBoxEl = document.createElement('div');
    _a.confirmTipsBoxEl.className = 'confirm-tips-box';
})();
