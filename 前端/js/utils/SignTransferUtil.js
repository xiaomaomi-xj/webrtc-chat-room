var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import AjaxService from "../service/AjaxService.js";
import { RoomInfoApi, RoomInfoExtApi, SignTransferApi, SignTransferExtApi } from "../api/ApiConstant.js";
import SseService from "../service/SseService.js";
import StringUtil from "./StringUtil.js";
import EventStant from "../constant/EventStant.js";
import MessageTypeConstant from "../constant/MessageTypeConstant.js";
import LoadingControl from "../components/LoadingControl.js";
import { MessageBoxControl } from "../components/MessageBoxControl.js";
import VideoBoxControl from "../components/VideoBoxControl.js";
import ChatRoomBoxBiz from "../main/ChatRoomBoxBiz.js";
import FirstBoxBiz from "../main/FirstBoxBiz.js";
import IDGenerateUtil from "./IDgenerateUtil.js";
import ChatMessageControl from "../components/ChatMessageControl.js";
import UserListControl from "../components/UserListControl.js";
class SignTransferUtil {
    static createRoom(roomName, maxNumber, stream) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selfStream = stream;
            this.selfId = (yield new AjaxService(RoomInfoApi.createRoommUrl).send({
                roomName,
                maxNumber
            })).id;
            this.listerNewMember(roomName, stream);
            this.listerNewAnswer(roomName);
            LoadingControl.close();
            FirstBoxBiz.hide();
            ChatRoomBoxBiz.setRoomName(roomName);
            ChatRoomBoxBiz.show();
            const chatMessage = new ChatMessageControl();
            chatMessage.bindSendMessageFun(IDGenerateUtil.generateId(this.selfId), (message) => {
                this.sendAllMessage(message);
            });
            chatMessage.bindSelectSendFileFun(IDGenerateUtil.generateId(this.selfId), (fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum) => {
                this.sendAllFile(fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum);
            });
            ChatRoomBoxBiz.setPublicChatMessage(chatMessage);
        });
    }
    static enterRoom(roomName, stream) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selfStream = stream;
            this.selfId = (yield new AjaxService(RoomInfoApi.enterRoomUrl).send({
                roomName
            })).id;
            this.listerNewMember(roomName, stream);
            this.listerNewOffer(roomName, stream);
            this.listerNewAnswer(roomName);
            LoadingControl.close();
            FirstBoxBiz.hide();
            ChatRoomBoxBiz.setRoomName(roomName);
            ChatRoomBoxBiz.show();
            const chatMessage = new ChatMessageControl();
            chatMessage.bindSendMessageFun(IDGenerateUtil.generateId(this.selfId), (message) => {
                this.sendAllMessage(message);
            });
            chatMessage.bindSelectSendFileFun(IDGenerateUtil.generateId(this.selfId), (fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum) => {
                this.sendAllFile(fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum);
            });
            ChatRoomBoxBiz.setPublicChatMessage(chatMessage);
        });
    }
    static listerNewMember(roomName, stream) {
        new SseService(RoomInfoExtApi.getNewMemberUrl, StringUtil.objToParm({
            roomName,
            id: this.selfId
        })).bindEvent(EventStant.NEW_MEMBER, (data) => {
            const idArr = data.ids;
            if (idArr.length !== 0) {
                idArr.map(id => {
                    for (const v of this.otherIds) {
                        if (v === id) {
                            return;
                        }
                    }
                    this.otherIds.push(id);
                    let currentOffer;
                    const offerPc = this.createOfferConnect(stream, id, () => {
                        const candidate = JSON.stringify(this.icecandidateArr);
                        this.icecandidateArr.splice(0, this.icecandidateArr.length);
                        const offerStr = JSON.stringify(currentOffer);
                        new AjaxService(SignTransferApi.addOfferIdentityUrl).send({
                            fromId: this.selfId,
                            toId: id,
                            roomName,
                            offer: offerStr,
                            candidate
                        });
                    });
                    offerPc.createOffer().then((offer) => {
                        offerPc.setLocalDescription(offer).then(() => {
                            currentOffer = offer;
                        });
                    });
                    this.offerRTCPeerConnectionMap.set(id, offerPc);
                    this.listerClose(id, offerPc);
                });
            }
        });
    }
    static listerNewOffer(roomName, stream) {
        new SseService(SignTransferExtApi.getNewOfferUrl, StringUtil.objToParm({
            roomName,
            id: this.selfId
        })).bindEvent(EventStant.MEW_OFFER, (data) => {
            data.forEach(offerIdentity => {
                const answerPc = this.createAnswerConnect(stream, offerIdentity.fromId);
                const offer = JSON.parse(offerIdentity.offer);
                answerPc.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
                    answerPc.createAnswer().then((answer) => {
                        answerPc.setLocalDescription(answer).then(() => {
                            const candidateArr = JSON.parse(offerIdentity.candidate);
                            candidateArr.forEach(candidate => {
                                answerPc.addIceCandidate(candidate);
                            });
                            const answerStr = JSON.stringify(answer);
                            new AjaxService(SignTransferApi.addAnswerIdentityUrl).send({
                                fromId: this.selfId,
                                toId: offerIdentity.fromId,
                                roomName,
                                answer: answerStr
                            });
                        });
                    });
                });
                this.answerRTCPeerConnectionMap.set(offerIdentity.fromId, answerPc);
                this.listerClose(offerIdentity.fromId, answerPc);
                this.videoBoxMap.set(offerIdentity.fromId, new VideoBoxControl(IDGenerateUtil.generateId(offerIdentity.fromId)));
                const chatMessage = new ChatMessageControl();
                chatMessage.bindSendMessageFun(IDGenerateUtil.generateId(this.selfId), (message) => {
                    this.sendAppointMessage(message, offerIdentity.fromId);
                });
                chatMessage.bindSelectSendFileFun(IDGenerateUtil.generateId(this.selfId), (fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum) => {
                    this.sendAppoinFile(fileBaseUrl, fileName, fileStyle, offerIdentity.fromId, isSplit, currentNum, totalNum);
                });
                ChatRoomBoxBiz.addPrivateChatMessage(IDGenerateUtil.generateId(offerIdentity.fromId), chatMessage);
            });
        });
    }
    static listerNewAnswer(roomName) {
        new SseService(SignTransferExtApi.getNewAnswerUrl, StringUtil.objToParm({
            roomName,
            id: this.selfId
        })).bindEvent(EventStant.NEW_ANSWER, (data) => {
            data.forEach(answerIdentity => {
                const offerPc = this.offerRTCPeerConnectionMap.get(answerIdentity.fromId);
                const answer = JSON.parse(answerIdentity.answer);
                offerPc === null || offerPc === void 0 ? void 0 : offerPc.setRemoteDescription(new RTCSessionDescription(answer));
                this.videoBoxMap.set(answerIdentity.fromId, new VideoBoxControl(IDGenerateUtil.generateId(answerIdentity.fromId)));
                const chatMessage = new ChatMessageControl();
                chatMessage.bindSendMessageFun(IDGenerateUtil.generateId(this.selfId), (message) => {
                    this.sendAppointMessage(message, answerIdentity.fromId);
                });
                chatMessage.bindSelectSendFileFun(IDGenerateUtil.generateId(this.selfId), (fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum) => {
                    this.sendAppoinFile(fileBaseUrl, fileName, fileStyle, answerIdentity.fromId, isSplit, currentNum, totalNum);
                });
                ChatRoomBoxBiz.addPrivateChatMessage(IDGenerateUtil.generateId(answerIdentity.fromId), chatMessage);
            });
        });
    }
    static createOfferConnect(stream, id, callBack = () => { }) {
        const offerPc = new RTCPeerConnection();
        this.offerReceiveMessage(id, offerPc);
        offerPc.ontrack = (obj) => this.listerTrack(obj, id);
        stream.getTracks().forEach(track => {
            offerPc.addTrack(track, stream);
        });
        offerPc.onicecandidate = (event) => this.listerIceCandidate(event, callBack);
        return offerPc;
    }
    static createAnswerConnect(stream, id) {
        const answerPc = new RTCPeerConnection();
        this.answerReceiveMessage(id, answerPc);
        answerPc.ontrack = (obj) => this.listerTrack(obj, id);
        stream.getTracks().forEach(track => {
            answerPc.addTrack(track, stream);
        });
        return answerPc;
    }
    static listerTrack(event, id) {
        const videoBox = this.videoBoxMap.get(id);
        videoBox.createVideo(event.streams[0]);
        ChatRoomBoxBiz.addVideoBox(videoBox);
    }
    static listerIceCandidate(event, callBack) {
        if (event.candidate) {
            this.icecandidateArr.push(event.candidate);
        }
        else {
            callBack();
        }
    }
    static listerClose(key, pc) {
        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'closed') {
                this.offerRTCPeerConnectionMap.delete(key);
                this.answerRTCPeerConnectionMap.delete(key);
                this.selfRTCDataChannelMap.delete(key);
                new AjaxService(RoomInfoApi.outRoomUrl).send({
                    id: key
                });
                const videoBox = this.videoBoxMap.get(key);
                ChatRoomBoxBiz.delVideoBox(videoBox);
                ChatRoomBoxBiz.delPrivateMessage(IDGenerateUtil.generateId(key));
            }
        };
    }
    static close() {
        this.selfRTCDataChannelMap.forEach(dc => {
            dc.close();
        });
        this.offerRTCPeerConnectionMap.forEach(pc => {
            pc.close();
        });
        this.answerRTCPeerConnectionMap.forEach(pc => {
            pc.close();
        });
        this.selfStream.getTracks().forEach(track => {
            track.stop();
        });
        new AjaxService(RoomInfoApi.outRoomUrl).send({
            id: this.selfId
        });
        window.location.reload();
    }
    static sendAppointMessage(message, key) {
        if (!this.sendMessageStateMap.get(key)) {
            MessageBoxControl.open("消息通道未打开或则发生错误已关闭！");
            return;
        }
        const dc = this.selfRTCDataChannelMap.get(key);
        dc === null || dc === void 0 ? void 0 : dc.send(JSON.stringify({
            sfid: IDGenerateUtil.generateId(this.selfId),
            message,
            state: MessageTypeConstant.privateState,
            style: MessageTypeConstant.messageStyle
        }));
    }
    static sendAppoinFile(fileBaseUrl, fileName, fileStyle, key, isSplit, currentNum, totalNum) {
        if (!this.sendMessageStateMap.get(key)) {
            MessageBoxControl.open("消息通道未打开或则发生错误已关闭！");
            return;
        }
        const dc = this.selfRTCDataChannelMap.get(key);
        dc === null || dc === void 0 ? void 0 : dc.send(JSON.stringify({
            sfid: IDGenerateUtil.generateId(this.selfId),
            fileName,
            fileBaseUrl,
            fileStyle,
            state: MessageTypeConstant.privateState,
            style: MessageTypeConstant.fileStyle,
            isSplit,
            currentNum,
            totalNum
        }));
    }
    static sendAllMessage(message) {
        let isAnyone = false;
        this.selfRTCDataChannelMap.forEach((dc, key) => {
            if (!this.sendMessageStateMap.get(key)) {
                return;
            }
            isAnyone = true;
            dc.send(JSON.stringify({
                sfid: IDGenerateUtil.generateId(this.selfId),
                message,
                state: MessageTypeConstant.publicState,
                style: MessageTypeConstant.messageStyle
            }));
        });
        if (!isAnyone) {
            MessageBoxControl.open("无人进入或则进入的人信息通道还未打开或则通道发生错误已关闭！");
        }
    }
    static sendAllFile(fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum) {
        let isAnyone = false;
        this.selfRTCDataChannelMap.forEach((dc, key) => {
            if (!this.sendMessageStateMap.get(key)) {
                return;
            }
            isAnyone = true;
            dc.bufferedAmountLowThreshold = 102400;
            dc.send(JSON.stringify({
                sfid: IDGenerateUtil.generateId(this.selfId),
                fileName,
                fileBaseUrl,
                fileStyle,
                state: MessageTypeConstant.publicState,
                style: MessageTypeConstant.fileStyle,
                isSplit,
                currentNum,
                totalNum
            }));
        });
        if (!isAnyone) {
            MessageBoxControl.open("无人进入或则进入的人信息通道还未打开或则通道发生错误已关闭！");
        }
    }
    static offerReceiveMessage(key, pc) {
        this.sendMessageStateMap.set(key, false);
        this.handleChannel(key, pc.createDataChannel('xiaomaomi-xj'));
    }
    static answerReceiveMessage(key, pc) {
        this.sendMessageStateMap.set(key, false);
        pc.ondatachannel = (event) => {
            this.handleChannel(key, event.channel);
        };
    }
    static handleChannel(key, dc) {
        this.selfRTCDataChannelMap.set(key, dc);
        dc.onmessage = (event) => {
            const messageInfo = JSON.parse(event.data);
            if (messageInfo.state === MessageTypeConstant.publicState) {
                ChatRoomBoxBiz.showPublicDot();
                const chatMessage = ChatRoomBoxBiz.getPublicChatMessage();
                if (messageInfo.style === MessageTypeConstant.messageStyle) {
                    chatMessage.receiveMessage(messageInfo.sfid, messageInfo.message);
                }
                else {
                    chatMessage.receiveFile(messageInfo.sfid, messageInfo.fileName, messageInfo.fileBaseUrl, messageInfo.fileStyle, messageInfo.isSplit, messageInfo.currentNum, messageInfo.totalNum);
                }
            }
            else {
                ChatRoomBoxBiz.showPrivateDot();
                UserListControl.showUserDot(messageInfo.sfid);
                const chatMessage = ChatRoomBoxBiz.getPrivateChatMessage(messageInfo.sfid);
                if (messageInfo.style === MessageTypeConstant.messageStyle) {
                    chatMessage.receiveMessage(messageInfo.sfid, messageInfo.message);
                }
                else {
                    chatMessage.receiveFile(messageInfo.sfid, messageInfo.fileName, messageInfo.fileBaseUrl, messageInfo.fileStyle, messageInfo.isSplit, messageInfo.currentNum, messageInfo.totalNum);
                }
            }
        };
        dc.onopen = () => {
            this.sendMessageStateMap.set(key, true);
        };
        dc.onclose = () => {
            this.selfRTCDataChannelMap.delete(key);
        };
        dc.onerror = (event) => {
            this.selfRTCDataChannelMap.delete(key);
            if (event.error.message.toLowerCase().indexOf('close') !== -1) {
                return;
            }
            MessageBoxControl.open("发生错误，错误信息：" + event.error.message + "，信息通道已关闭!", () => window.location.reload());
        };
    }
}
_a = SignTransferUtil;
SignTransferUtil.sendMessageStateMap = new Map();
(() => {
    _a.selfId = '';
    _a.otherIds = new Array();
    _a.offerRTCPeerConnectionMap = new Map();
    _a.answerRTCPeerConnectionMap = new Map();
    _a.icecandidateArr = new Array();
    _a.selfRTCDataChannelMap = new Map();
    _a.videoBoxMap = new Map();
})();
export default SignTransferUtil;
