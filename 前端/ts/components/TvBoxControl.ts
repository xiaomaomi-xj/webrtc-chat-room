import { MessageBoxControl } from "./MessageBoxControl.js";

//屏幕共享按钮控制,只有一个，不做多处理
export default class TvBoxControl {
    private static tvBoxEl: HTMLDivElement;
    private static tvHeaderBoxEl: HTMLDivElement;
    private static tvHeaderSpanEl: HTMLSpanElement;
    private static tvBodyBoxEl: HTMLDivElement;
    private static tvFooterBoxEl: HTMLDivElement;
    private static switch = false;
    //检验是否第一次打开
    private static isOnce: boolean = true;
    //打开和关闭回调
    private static openCallBackFun: Function;
    private static closeCallBackFun: Function;

    //运行
    public static run() {
        this.tvBoxEl = document.querySelector('.tv-box') as HTMLDivElement;
        this.tvHeaderBoxEl = document.querySelector('.tv-header-box') as HTMLDivElement;
        this.tvHeaderSpanEl = document.querySelector('.tv-header-box > span') as HTMLSpanElement;
        this.tvBodyBoxEl = document.querySelector('.tv-body-box') as HTMLDivElement;
        this.tvFooterBoxEl = document.querySelector('.tv-footer-box') as HTMLDivElement;
        this.listerClickEvent();
    }

    //绑定事件
    public static bindEvent(openCallBackFun: Function, closeCallBackFun: Function) {
        this.openCallBackFun = openCallBackFun;
        this.closeCallBackFun = closeCallBackFun;
    }

    //点击事件
    private static listerClickEvent() {
        this.tvBoxEl.addEventListener('click', () => {
            if (!this.switch) {
                if(this.isOnce){
                    this.isOnce=false;
                    MessageBoxControl.open("屏幕共享开启后，如果点击浏览器自带的停止共享，下一次将重新选择分享的屏幕，如果是点击此网站自带的图标的话，会使用上一次选择的屏幕进行分享。",()=>{
                        this.open();
                    });
                    return;
                }
                this.open();
            } else {
                this.close();
            }
        });
    }

    //打开
    private static open() {
        this.switch = true;
        this.tvHeaderBoxEl.style.borderColor = 'green';
        this.tvHeaderSpanEl.style.color = 'green';
        this.tvBodyBoxEl.style.backgroundColor = 'green';
        this.tvFooterBoxEl.style.backgroundColor = 'green';
        this.openCallBackFun();
    }

    //关闭
    private static close() {
        this.publicClose();
        this.closeCallBackFun();
    }

    //公共关闭,因为一些原因屏幕关闭的时候，调用此方法
    public static publicClose() {
        this.switch = false;
        this.tvHeaderBoxEl.style.borderColor = 'rgba(255, 255, 255, 0.747)';
        this.tvHeaderSpanEl.style.color = 'rgba(255, 255, 255, 0.747)';
        this.tvBodyBoxEl.style.backgroundColor = 'rgba(255, 255, 255, 0.747)';
        this.tvFooterBoxEl.style.backgroundColor = 'rgba(255, 255, 255, 0.747)';
    }
}