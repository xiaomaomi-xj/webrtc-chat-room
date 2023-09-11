var _a;
class LoadingControl {
    static mount(el) {
        el.append(this.loadingEl);
    }
    static unMount(el) {
        el.removeChild(this.loadingEl);
    }
    static open() {
        this.loadingEl.style.display = "flex";
        setTimeout(() => {
            this.loadingEl.style.opacity = '1';
        });
    }
    static close() {
        this.loadingEl.style.opacity = '0';
        setTimeout(() => {
            this.loadingEl.style.display = "none";
        }, 1000);
    }
}
_a = LoadingControl;
LoadingControl.loadingHtml = `
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
(() => {
    _a.loadingEl = document.createElement('div');
    _a.loadingEl.className = 'loading';
    _a.loadingEl.innerHTML = _a.loadingHtml;
})();
export default LoadingControl;
