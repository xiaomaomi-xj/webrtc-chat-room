import LoadingControl from "../components/LoadingControl.js";
import StringUtil from "./StringUtil.js";

export default class FileUtil {
    //设置发送最大文件大小(10mb),因为没有服务器的存储，文件大小相当于在某个时间直接存在内存中，所以要限制文件的大小
    public static fileMaxSize = 10485760;
    //每次最大发送大小(5kb)（如果发送太大会导致直接发送失败，从而导致信息通道关闭），所以以此值为标准进行分片传输
    public static sendMaxSize = 5120;
    //最大消息长度(1000个字符)（1000长度汉字接近5kb）
    public static maxMessageLenght = 1000;
    //消息过长后缀
    public static overMaxMessageSuffix = '--：消息过长，无法全部显示，你可以尝试以文件的方式进行发送！';
    //对合并的文件进行保存
    private static mergeBaseUrlMap: Map<string, Array<string>> = new Map();

    //获取后缀名
    public static getFileSuffixName(fileName: string): string {
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

    //文件转base64编码信息,读文件是需要时间的，利用回调函数
    public static fileToBaseInfo(file: File, callBackFun: Function) {
        const reader = new FileReader();
        reader.onload = (event) => {
            let baseInfo = event.target?.result as string;
            let fileStyle = baseInfo.substring('data:'.length, baseInfo.indexOf(';base64,'));
            callBackFun(fileStyle, baseInfo);
        }
        reader.readAsDataURL(file);
    }

    //下载文件
    public static downloadFile(url: string, fileName: string) {
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => document.body.removeChild(a));
    }

    //对文件拆分也就是对base64字符串进行拆分,相当于分片传输
    public static splitBaseUrl(baseUrl: string, callBackFun: Function, endCallBackFun: Function) {
        let ratio = Math.ceil(baseUrl.length / this.sendMaxSize);
        for (let i = 0; i < ratio; i++) {
            //传三个参数，分片后的内容，当前第几片，总共几片
            callBackFun(baseUrl.substring(i * this.sendMaxSize, (i + 1) * this.sendMaxSize), i + 1, ratio);
        }
        //回调完再显示
        endCallBackFun();
        //关闭loading
        LoadingControl.close();
    }

    //对拆分的文件进行合并处理
    public static mergeBaseUrl(sfId: string, str: string, index: number, sum: number, callBackFun: Function) {
        const strArr = this.mergeBaseUrlMap.get(sfId);
        if (StringUtil.chkObjNull(strArr)) {
            //第一次需要创建对象
            const arr = new Array();
            arr[index - 1] = str;
            this.mergeBaseUrlMap.set(sfId, arr);
        } else {
            (strArr as Array<string>)[index - 1] = str;
        }
        //每进来一次就检查一次
        this.chkMergeBaseUrl(sfId, sum, callBackFun);
    }

    //检查是否可以合并
    private static chkMergeBaseUrl(sfId: string, sum: number, callBackFun: Function) {
        const strArr = this.mergeBaseUrlMap.get(sfId) as Array<string>;
        if (strArr.length === sum) {
            let isMerge = true;
            strArr.forEach(v => {
                if (v === undefined) {
                    isMerge = false;
                }
            });
            if (isMerge) {
                //合并删除节省空间
                callBackFun(strArr.join(""));
                this.mergeBaseUrlMap.delete(sfId);
            }
        }
    }
}