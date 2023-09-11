package self.live.service.impl;

import cn.hutool.json.JSONUtil;
import org.springframework.stereotype.Service;
import self.live.constant.EventEnum;
import self.live.entity.bo.IdsBo;
import self.live.entity.bo.SseDataBo;
import self.live.service.RoomInfoExtService;
import self.live.utils.RoomInfoUtil;

import java.util.List;

/**
 * 房间扩展服务
 *
 * @Author xxj
 * @Date 2023/8/18 9:51
 * @Version 1.0
 */
@Service
public class RoomInfoExtServiceImpl implements RoomInfoExtService {

    @Override
    public String getNewMemberIds(String roomName, String id) {
        List<String> stringList = RoomInfoUtil.queryRoomMemberIds(roomName, id);
        String data = JSONUtil.toJsonStr(new IdsBo(stringList));
        return new SseDataBo(
                data, EventEnum.NEW_MEMBER.getEventName(), roomName
        ).toString();
    }
}
