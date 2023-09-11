package self.live.service;

/**
 * 信令交互扩展服务
 *
 * @Author xxj
 * @Date 2023/8/18 14:34
 * @Version 1.0
 */
public interface SignTransferExtService {
    /**
     * 获取新的offer
     *
     * @param roomName
     * @param id       只要toId对应的id
     * @return
     */
    String getNewOffer(String roomName, String id);

    /**
     * 获取新的answer
     *
     * @param roomName
     * @param id       只要toId对应的id
     * @return
     */
    String getNewAnswer(String roomName, String id);
}
