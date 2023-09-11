//生成身份id,不要使用后台的id，因为后台的id是不应该可见的,所以需要处理一下,因为在中间去掉了已知内容未知顺序的东西，所以无法还原，简单的防止js逆向解密
export default class IDGenerateUtil {
    //字符模板
    private static strTemplate = 'abcdef0123456789'.toUpperCase();
    private static numberArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    //ID
    public static generateId(endId: string): string {
        let confoundStr = this.confound(endId.toUpperCase());
        let str = window.btoa(confoundStr);
        return this.addDot(str.toUpperCase());
    }

    //混淆
    private static confound(id: string): string {
        id = id.replace(/\//g, 'E');
        let resultStr = '';
        for (let i = 0; i < id.length; i++) {
            let s = id.charAt(i);
            if (this.numberArr.indexOf(s) !== -1) {
                resultStr += this.strTemplate.charAt(parseInt(s));
                continue;
            }
            if (s === '=') {
                resultStr += this.strTemplate.charAt(11);
                continue;
            }
            if (s === '+') {
                resultStr += this.strTemplate.charAt(10);
                continue;
            }
            resultStr += id.charAt(i);
        }
        return resultStr;
    }

    //加一些特殊符号
    private static addDot(str: string) {
        const strArr = ['0', 'E', 'F'];
        const tempArr = ['+', '=', '/'];
        for (let i = 0; i < strArr.length; i++) {
            let index = str.indexOf(strArr[i]);
            if (index !== -1) {
                str = str.substring(0, index) + tempArr[i] + str.substring(index);
            }
        }
        return str;
    }
}