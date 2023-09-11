package self.live.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import self.live.entity.bo.ExceptionBo;
import self.live.exception.LiveException;

/**
 * 抛异常返回信息
 *
 * @Author xxj
 * @Date 2023/8/9 16:33
 * @Version 1.0
 */
@RestControllerAdvice
public class GlobalControllerAdvice {
    /**
     * 处理业务异常
     *
     * @param e
     * @return
     */
    @ExceptionHandler(LiveException.class)
    public ExceptionBo handleBizException(LiveException e) {
        return new ExceptionBo(
                HttpStatus.BAD_REQUEST.value(),
                e.getMessage()
        );
    }
}
