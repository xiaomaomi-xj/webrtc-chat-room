class IDGenerateUtil {
    static generateId(endId) {
        let confoundStr = this.confound(endId.toUpperCase());
        let str = window.btoa(confoundStr);
        return this.addDot(str.toUpperCase());
    }
    static confound(id) {
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
    static addDot(str) {
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
IDGenerateUtil.strTemplate = 'abcdef0123456789'.toUpperCase();
IDGenerateUtil.numberArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export default IDGenerateUtil;
