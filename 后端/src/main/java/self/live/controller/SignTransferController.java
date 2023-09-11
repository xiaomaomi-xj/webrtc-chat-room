package self.live.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import self.live.entity.AnswerIdentity;
import self.live.entity.OfferIdentity;
import self.live.service.SignTransferService;
import self.live.utils.Assert;

/**
 * 信令传递
 *
 * @Author xxj
 * @Date 2023/8/9 15:53
 * @Version 1.0
 */
@RestController
@RequestMapping("/sign-transfer")
public class SignTransferController {
    private final SignTransferService signTransferService;

    public SignTransferController(SignTransferService signTransferService) {
        this.signTransferService = signTransferService;
    }

    /**
     * 添加一个发送者
     *
     * @param offerIdentity
     */
    @PostMapping("/add-offer-identity")
    public void addOfferIdentity(@RequestBody OfferIdentity offerIdentity) {
        String fromId = offerIdentity.getFromId();
        String toId = offerIdentity.getToId();
        String roomName = offerIdentity.getRoomName();
        String offer = offerIdentity.getOffer();
        String candidate = offerIdentity.getCandidate();
        Assert.isNotBlank(fromId, "发送者");
        Assert.isNotBlank(toId, "接收者");
        Assert.isNotBlank(roomName, "房间名称");
        Assert.isNotBlank(offer, "offer信息");
        Assert.isNotBlank(candidate, "ice候选信息");
        signTransferService.addOfferIdentity(fromId, toId, roomName, offer, candidate);
    }

    /**
     * 添加一个接收者
     *
     * @param answerIdentity
     */
    @PostMapping("/add-answer-identity")
    public void addAnswerIdentity(@RequestBody AnswerIdentity answerIdentity) {
        String fromId = answerIdentity.getFromId();
        String toId = answerIdentity.getToId();
        String roomName = answerIdentity.getRoomName();
        String answer = answerIdentity.getAnswer();
        Assert.isNotBlank(fromId, "发送者");
        Assert.isNotBlank(toId, "接收者");
        Assert.isNotBlank(roomName, "房间名称");
        Assert.isNotBlank(answer, "answer信息");
        signTransferService.addAnswerIdentity(fromId, toId, roomName, answer);
    }
}