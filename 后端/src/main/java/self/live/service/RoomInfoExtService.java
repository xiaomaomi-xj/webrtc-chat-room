package self.live.service;

/**
 * 房间扩展服务类
 *
 * @Author xxj
 * @Date 2023/8/18 9:47
 * @Version 1.0
 */
public interface RoomInfoExtService {
    /**
     * 获取新的成员id
     *
     * @param roomName
     * @param id
     * @return
     */
    String getNewMemberIds(String roomName,String id);
}
