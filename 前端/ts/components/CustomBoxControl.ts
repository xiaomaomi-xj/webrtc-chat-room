//可接受自定义的浮层
class CustomBoxControl {
    private static customComponentBoxEl;
    private static callbackFun: Function;
    static {
        this.customComponentBoxEl = document.createElement('div');
        this.customComponentBoxEl.className = 'custom-box';
    }
    //挂载
    static mount(el: HTMLElement) {
        el.appendChild(this.customComponentBoxEl);
    }
    //卸载
    static unMount(el: HTMLElement) {
        el.removeChild(this.customComponentBoxEl);
    }
    //创建节点
    private static createNode(componentEl: HTMLElement, title: string): HTMLElement {
        const mainEl = document.createElement('div');
        mainEl.className = 'custom-box-main';
        const headEl = document.createElement('div');
        headEl.className = 'custom-box-main-header';
        const titleEl = document.createTextNode(title);
        const closeEl = document.createElement('div');
        closeEl.className = 'custom-box-main-close';
        closeEl.addEventListener('click', this.close.bind(this));
        const leftEl = document.createElement('div');
        leftEl.className = 'custom-box-main-left-close';
        const rightEl = document.createElement('div');
        rightEl.className = 'custom-box-main-right-close';
        const bodyEl = document.createElement('div');
        bodyEl.className = 'custom-box-main-body';
        const otherBoxEl = document.createElement('div');
        otherBoxEl.className = 'custom-box-main-body-other-box';
        //body里面填传过来的组件
        otherBoxEl.appendChild(componentEl);
        bodyEl.appendChild(otherBoxEl);
        closeEl.appendChild(leftEl);
        closeEl.appendChild(rightEl);
        headEl.appendChild(titleEl);
        headEl.appendChild(closeEl);
        mainEl.appendChild(headEl);
        mainEl.appendChild(bodyEl);
        return mainEl;
    }
    //开启
    static open(title: string, componentEl: HTMLElement, callbackFun: Function = () => { }) {
        //可以接受一个关闭回调函数
        this.callbackFun = callbackFun;
        //先清空
        this.customComponentBoxEl.innerHTML = '';
        //先让其显示,去掉类名custom
        componentEl.className = componentEl.className.replace('custom-use-box', '')
        this.customComponentBoxEl.appendChild(this.createNode(componentEl, title));
        this.customComponentBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.customComponentBoxEl.style.opacity = '1';
        });
    }
    //关闭
    public static close() {
        //关闭的时候，可以执行一个函数,但是不能影响下面的业务
        setTimeout(() => {
            this.callbackFun();
        });
        this.customComponentBoxEl.style.opacity = '0';
        setTimeout(() => {
            this.customComponentBoxEl.style.display = 'none';
            this.customComponentBoxEl.innerHTML = '';
        }, 600);
    }
}
export default CustomBoxControl;