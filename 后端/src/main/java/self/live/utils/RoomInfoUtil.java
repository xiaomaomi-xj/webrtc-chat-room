package self.live.utils;

import cn.hutool.core.util.IdUtil;
import self.live.constant.GlobalConstant;
import self.live.entity.RoomInfo;
import self.live.exception.LiveException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 房间管理工具类
 *
 * @Author xxj
 * @Date 2023/8/17 16:37
 * @Version 1.0
 */
public class RoomInfoUtil {
    /**
     * 存放房间
     */
    private static List<RoomInfo> roomInfoList = new ArrayList<>();

    /**
     * 创建房间
     *
     * @param roomName
     * @param maxNumber
     */
    public static String createRoom(String roomName, int maxNumber) {
        for (RoomInfo roomInfo : roomInfoList) {
            if (roomInfo.getRoomName().equals(roomName)) {
                throw new LiveException("房间已存在！");
            }
        }
        if (maxNumber < GlobalConstant.ROOM_MIN_NUMBER) {
            throw new LiveException("房间人数不得小于2！");
        }
        if (maxNumber > GlobalConstant.ROOM_MAX_NUMBER) {
            throw new LiveException("超过房间最大人数限制！");
        }
        String id = IdUtil.objectId();
        roomInfoList.add(new RoomInfo(
                roomName,
                maxNumber,
                id,
                new ArrayList<>()
        ));
        return id;
    }

    /**
     * 进入房间
     *
     * @param roomName
     */
    public static String enterRoom(String roomName) {
        boolean isRoomExit = false;
        String id = IdUtil.objectId();
        for (RoomInfo roomInfo : roomInfoList) {
            if (roomInfo.getRoomName().equals(roomName)) {
                isRoomExit = true;
                int size = roomInfo.getRoomMemberIds().size();
                if (size >= roomInfo.getMaxNumber() - 1) {
                    throw new LiveException("房间已满员，不可加入！");
                }
                roomInfo.getRoomMemberIds().add(id);
                //进入房间更新时间
                roomInfo.setEndChangeDate(new Date());
                break;
            }
        }
        if (!isRoomExit) {
            throw new LiveException("房间不存在！");
        }
        return id;
    }

    /**
     * 获取新来的人id
     *
     * @param roomName
     * @return
     */
    public static List<String> queryRoomMemberIds(String roomName, String id) {
        RoomInfo byRoomName = findByRoomName(roomName);
        List<String> roomMemberIds = byRoomName.getRoomMemberIds();
        if (id.equals(byRoomName.getRoomAdminId())) {
            return roomMemberIds;
        }
        int index = roomMemberIds.indexOf(id);
        if (index == -1) {
            throw new LiveException("id不存在此房间！");
        }
        ArrayList<String> ids = new ArrayList<>();
        for (int i = roomMemberIds.indexOf(id) + 1; i < roomMemberIds.size(); i++) {
            ids.add(roomMemberIds.get(i));
        }
        return ids;
    }

    /**
     * 根据房间名称查询房间
     *
     * @param roomName
     * @return
     */
    public static RoomInfo findByRoomName(String roomName) {
        for (RoomInfo roomInfo : roomInfoList) {
            if (roomInfo.getRoomName().equals(roomName)) {
                return roomInfo;
            }
        }
        throw new LiveException("房间不存在！");
    }

    /**
     * 根据id查询房间
     *
     * @param id
     * @return
     */
    public static RoomInfo findById(String id) {
        for (RoomInfo roomInfo : roomInfoList) {
            if (id.equals(roomInfo.getRoomAdminId()) || roomInfo.getRoomMemberIds().contains(id)) {
                return roomInfo;
            }
        }
        return null;
    }

    /**
     * 检测房间人数是否为0，为0释放房间,防止漏网，全检测
     */
    private static void checkRoomNum() {
        roomInfoList.removeIf(roomInfo -> null == roomInfo.getRoomAdminId() && roomInfo.getRoomMemberIds().size() == 0);
    }

    /**
     * 推出房间
     *
     * @param id
     */
    public static void outRoom(String id) {
        RoomInfo roomInfo = findById(id);
        if (null == roomInfo) {
            //如果未查到不处理
            return;
        }
        if (roomInfo.getRoomMemberIds().contains(id)) {
            roomInfo.getRoomMemberIds().remove(id);
        } else {
            roomInfo.setRoomAdminId(null);
        }
        //退出房间，更新时间
        roomInfo.setEndChangeDate(new Date());
        checkRoomNum();
    }

    /**
     * 清空
     */
    public static void clear() {
        roomInfoList.clear();
    }

    /**
     * 检查定时清理
     */
    public static void clearTask() {
        //先清理最基础的
        checkRoomNum();
        //根据房间时间进行清理
        Date date = new Date();
        ArrayList<RoomInfo> clearRoomInfoList = new ArrayList<>();
        for (RoomInfo roomInfo : roomInfoList) {
            if (date.getTime() - roomInfo.getEndChangeDate().getTime() > 28800000) {
                //超过8小时，直接删掉
                clearRoomInfoList.add(roomInfo);
                continue;
            }
            int size = roomInfo.getRoomMemberIds().size();
            if (roomInfo.getRoomAdminId() != null) {
                size++;
            }
            if (size < 3 && date.getTime() - roomInfo.getEndChangeDate().getTime() > 14400000) {
                //房间少于3个人，时间大于4小时，清除
                clearRoomInfoList.add(roomInfo);
                continue;
            }
            if (size < 2 && date.getTime() - roomInfo.getEndChangeDate().getTime() > 7200000) {
                //房间只有一个人时，2个小时清除
                clearRoomInfoList.add(roomInfo);
            }
        }
        roomInfoList.removeAll(clearRoomInfoList);
    }
}
