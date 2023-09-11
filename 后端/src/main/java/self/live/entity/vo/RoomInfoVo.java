package self.live.entity.vo;

/**
 * 接受房间参数
 *
 * @Author xxj
 * @Date 2023/8/17 17:32
 * @Version 1.0
 */
public class RoomInfoVo {
    /**
     * 房间里面的人
     */
    private String id;

    /**
     * 房间名称
     */
    private String roomName;

    /**
     * 房间最大人数
     */
    private int maxNumber;

    public RoomInfoVo(String id, String roomName, int maxNumber) {
        this.id = id;
        this.roomName = roomName;
        this.maxNumber = maxNumber;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "RoomInfoVo{" +
                "id='" + id + '\'' +
                ", roomName='" + roomName + '\'' +
                ", maxNumber=" + maxNumber +
                '}';
    }
}
