//用于确认提示的弹窗
export class ConfirmTipsBoxControl {
    private static confirmTipsBoxEl;
    static {
        this.confirmTipsBoxEl = document.createElement('div');
        this.confirmTipsBoxEl.className = 'confirm-tips-box';
    }
    //挂载
    static mount(el: HTMLElement) {
        el.appendChild(this.confirmTipsBoxEl);
    }
    //卸载
    static unMount(el: HTMLElement) {
        el.removeChild(this.confirmTipsBoxEl);
    }
    //创建节点
    private static createNode(message: string, callbackFun: Function): HTMLElement {
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
            } finally {
                //无论怎样要关闭
                this.close();
            }
        });
        footerEl.appendChild(cancellBthEl);
        footerEl.appendChild(determineBthEl);
        mainEl.appendChild(footerEl);
        return mainEl;
    }
    //开启
    static open(message: string, callbackFun: Function) {
        //先清空
        this.confirmTipsBoxEl.innerHTML = '';
        this.confirmTipsBoxEl.appendChild(this.createNode(message, callbackFun));
        this.confirmTipsBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.confirmTipsBoxEl.style.opacity = '1';
        });
    }
    //关闭
    private static close() {
        this.confirmTipsBoxEl.style.opacity = '0';
        setTimeout(() => {
            this.confirmTipsBoxEl.style.display = 'none';
            this.confirmTipsBoxEl.innerHTML = '';
        }, 600);
    }
}