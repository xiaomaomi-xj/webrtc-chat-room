import { MessageBoxControl } from "./MessageBoxControl.js";
class TvBoxControl {
    static run() {
        this.tvBoxEl = document.querySelector('.tv-box');
        this.tvHeaderBoxEl = document.querySelector('.tv-header-box');
        this.tvHeaderSpanEl = document.querySelector('.tv-header-box > span');
        this.tvBodyBoxEl = document.querySelector('.tv-body-box');
        this.tvFooterBoxEl = document.querySelector('.tv-footer-box');
        this.listerClickEvent();
    }
    static bindEvent(openCallBackFun, closeCallBackFun) {
        this.openCallBackFun = openCallBackFun;
        this.closeCallBackFun = closeCallBackFun;
    }
    static listerClickEvent() {
        this.tvBoxEl.addEventListener('click', () => {
            if (!this.switch) {
                if (this.isOnce) {
                    this.isOnce = false;
                    MessageBoxControl.open("屏幕共享开启后，如果点击浏览器自带的停止共享，下一次将重新选择分享的屏幕，如果是点击此网站自带的图标的话，会使用上一次选择的屏幕进行分享。", () => {
                        this.open();
                    });
                    return;
                }
                this.open();
            }
            else {
                this.close();
            }
        });
    }
    static open() {
        this.switch = true;
        this.tvHeaderBoxEl.style.borderColor = 'green';
        this.tvHeaderSpanEl.style.color = 'green';
        this.tvBodyBoxEl.style.backgroundColor = 'green';
        this.tvFooterBoxEl.style.backgroundColor = 'green';
        this.openCallBackFun();
    }
    static close() {
        this.publicClose();
        this.closeCallBackFun();
    }
    static publicClose() {
        this.switch = false;
        this.tvHeaderBoxEl.style.borderColor = 'rgba(255, 255, 255, 0.747)';
        this.tvHeaderSpanEl.style.color = 'rgba(255, 255, 255, 0.747)';
        this.tvBodyBoxEl.style.backgroundColor = 'rgba(255, 255, 255, 0.747)';
        this.tvFooterBoxEl.style.backgroundColor = 'rgba(255, 255, 255, 0.747)';
    }
}
TvBoxControl.switch = false;
TvBoxControl.isOnce = true;
export default TvBoxControl;
