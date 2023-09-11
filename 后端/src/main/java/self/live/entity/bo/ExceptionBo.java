package self.live.entity.bo;

/**
 * @Author xxj
 * @Date 2023/8/9 16:34
 * @Version 1.0
 */
public class ExceptionBo {
    /**
     * 错误码
     */
    private int status;

    /**
     * 错误信息
     */
    private String message;

    public ExceptionBo(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "ExceptionBo{" +
                "statue=" + status +
                ", message='" + message + '\'' +
                '}';
    }
}
