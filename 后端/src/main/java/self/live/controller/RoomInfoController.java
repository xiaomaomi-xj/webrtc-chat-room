package self.live.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import self.live.entity.bo.IdBo;
import self.live.entity.vo.RoomInfoVo;
import self.live.service.RoomInfoService;
import self.live.utils.Assert;

/**
 * 房间控制类
 *
 * @Author xxj
 * @Date 2023/8/17 17:22
 * @Version 1.0
 */
@RestController
@RequestMapping("/room-info")
public class RoomInfoController {
    private final RoomInfoService roomInfoService;

    public RoomInfoController(RoomInfoService roomInfoService) {
        this.roomInfoService = roomInfoService;
    }

    /**
     * 创建房间
     *
     * @return
     */
    @PostMapping("/create-room")
    public IdBo createRoom(@RequestBody RoomInfoVo roomInfoVo) {
        String roomName = roomInfoVo.getRoomName();
        int maxNumber = roomInfoVo.getMaxNumber();
        Assert.isNotBlank(roomName, "房间名称");
        Assert.isNotNull(maxNumber, "房间最大人数");
        return roomInfoService.createRoom(roomName, maxNumber);
    }

    /**
     * 进入房间
     *
     * @return
     */
    @PostMapping("/enter-room")
    public IdBo enterRoom(@RequestBody RoomInfoVo roomInfoVo) {
        String roomName = roomInfoVo.getRoomName();
        Assert.isNotBlank(roomName, "房间名称");
        return roomInfoService.enterRoom(roomName);
    }

    /**
     * 退出房间
     *
     * @param roomInfoVo
     */
    @PostMapping("/out-room")
    public void outRoom(@RequestBody RoomInfoVo roomInfoVo) {
        String id = roomInfoVo.getId();
        Assert.isNotBlank(id, "退出人");
        roomInfoService.outRoom(id);
    }
}
