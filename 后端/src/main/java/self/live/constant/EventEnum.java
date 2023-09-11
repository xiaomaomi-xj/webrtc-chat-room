package self.live.constant;

/**
 * 事件类型
 *
 * @Author xxj
 * @Date 2023/8/10 13:52
 * @Version 1.0
 */
public enum EventEnum {
    /**
     * 新的成员
     */
    NEW_MEMBER("new_member", "房间进入新的成员"),
    /**
     * 新的offer
     */
    NEW_OFFER("new_offer", "存起来的offer返回"),
    /**
     * 新的answer
     */
    MEW_ANSWER("new_answer", "存起来的answer返回"),
    /**
     * 处理异常
     */
    HANDLE_EXCEPTION("handle_exception", "普通异常或则live异常转为sse所能理解的异常");

    private final String eventName;
    private final String desc;

    EventEnum(String eventName, String desc) {
        this.eventName = eventName;
        this.desc = desc;
    }

    public String getDesc() {
        return desc;
    }

    public String getEventName() {
        return eventName;
    }
}
