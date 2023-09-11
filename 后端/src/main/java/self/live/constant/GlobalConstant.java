package self.live.constant;

import org.springframework.http.HttpMethod;

/**
 * 全局常量
 *
 * @Author xxj
 * @Date 2023/8/10 11:16
 * @Version 1.0
 */
public class GlobalConstant {
    /**
     * 房间人数包含了发送者和应答者，最少两人
     */
    public static final int ROOM_MIN_NUMBER = 2;

    /**
     * 房间人数最多不得多余6人，（这个后端做一个限制）
     */
    public static final int ROOM_MAX_NUMBER = 6;

    /**
     * 允许跨域的地址
     */
    public static final String[] ALLOWED_ORIGINS = {
            "http://127.0.0.1:5500",
            "http://localhost:5500"
    };

    /**
     * 允许跨域的方法
     */
    public static final String[] ALLOWED_METHODS = {
            HttpMethod.GET.name(),
            HttpMethod.POST.name()
    };
}
