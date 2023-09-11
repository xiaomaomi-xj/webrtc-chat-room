package self.live.exception;

/**
 * 自定义异常,用于捕捉
 *
 * @Author xxj
 * @Date 2023/8/9 16:29
 * @Version 1.0
 */
public class LiveException extends RuntimeException {

    public LiveException() {
        super();
    }

    public LiveException(String errorMessage) {
        super(errorMessage);
    }
}
