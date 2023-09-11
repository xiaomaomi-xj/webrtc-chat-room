import { BaseUrl } from "../api/ApiConstant.js";
import RequestTypeConsatnt from "../constant/RequestTypeConsatnt.js";
import HeaderInfo from "../constant/HeaderInfo.js";
import StringUtil from "../utils/StringUtil.js";
import { AnswerIdentityType, OfferIdentityType, RoomInfoType } from "../interface/Type.js";
import { MessageBoxControl } from "../components/MessageBoxControl.js";
//异步请求
export default class AjaxService {
    private xhr: XMLHttpRequest;
    constructor(url: string, isJson: boolean = true, method: RequestTypeConsatnt = RequestTypeConsatnt.POST) {
        this.xhr = new XMLHttpRequest();
        this.xhr.open(method, BaseUrl.url + url, true);
        if (isJson) {
            this.xhr.setRequestHeader(HeaderInfo.KEY, HeaderInfo.JSON_VALUE);
        }
    }

    //主要发送json数据
    public send(data: OfferIdentityType | AnswerIdentityType | RoomInfoType): Promise<Object | string | undefined | null | Array<any>> {
        this.xhr.send(JSON.stringify(data));
        return this.end();
    }

    //其他的也可以进行发送
    public sendOther(data: string | null | undefined | FormData): Promise<Object | string | undefined | null | Array<any>> {
        this.xhr.send(data);
        return this.end();
    }

    //请求结束，拿取结果
    private end(): Promise<Object | string | undefined | null | Array<any>> {
        return new Promise((res: Function) => {
            this.xhr.onload = () => {
                if (this.xhr.readyState === 4 && this.xhr.status === 200) {
                    //检测是否无返回值，有些接口只处理业务无返回值，单独处理，否则转为json的时候会出错
                    if (StringUtil.chkObjNull(this.xhr.response)) {
                        res();
                        return;
                    }
                    //检测是否报错
                    const response = JSON.parse(this.xhr.response);
                    if (!StringUtil.chkObjNull(response['status']) && response['status'] === 400) {
                        //报错直接刷新
                        MessageBoxControl.open(response['message'], () => window.location.reload());
                    } else {
                        res(response);
                    }
                } else {
                    //请求失败，直接刷新网页
                    MessageBoxControl.open("网络错误，请联系管理员！", () => window.location.reload())
                }
            }
        });
    }
}