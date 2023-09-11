package self.live.service;

import self.live.entity.bo.IdBo;

/**
 * 房间信息管理
 *
 * @Author xxj
 * @Date 2023/8/17 17:30
 * @Version 1.0
 */
public interface RoomInfoService {
    /**
     * 创建房间
     *
     * @param roomName
     * @param maxNumber
     * @return
     */
    IdBo createRoom(String roomName,int maxNumber);

    /**
     * 进入房间
     *
     * @param roomName
     * @return
     */
    IdBo enterRoom(String roomName);

    /**
     * 推出房间
     *  @param id
     *
     */
    void outRoom(String id);
}
