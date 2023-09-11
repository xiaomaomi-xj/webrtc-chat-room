import { MessageBoxControl } from "../components/MessageBoxControl.js";
import StringUtil from "./StringUtil.js";
export default class OutputStreamUtil {
    static getUserMedia(callBackFun) {
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
                };
            });
        }).catch(() => {
            MessageBoxControl.open("未获得权限，无法进行视频聊天！", () => window.location.reload());
        });
    }
    static getDisplayMedia(callBackFun, errorCallBackFun) {
        if (!StringUtil.chkObjNull(this.displayMediaStream)) {
            callBackFun(this.displayMediaStream);
            return;
        }
        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: true
        }).then(stream => {
            this.displayMediaStream = stream;
            stream.getVideoTracks()[0].onended = () => {
                errorCallBackFun();
                this.displayMediaStream = null;
            };
            callBackFun(stream);
        }).catch(() => {
            MessageBoxControl.open("未获得权限，无法进行屏幕共享！", () => {
                errorCallBackFun();
            });
        });
    }
}
