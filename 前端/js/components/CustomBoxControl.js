var _a;
class CustomBoxControl {
    static mount(el) {
        el.appendChild(this.customComponentBoxEl);
    }
    static unMount(el) {
        el.removeChild(this.customComponentBoxEl);
    }
    static createNode(componentEl, title) {
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
        this.customComponentBoxEl.innerHTML = '';
        componentEl.className = componentEl.className.replace('custom-use-box', '');
        this.customComponentBoxEl.appendChild(this.createNode(componentEl, title));
        this.customComponentBoxEl.style.display = 'flex';
        setTimeout(() => {
            this.customComponentBoxEl.style.opacity = '1';
        });
    }
    static close() {
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
_a = CustomBoxControl;
(() => {
    _a.customComponentBoxEl = document.createElement('div');
    _a.customComponentBoxEl.className = 'custom-box';
})();
export default CustomBoxControl;
