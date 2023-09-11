package self.live.entity;

/**
 * 应答者
 *
 * @Author xxj
 * @Date 2023/8/9 16:06
 * @Version 1.0
 */
public class AnswerIdentity {
    /**
     * 发送者
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
     * 我们并不关心它回答了什么，用string表示，回应的answer
     */
    private String answer;

    public AnswerIdentity(String fromId, String toId, String roomName, String answer) {
        this.fromId = fromId;
        this.toId = toId;
        this.roomName = roomName;
        this.answer = answer;
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

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "AnswerIdentity{" +
                "fromId='" + fromId + '\'' +
                ", toId='" + toId + '\'' +
                ", roomName='" + roomName + '\'' +
                ", answer='" + answer + '\'' +
                '}';
    }
}
