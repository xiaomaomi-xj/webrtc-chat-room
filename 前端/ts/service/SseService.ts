import { BaseUrl } from "../api/ApiConstant.js";
import { MessageBoxControl } from "../components/MessageBoxControl.js";
import EventStant from "../constant/EventStant.js";
import { ExceptionBoType } from "../interface/Type.js";
import StringUtil from "../utils/StringUtil.js";
//接受服务端信息（Server-Sent Events）
export default class SseService {
    private eventSource: EventSource;
    constructor(url: string, parm: string) {
        this.eventSource = new EventSource(BaseUrl.url + url + parm);
    }

    //开始-在连接的时候触发open事件
    public start(callBackFun: Function): SseService {
        this.eventSource.onopen = _ => callBackFun();
        //自处理异常
        this.bindHandleExceptionEvent();
        return this;
    }

    //自定义监听事件
    public bindEvent(event: string, callBackFun: Function): SseService {
        this.eventSource.addEventListener(event, e => callBackFun(JSON.parse(e.data)));
        return this;
    }

    //如果不自定义，默认监听事件,与自定义事件互斥
    public bindDefaultEvent(callBackFun: Function): SseService {
        this.eventSource.addEventListener('message', e => callBackFun(JSON.parse(e.data)));
        return this;
    }

    //错误事件自处理
    private bindHandleExceptionEvent() {
        this.eventSource.addEventListener(EventStant.HANDLE_EXCEPTION, e => {
            const exceptionInfo = JSON.parse(e.data) as ExceptionBoType;
            if (!StringUtil.chkObjNull(exceptionInfo.statue) && exceptionInfo.statue === 400) {
                //处理错误
                MessageBoxControl.open("流发生错误，请稍后再试，错误内容：" + exceptionInfo.message, () => window.location.reload())
            }
        });
    }

    //关闭
    public close(): void {
        this.eventSource.close();
    }
}