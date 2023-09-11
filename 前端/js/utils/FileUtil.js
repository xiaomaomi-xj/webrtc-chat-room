import LoadingControl from "../components/LoadingControl.js";
import StringUtil from "./StringUtil.js";
class FileUtil {
    static getFileSuffixName(fileName) {
        let suffixName = '';
        if (StringUtil.chkObjNull(fileName)) {
            return suffixName;
        }
        if (fileName.indexOf(".") !== -1) {
            const strArr = fileName.split(".");
            return strArr[strArr.length - 1];
        }
        return suffixName;
    }
    static fileToBaseInfo(file, callBackFun) {
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            let baseInfo = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            let fileStyle = baseInfo.substring('data:'.length, baseInfo.indexOf(';base64,'));
            callBackFun(fileStyle, baseInfo);
        };
        reader.readAsDataURL(file);
    }
    static downloadFile(url, fileName) {
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => document.body.removeChild(a));
    }
    static splitBaseUrl(baseUrl, callBackFun, endCallBackFun) {
        let ratio = Math.ceil(baseUrl.length / this.sendMaxSize);
        for (let i = 0; i < ratio; i++) {
            callBackFun(baseUrl.substring(i * this.sendMaxSize, (i + 1) * this.sendMaxSize), i + 1, ratio);
        }
        endCallBackFun();
        LoadingControl.close();
    }
    static mergeBaseUrl(sfId, str, index, sum, callBackFun) {
        const strArr = this.mergeBaseUrlMap.get(sfId);
        if (StringUtil.chkObjNull(strArr)) {
            const arr = new Array();
            arr[index - 1] = str;
            this.mergeBaseUrlMap.set(sfId, arr);
        }
        else {
            strArr[index - 1] = str;
        }
        this.chkMergeBaseUrl(sfId, sum, callBackFun);
    }
    static chkMergeBaseUrl(sfId, sum, callBackFun) {
        const strArr = this.mergeBaseUrlMap.get(sfId);
        if (strArr.length === sum) {
            let isMerge = true;
            strArr.forEach(v => {
                if (v === undefined) {
                    isMerge = false;
                }
            });
            if (isMerge) {
                callBackFun(strArr.join(""));
                this.mergeBaseUrlMap.delete(sfId);
            }
        }
    }
}
FileUtil.fileMaxSize = 10485760;
FileUtil.sendMaxSize = 5120;
FileUtil.maxMessageLenght = 1000;
FileUtil.overMaxMessageSuffix = '--：消息过长，无法全部显示，你可以尝试以文件的方式进行发送！';
FileUtil.mergeBaseUrlMap = new Map();
export default FileUtil;
