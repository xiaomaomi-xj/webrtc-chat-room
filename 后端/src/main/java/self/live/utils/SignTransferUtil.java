package self.live.utils;

import self.live.entity.AnswerIdentity;
import self.live.entity.OfferIdentity;

import java.util.ArrayList;
import java.util.List;

/**
 * 信令交换工具类
 *
 * @Author xxj
 * @Date 2023/8/18 13:38
 * @Version 1.0
 */
public class SignTransferUtil {
    /**
     * 装全部的发送者
     */
    private static List<OfferIdentity> offerIdentityList = new ArrayList<>();

    /**
     * 装全部的回答者
     */
    private static List<AnswerIdentity> answerIdentityList = new ArrayList<>();

    /**
     * 添加一个发送者
     *
     * @param offerIdentity
     */
    public static void addOfferIdentity(OfferIdentity offerIdentity) {
        String roomName = offerIdentity.getRoomName();
        RoomInfoUtil.findByRoomName(roomName);
        offerIdentityList.add(offerIdentity);
    }

    /**
     * 添加一个应答者
     *
     * @param answerIdentity
     */
    public static void addAnswerIdentity(AnswerIdentity answerIdentity) {
        String roomName = answerIdentity.getRoomName();
        RoomInfoUtil.findByRoomName(roomName);
        answerIdentityList.add(answerIdentity);
    }

    /**
     * 获取新的offer
     *
     * @param roomName
     * @param id
     * @return
     */
    public static List<OfferIdentity> getNewOffer(String roomName, String id) {
        List<OfferIdentity> offerIdentities = new ArrayList<>();
        for (OfferIdentity offerIdentity : offerIdentityList) {
            if (offerIdentity.getRoomName().equals(roomName) && offerIdentity.getToId().equals(id)) {
                offerIdentities.add(offerIdentity);
            }
        }
        //获取后删掉
        offerIdentityList.removeAll(offerIdentities);
        return offerIdentities;
    }

    /**
     * 获取新的answer
     *
     * @param roomName
     * @param id
     * @return
     */
    public static List<AnswerIdentity> getNewAnswer(String roomName, String id) {
        List<AnswerIdentity> answerIdentities = new ArrayList<>();
        for (AnswerIdentity answerIdentity : answerIdentityList) {
            if (answerIdentity.getRoomName().equals(roomName) && answerIdentity.getToId().equals(id)) {
                answerIdentities.add(answerIdentity);
            }
        }
        //获取后删掉
        answerIdentityList.removeAll(answerIdentities);
        return answerIdentities;
    }

    /**
     * 清空
     */
    public static void clear(){
        offerIdentityList.clear();
        answerIdentityList.clear();
    }
}
