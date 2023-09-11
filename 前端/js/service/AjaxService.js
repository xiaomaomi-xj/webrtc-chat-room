import { BaseUrl } from "../api/ApiConstant.js";
import RequestTypeConsatnt from "../constant/RequestTypeConsatnt.js";
import HeaderInfo from "../constant/HeaderInfo.js";
import StringUtil from "../utils/StringUtil.js";
import { MessageBoxControl } from "../components/MessageBoxControl.js";
export default class AjaxService {
    constructor(url, isJson = true, method = RequestTypeConsatnt.POST) {
        this.xhr = new XMLHttpRequest();
        this.xhr.open(method, BaseUrl.url + url, true);
        if (isJson) {
            this.xhr.setRequestHeader(HeaderInfo.KEY, HeaderInfo.JSON_VALUE);
        }
    }
    send(data) {
        this.xhr.send(JSON.stringify(data));
        return this.end();
    }
    sendOther(data) {
        this.xhr.send(data);
        return this.end();
    }
    end() {
        return new Promise((res) => {
            this.xhr.onload = () => {
                if (this.xhr.readyState === 4 && this.xhr.status === 200) {
                    if (StringUtil.chkObjNull(this.xhr.response)) {
                        res();
                        return;
                    }
                    const response = JSON.parse(this.xhr.response);
                    if (!StringUtil.chkObjNull(response['status']) && response['status'] === 400) {
                        MessageBoxControl.open(response['message'], () => window.location.reload());
                    }
                    else {
                        res(response);
                    }
                }
                else {
                    MessageBoxControl.open("网络错误，请联系管理员！", () => window.location.reload());
                }
            };
        });
    }
}
