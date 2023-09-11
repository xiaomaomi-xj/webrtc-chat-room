//canvas人脸的样式
export default class CanvasStyle {
    private static styleMap: Map<string, string>;
    static {
        this.styleMap = new Map();
        this.styleMap.set("original", "原");
        this.styleMap.set("grayscale", "黑白");
        this.styleMap.set("sepia", "复古");
        this.styleMap.set("invert", "反差");
        this.styleMap.set("applyBeautyEffect", "简单美颜");
        this.styleMap.set("characterize", "字符化");
    }

    //返回常量map
    public static getStyleMap():Map<string,string>{
        return this.styleMap;
    }
}