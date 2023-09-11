//加载提示组件
class LoadingControl {
    private static loadingHtml = `
        <div class="loading-box">
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
            <div class="loading-box-item"></div>
        </div>
    `;
    private static loadingEl;
    static {
        //创造组件
        this.loadingEl = document.createElement('div') as HTMLDivElement;
        this.loadingEl.className = 'loading';
        this.loadingEl.innerHTML = this.loadingHtml;
    }
    //挂载（只能挂载一次，因为这是累加的）
    static mount(el: HTMLElement) {
        el.append(this.loadingEl);
    }
    //卸载
    static unMount(el: HTMLElement) {
        el.removeChild(this.loadingEl);
    }
    //启用
    static open() {
        this.loadingEl.style.display = "flex";
        setTimeout(() => {
            this.loadingEl.style.opacity = '1';
        });
    }
    //关闭
    static close() {
        this.loadingEl.style.opacity = '0';
        setTimeout(() => {
            this.loadingEl.style.display = "none";
        }, 1000);
    }
}
export default LoadingControl;