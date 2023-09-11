package self.live.utils;

import org.springframework.lang.Nullable;
import org.springframework.util.StringUtils;
import self.live.exception.LiveException;

import java.util.Map;
import java.util.Objects;

/**
 * 检验
 *
 * @Author xxj
 * @Date 2023/8/9 16:49
 * @Version 1.0
 */
public class Assert {
    public Assert() {
    }

    /**
     * 字符串不为空
     *
     * @param str
     * @param strName
     */
    public static void isNotBlank(@Nullable String str, String strName) {
        if (StringUtils.isEmpty(str)) {
            throw new LiveException("【" + strName + "】信息项不允许为空，请检查！");
        }
    }

    /**
     * 对象不为null
     *
     * @param obj
     * @param name
     */
    public static void isNotNull(@Nullable Object obj, String name) {
        if (Objects.isNull(obj)) {
            throw new LiveException("【" + name + "】信息项不允许为空，请检查！");
        }
    }

    /**
     * 检查map是否为空
     *
     * @param map
     * @param name
     */
    public static void isNotEmpty(@Nullable Map map, String name) {
        if(map == null || map.isEmpty()){
            throw new LiveException("【" + name + "】信息项不允许为空，请检查！");
        }
    }
}
