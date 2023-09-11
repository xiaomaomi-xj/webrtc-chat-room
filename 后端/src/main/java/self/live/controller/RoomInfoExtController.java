package self.live.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import self.live.service.RoomInfoExtService;
import self.live.utils.Assert;
import self.live.utils.OvercoatSseExceptionUtil;

/**
 * 流式控制器
 *
 * @Author xxj
 * @Date 2023/8/18 9:45
 * @Version 1.0
 */
@RestController
@RequestMapping("/room-info-ext")
public class RoomInfoExtController {
    private final RoomInfoExtService roomInfoExtService;

    public RoomInfoExtController(RoomInfoExtService roomInfoExtService) {
        this.roomInfoExtService = roomInfoExtService;
    }

    /**
     * 获取新的成员id
     *
     * @param roomName
     * @return
     */
    @GetMapping(value = "/get-new-member", produces = "text/event-stream;charset=UTF-8")
    public String getNewMember(@RequestParam("roomName") String roomName, @RequestParam("id") String id) {
        return OvercoatSseExceptionUtil.handleException(() -> {
            Assert.isNotBlank(roomName, "房间号");
            Assert.isNotBlank(id, "本人身份");
            return roomInfoExtService.getNewMemberIds(roomName, id);
        });
    }
}
