package self.live.utils;

import cn.hutool.json.JSONUtil;
import org.springframework.http.HttpStatus;
import self.live.constant.EventEnum;
import self.live.entity.bo.ExceptionBo;
import self.live.entity.bo.SseDataBo;

import java.util.function.Supplier;

/**
 * sse异常外套工具类
 *
 * @Author xxj
 * @Date 2023/8/18 15:24
 * @Version 1.0
 */
public class OvercoatSseExceptionUtil {
    /**
     * 处理异常改为sse异常
     *
     * @param supplier
     * @return
     */
    public static String handleException(Supplier<String> supplier) {
        try {
            return supplier.get();
        } catch (Exception e) {
            //处理异常
            ExceptionBo exceptionBo = new ExceptionBo(
                    HttpStatus.BAD_REQUEST.value(),
                    e.getMessage()
            );
            String data = JSONUtil.toJsonStr(exceptionBo);
            return new SseDataBo(data, EventEnum.HANDLE_EXCEPTION.getEventName(), "exception").toString();
        }
    }
}
