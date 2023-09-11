//给用户列表使用，产生层次感
export default class UserListTipsControl {
    private static userListTipsBoxEl;
    private static callbackFun: Function;
    static {
        this.userListTipsBoxEl = document.createElement('div');
        this.userListTipsBoxEl.className = 'user-list-tips-box';
    }
    //挂载
    static mount(el: HTMLElement) {
        el.appendChild(this.userListTipsBoxEl);
    }
    //卸载
    static unMount(el: HTMLElement) {
        el.removeChild(this.userListTipsBoxEl);
    }
    //创建节点
    private static createNode(componentEl: HTMLElement, title: string): HTMLElement {
        const mainEl = document.createElement('div');
        mainEl.className = 'user-list-tips-box-main';
        const headEl = document.createElement('div');
        headEl.className = 'user-list-tips-box-main-header';
        const titleEl = document.createTextNode(title);
        const closeEl = document.createElement('div');
        closeEl.className = 'user-list-tips-box-main-close';
        closeEl.addEventListener('click', this.close.bind(this));
        const leftEl = document.createElement('div');
        leftEl.className = 'user-list-tips-box-main-left-close';
        const rightEl = document.createElement('div');
        rightEl.className = 'user-list-tips-box-main-right-close';
        const bodyEl = document.createElement('div');
        bodyEl.className = 'user-list-tips-box-main-body';
        const otherBoxEl = document.createElement('div');
        otherBoxEl.className = 'user-list-tips-box-main-body-other-box';
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
        this.userListTipsBoxEl.innerHTML = '';
        this.userListTipsBoxEl.appendChild(this.createNode(componentEl, title));
        this.userListTipsBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.userListTipsBoxEl.style.opacity = '1';
        });
    }
    //关闭
    public static close() {
        //关闭的时候，可以执行一个函数,但是不能影响下面的业务
        setTimeout(() => {
            this.callbackFun();
        });
        this.userListTipsBoxEl.style.opacity = '0';
        setTimeout(() => {
            this.userListTipsBoxEl.style.display = 'none';
            this.userListTipsBoxEl.innerHTML = '';
        }, 600);
    }
}
