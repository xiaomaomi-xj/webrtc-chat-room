package self.live.entity;

/**
 * 发送者
 *
 * @Author xxj
 * @Date 2023/8/9 16:06
 * @Version 1.0
 */
public class OfferIdentity {
    /**
     * 发出者
     */
    private String fromId;

    /**
     * 接收者
     */
    private String toId;

    /**
     * 房间号--用作区分
     */
    private String roomName;

    /**
     * 我们并关心内容是什么，用string表示,发送者发来的offer
     */
    private String offer;

    /**
     * 我们并关心内容是什么,用string表示，发送者发来的candidate
     */
    private String candidate;

    public OfferIdentity(String fromId, String toId, String roomName, String offer, String candidate) {
        this.fromId = fromId;
        this.toId = toId;
        this.roomName = roomName;
        this.offer = offer;
        this.candidate = candidate;
    }

    public String getFromId() {
        return fromId;
    }

    public void setFromId(String fromId) {
        this.fromId = fromId;
    }

    public String getToId() {
        return toId;
    }

    public void setToId(String toId) {
        this.toId = toId;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getOffer() {
        return offer;
    }

    public void setOffer(String offer) {
        this.offer = offer;
    }

    public String getCandidate() {
        return candidate;
    }

    public void setCandidate(String candidate) {
        this.candidate = candidate;
    }

    @Override
    public String toString() {
        return "OfferIdentity{" +
                "fromId='" + fromId + '\'' +
                ", toId='" + toId + '\'' +
                ", roomName='" + roomName + '\'' +
                ", offer='" + offer + '\'' +
                ", candidate='" + candidate + '\'' +
                '}';
    }
}
