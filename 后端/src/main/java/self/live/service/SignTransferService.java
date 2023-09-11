package self.live.service;

/**
 * @Author xxj
 * @Date 2023/8/9 15:55
 * @Version 1.0
 */
public interface SignTransferService {
    /**
     * 增加一个发送者
     *
     * @param fromId
     * @param toId
     * @param roomName
     * @param offer
     * @param candidate
     */
    void addOfferIdentity(String fromId, String toId, String roomName, String offer, String candidate);

    /**
     * 添加一个接收者
     *
     * @param fromId
     * @param toId
     * @param roomName
     * @param answer
     */
    void addAnswerIdentity(String fromId, String toId, String roomName, String answer);
}
