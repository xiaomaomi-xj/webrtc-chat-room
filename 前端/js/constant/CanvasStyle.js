var _a;
class CanvasStyle {
    static getStyleMap() {
        return this.styleMap;
    }
}
_a = CanvasStyle;
(() => {
    _a.styleMap = new Map();
    _a.styleMap.set("original", "原");
    _a.styleMap.set("grayscale", "黑白");
    _a.styleMap.set("sepia", "复古");
    _a.styleMap.set("invert", "反差");
    _a.styleMap.set("applyBeautyEffect", "简单美颜");
    _a.styleMap.set("characterize", "字符化");
})();
export default CanvasStyle;
