package self.live.entity;

import java.util.Date;
import java.util.List;

/**
 * 存放房间信息
 *
 * @Author xxj
 * @Date 2023/8/17 16:35
 * @Version 1.0
 */
public class RoomInfo {
    /**
     * 房间名称
     */
    private String roomName;

    /**
     * 房间最大人数
     */
    private int maxNumber;

    /**
     * 房主id
     */
    private String roomAdminId;

    /**
     * 房间成员id
     */
    private List<String> roomMemberIds;

    /**
     * 房间最后改变的时间
     */
    private Date endChangeDate;

    public RoomInfo(String roomName, int maxNumber, String roomAdminId, List<String> roomMemberIds) {
        this.roomName = roomName;
        this.maxNumber = maxNumber;
        this.roomAdminId = roomAdminId;
        this.roomMemberIds = roomMemberIds;
        this.endChangeDate = new Date();
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public int getMaxNumber() {
        return maxNumber;
    }

    public void setMaxNumber(int maxNumber) {
        this.maxNumber = maxNumber;
    }

    public String getRoomAdminId() {
        return roomAdminId;
    }

    public void setRoomAdminId(String roomAdminId) {
        this.roomAdminId = roomAdminId;
    }

    public List<String> getRoomMemberIds() {
        return roomMemberIds;
    }

    public void setRoomMemberIds(List<String> roomMemberIds) {
        this.roomMemberIds = roomMemberIds;
    }

    public void setEndChangeDate(Date endChangeDate) {
        this.endChangeDate = endChangeDate;
    }

    public Date getEndChangeDate() {
        return endChangeDate;
    }

    @Override
    public String toString() {
        return "RoomInfo{" +
                "roomName='" + roomName + '\'' +
                ", maxNumber=" + maxNumber +
                ", roomAdminId='" + roomAdminId + '\'' +
                ", roomMemberIds=" + roomMemberIds +
                ", endChangeDate=" + endChangeDate +
                '}';
    }
}
