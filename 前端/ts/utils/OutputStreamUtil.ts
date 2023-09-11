import { MessageBoxControl } from "../components/MessageBoxControl.js";
import StringUtil from "./StringUtil.js";

//输出的流,不做浏览器兼容处理
export default class OutputStreamUtil {
    //存一下stream
    private static userMediaStream: MediaStream;
    private static displayMediaStream: MediaStream | null;

    //获取摄像头流
    public static getUserMedia(callBackFun: Function) {
        if (!StringUtil.chkObjNull(this.userMediaStream)) {
            callBackFun(this.userMediaStream);
            return;
        }
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then(stream => {
            this.userMediaStream = stream;
            callBackFun(stream);
            stream.getTracks().forEach(track => {
                track.onended = () => {
                    MessageBoxControl.open("权限关闭，将退出！", () => window.location.reload());
                }
            })
        }).catch(() => {
            MessageBoxControl.open("未获得权限，无法进行视频聊天！", () => window.location.reload());
        });
    }

    //获取屏幕流
    public static getDisplayMedia(callBackFun: Function, errorCallBackFun: Function) {
        if (!StringUtil.chkObjNull(this.displayMediaStream)) {
            callBackFun(this.displayMediaStream);
            return;
        }
        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: true
        }).then(stream => {
            this.displayMediaStream = stream;
            //监听关闭
            stream.getVideoTracks()[0].onended = () => {
                errorCallBackFun();
                this.displayMediaStream = null;
            }
            callBackFun(stream);
        }).catch(() => {
            //这个报错没有事，不用刷新网页
            MessageBoxControl.open("未获得权限，无法进行屏幕共享！", () => {
                errorCallBackFun();
            });
        });
    }
}