//处理验证一些字符串的工具类
export default class StringUtil {
    //检测字符串是否为空
    public static chkObjNull(obj: any): boolean {
        if (typeof (obj) == "undefined") {
            return true;
        } else if (typeof (obj) == "string") {
            if (null == obj || "" == obj) {
                return true;
            } else {
                return false;
            }
        } else {
            if (null == obj) {
                return true;
            } else {
                return false;
            }
        }
    }

    //根据对象生成提交需要的参数
    public static objToParm(obj: { [key: string]: any }): string {
        let parm = '?';
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                parm += key + '=' + value + '&';
            }
        }
        return parm.substring(0, parm.length - 1);
    }
}