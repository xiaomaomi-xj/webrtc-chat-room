package self.live.entity.bo;

/**
 * 返回新的用户
 *
 * @Author xxj
 * @Date 2023/8/10 13:49
 * @Version 1.0
 */
public class SseDataBo {
    /**
     * 应答者信息
     */
    private String data;

    /**
     * 事件名称
     */
    private String event;

    /**
     * 房间号
     */
    private String id;

    public SseDataBo(String data, String event, String id) {
        this.data = data;
        this.event = event;
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    /**
     * 重写toString，适用于sse传输
     *
     * @return
     */
    @Override
    public String toString() {
        return "event: " + event + "\n" +
                "data: " + data + "\n" +
                "id: " + id + "\n\n";
    }
}
