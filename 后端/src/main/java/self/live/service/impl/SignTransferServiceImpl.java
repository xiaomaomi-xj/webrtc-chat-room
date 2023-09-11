package self.live.service.impl;

import org.springframework.stereotype.Service;
import self.live.entity.AnswerIdentity;
import self.live.entity.OfferIdentity;
import self.live.service.SignTransferService;
import self.live.utils.SignTransferUtil;

/**
 * @Author xxj
 * @Date 2023/8/9 15:56
 * @Version 1.0
 */
@Service
public class SignTransferServiceImpl implements SignTransferService {

    @Override
    public void addOfferIdentity(String fromId, String toId, String roomName, String offer, String candidate) {
        OfferIdentity offerIdentity = new OfferIdentity(
                fromId,
                toId,
                roomName,
                offer,
                candidate
        );
        SignTransferUtil.addOfferIdentity(offerIdentity);
    }

    @Override
    public void addAnswerIdentity(String fromId, String toId, String roomName, String answer) {
        AnswerIdentity answerIdentity = new AnswerIdentity(
                fromId,
                toId,
                roomName,
                answer
        );
        SignTransferUtil.addAnswerIdentity(answerIdentity);
    }
}
