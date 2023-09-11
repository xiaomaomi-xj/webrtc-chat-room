var _a;
class UserListTipsControl {
    static mount(el) {
        el.appendChild(this.userListTipsBoxEl);
    }
    static unMount(el) {
        el.removeChild(this.userListTipsBoxEl);
    }
    static createNode(componentEl, title) {
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
    static open(title, componentEl, callbackFun = () => { }) {
        this.callbackFun = callbackFun;
        this.userListTipsBoxEl.innerHTML = '';
        this.userListTipsBoxEl.appendChild(this.createNode(componentEl, title));
        this.userListTipsBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.userListTipsBoxEl.style.opacity = '1';
        });
    }
    static close() {
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
_a = UserListTipsControl;
(() => {
    _a.userListTipsBoxEl = document.createElement('div');
    _a.userListTipsBoxEl.className = 'user-list-tips-box';
})();
export default UserListTipsControl;
