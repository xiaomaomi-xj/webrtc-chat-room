export default class StringUtil {
    static chkObjNull(obj) {
        if (typeof (obj) == "undefined") {
            return true;
        }
        else if (typeof (obj) == "string") {
            if (null == obj || "" == obj) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (null == obj) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    static objToParm(obj) {
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
