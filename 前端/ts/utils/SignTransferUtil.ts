import AjaxService from "../service/AjaxService.js";
import { RoomInfoApi, RoomInfoExtApi, SignTransferApi, SignTransferExtApi } from "../api/ApiConstant.js";
import { AnswerIdentityType, IdBoType, IdsBoType, OfferIdentityType } from "../interface/Type.js";
import SseService from "../service/SseService.js";
import StringUtil from "./StringUtil.js";
import EventStant from "../constant/EventStant.js";
import MessageTypeConstant from "../constant/MessageTypeConstant.js";
import MessageType from "../interface/MessageType.js";
import LoadingControl from "../components/LoadingControl.js";
import { MessageBoxControl } from "../components/MessageBoxControl.js";
import VideoBoxControl from "../components/VideoBoxControl.js";
import ChatRoomBoxBiz from "../main/ChatRoomBoxBiz.js";
import FirstBoxBiz from "../main/FirstBoxBiz.js";
import IDGenerateUtil from "./IDgenerateUtil.js";
import ChatMessageControl from "../components/ChatMessageControl.js";
import UserListControl from "../components/UserListControl.js";
import { ConfirmTipsBoxControl } from "../components/ConfirmTipsBoxControl.js";
//信令交互工具类
export default class SignTransferUtil {
    //多对多
    private static selfId: string;
    private static otherIds: Array<string>;
    //所有链接配置使用默认配置，谷歌为例：'stun:stun.l.google.com:19302',这是一个 Google 提供的免费 STUN 服务器
    private static offerRTCPeerConnectionMap: Map<string, RTCPeerConnection>;
    private static answerRTCPeerConnectionMap: Map<string, RTCPeerConnection>;
    private static icecandidateArr: Array<RTCIceCandidate>;
    //无论是offer的还是answer的都放到一起
    private static selfRTCDataChannelMap: Map<string, RTCDataChannel>
    //存储流用于关闭
    private static selfStream: MediaStream;
    //存储视频组件
    private static videoBoxMap: Map<String, VideoBoxControl>;
    //检测消息通道是否打开，是否可以发送消息
    private static sendMessageStateMap: Map<string, boolean> = new Map();
    static {
        this.selfId = '';
        this.otherIds = new Array();
        this.offerRTCPeerConnectionMap = new Map();
        this.answerRTCPeerConnectionMap = new Map();
        this.icecandidateArr = new Array();
        this.selfRTCDataChannelMap = new Map();
        this.videoBoxMap = new Map();
    }

    //创建房间
    public static async createRoom(roomName: string, maxNumber: number, stream: MediaStream) {
        this.selfStream = stream;
        //创建房间，得到自己的id
        this.selfId = (await new AjaxService(RoomInfoApi.createRoommUrl).send({
            roomName,
            maxNumber
        }) as IdBoType).id;
        //创建房间不需要监听offer,因为他永远是发offer的哪一个
        this.listerNewMember(roomName, stream);
        this.listerNewAnswer(roomName);
        //关闭加载，隐藏第一个页面，显示聊天页
        LoadingControl.close();
        FirstBoxBiz.hide();
        //显示之前设置一下房间名
        ChatRoomBoxBiz.setRoomName(roomName);
        ChatRoomBoxBiz.show();
        //设置全员消息组件
        const chatMessage = new ChatMessageControl();
        chatMessage.bindSendMessageFun(IDGenerateUtil.generateId(this.selfId), (message: string) => {
            this.sendAllMessage(message);
        });
        chatMessage.bindSelectSendFileFun(IDGenerateUtil.generateId(this.selfId), (fileBaseUrl: string, fileName: string, fileStyle: string, isSplit: boolean, currentNum: number, totalNum: number) => {
            this.sendAllFile(fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum);
        });
        ChatRoomBoxBiz.setPublicChatMessage(chatMessage);
    }

    //进入房间
    public static async enterRoom(roomName: string, stream: MediaStream) {
        this.selfStream = stream;
        //进入房间，得到自己的id
        this.selfId = (await new AjaxService(RoomInfoApi.enterRoomUrl).send({
            roomName
        }) as IdBoType).id;
        //进入房间所有都监听
        this.listerNewMember(roomName, stream);
        this.listerNewOffer(roomName, stream);
        this.listerNewAnswer(roomName);
        //关闭加载，隐藏第一个页面，显示聊天页
        LoadingControl.close();
        FirstBoxBiz.hide();
        //显示之前设置一下房间名
        ChatRoomBoxBiz.setRoomName(roomName);
        ChatRoomBoxBiz.show();
        //设置全员消息组件
        const chatMessage = new ChatMessageControl();
        chatMessage.bindSendMessageFun(IDGenerateUtil.generateId(this.selfId), (message: string) => {
            this.sendAllMessage(message);
        });
        chatMessage.bindSelectSendFileFun(IDGenerateUtil.generateId(this.selfId), (fileBaseUrl: string, fileName: string, fileStyle: string, isSplit: boolean, currentNum: number, totalNum: number) => {
            this.sendAllFile(fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum);
        });
        ChatRoomBoxBiz.setPublicChatMessage(chatMessage);
    }

    //监听是否有人加入,连接一旦确认就无法更改了，所以需要自己处理返回值
    private static listerNewMember(roomName: string, stream: MediaStream) {
        new SseService(RoomInfoExtApi.getNewMemberUrl, StringUtil.objToParm({
            roomName,
            id: this.selfId
        })).bindEvent(EventStant.NEW_MEMBER, (data: IdsBoType) => {
            const idArr = data.ids;
            if (idArr.length !== 0) {
                //有人加入,创建rtc
                idArr.map(id => {
                    //如果是在自己之前进来的就没必要再去和他进行连接，早来的永远主动连接后来的,由后端控制
                    //除掉自己已经有的
                    for (const v of this.otherIds) {
                        if (v === id) {
                            return;
                        }
                    }
                    this.otherIds.push(id);
                    let currentOffer: RTCSessionDescriptionInit;
                    const offerPc = this.createOfferConnect(stream, id, () => {
                        //回调拿到ice候选信息
                        const candidate = JSON.stringify(this.icecandidateArr);
                        this.icecandidateArr.splice(0, this.icecandidateArr.length);
                        const offerStr = JSON.stringify(currentOffer);
                        //告诉服务器添加一个发送者
                        new AjaxService(SignTransferApi.addOfferIdentityUrl).send({
                            fromId: this.selfId,
                            toId: id,
                            roomName,
                            offer: offerStr,
                            candidate
                        });
                    });
                    offerPc.createOffer().then((offer: RTCSessionDescriptionInit) => {
                        offerPc.setLocalDescription(offer).then(() => {
                            currentOffer = offer
                        });
                    });
                    //存储RTC
                    this.offerRTCPeerConnectionMap.set(id, offerPc);
                    //监听关闭
                    this.listerClose(id, offerPc);
                });
            }
        });
    }

    //监听是否有发送者发来了offer,只接受自己的
    private static listerNewOffer(roomName: string, stream: MediaStream) {
        new SseService(SignTransferExtApi.getNewOfferUrl, StringUtil.objToParm({
            roomName,
            id: this.selfId
        })).bindEvent(EventStant.MEW_OFFER, (data: Array<OfferIdentityType>) => {
            //获取的都是自己需要的offer
            data.forEach(offerIdentity => {
                const answerPc = this.createAnswerConnect(stream, offerIdentity.fromId);
                const offer = JSON.parse(offerIdentity.offer) as RTCSessionDescriptionInit;
                answerPc.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
                    answerPc.createAnswer().then((answer: RTCSessionDescriptionInit) => {
                        answerPc.setLocalDescription(answer).then(() => {
                            //把ice添加进来
                            const candidateArr = JSON.parse(offerIdentity.candidate) as Array<RTCIceCandidateInit>;
                            candidateArr.forEach(candidate => {
                                answerPc.addIceCandidate(candidate);
                            });
                            const answerStr = JSON.stringify(answer);
                            //告诉服务器添加一个接收者
                            new AjaxService(SignTransferApi.addAnswerIdentityUrl).send({
                                fromId: this.selfId,
                                toId: offerIdentity.fromId,
                                roomName,
                                answer: answerStr
                            });
                        });
                    });
                });
                //存储RTC
                this.answerRTCPeerConnectionMap.set(offerIdentity.fromId, answerPc);
                //监听关闭
                this.listerClose(offerIdentity.fromId, answerPc);
                //设置视频id
                this.videoBoxMap.set(offerIdentity.fromId, new VideoBoxControl(IDGenerateUtil.generateId(offerIdentity.fromId)));
                //设置私有消息组件
                const chatMessage = new ChatMessageControl();
                chatMessage.bindSendMessageFun(IDGenerateUtil.generateId(this.selfId), (message: string) => {
                    this.sendAppointMessage(message, offerIdentity.fromId);
                });
                chatMessage.bindSelectSendFileFun(IDGenerateUtil.generateId(this.selfId), (fileBaseUrl: string, fileName: string, fileStyle: string, isSplit: boolean, currentNum: number, totalNum: number) => {
                    this.sendAppoinFile(fileBaseUrl, fileName, fileStyle, offerIdentity.fromId, isSplit, currentNum, totalNum);
                });
                ChatRoomBoxBiz.addPrivateChatMessage(IDGenerateUtil.generateId(offerIdentity.fromId), chatMessage);
            });
        });
    }

    //监听是否有接受者发来了answer，只接受自己的
    private static listerNewAnswer(roomName: string) {
        new SseService(SignTransferExtApi.getNewAnswerUrl, StringUtil.objToParm({
            roomName,
            id: this.selfId
        })).bindEvent(EventStant.NEW_ANSWER, (data: Array<AnswerIdentityType>) => {
            //获取的都是自己需要的answer
            data.forEach(answerIdentity => {
                //根据id找到自己对应的answer
                const offerPc = this.offerRTCPeerConnectionMap.get(answerIdentity.fromId);
                const answer = JSON.parse(answerIdentity.answer) as RTCSessionDescriptionInit;
                offerPc?.setRemoteDescription(new RTCSessionDescription(answer));
                //设置视频id
                this.videoBoxMap.set(answerIdentity.fromId, new VideoBoxControl(IDGenerateUtil.generateId(answerIdentity.fromId)));
                //设置私有消息组件
                const chatMessage = new ChatMessageControl();
                chatMessage.bindSendMessageFun(IDGenerateUtil.generateId(this.selfId), (message: string) => {
                    this.sendAppointMessage(message, answerIdentity.fromId);
                });
                chatMessage.bindSelectSendFileFun(IDGenerateUtil.generateId(this.selfId), (fileBaseUrl: string, fileName: string, fileStyle: string, isSplit: boolean, currentNum: number, totalNum: number) => {
                    this.sendAppoinFile(fileBaseUrl, fileName, fileStyle, answerIdentity.fromId, isSplit, currentNum, totalNum);
                });
                ChatRoomBoxBiz.addPrivateChatMessage(IDGenerateUtil.generateId(answerIdentity.fromId), chatMessage);
            })
        });
    }

    //创建offer连接
    private static createOfferConnect(stream: MediaStream, id: string, callBack: Function = () => { }): RTCPeerConnection {
        const offerPc = new RTCPeerConnection();
        //创建监听消息组件
        this.offerReceiveMessage(id, offerPc);
        offerPc.ontrack = (obj: RTCTrackEvent) => this.listerTrack(obj, id);
        stream.getTracks().forEach(track => {
            offerPc.addTrack(track, stream);
        });
        offerPc.onicecandidate = (event: RTCPeerConnectionIceEvent) => this.listerIceCandidate(event, callBack);
        return offerPc;
    }

    //创建answer连接
    private static createAnswerConnect(stream: MediaStream, id: string) {
        const answerPc = new RTCPeerConnection();
        //创建监听消息组件
        this.answerReceiveMessage(id, answerPc);
        answerPc.ontrack = (obj: RTCTrackEvent) => this.listerTrack(obj, id);
        stream.getTracks().forEach(track => {
            answerPc.addTrack(track, stream);
        });
        //不需要候选信息
        return answerPc;
    }

    //监听添加轨道事件
    private static listerTrack(event: RTCTrackEvent, id: string) {
        //设置流,并添加组件
        const videoBox = this.videoBoxMap.get(id) as VideoBoxControl;
        videoBox.createVideo(event.streams[0]);
        //可能会多次执行，但是对于相同的节点，并不会追加
        ChatRoomBoxBiz.addVideoBox(videoBox);
    }

    //获取candidate,不进行createOffer或者createAnswer就不会触发此函数
    private static listerIceCandidate(event: RTCPeerConnectionIceEvent, callBack: Function) {
        if (event.candidate) {
            this.icecandidateArr.push(event.candidate);
        } else {
            //利用回调解决ice存储使用问题
            callBack();
        }
    }

    //监听关闭
    private static listerClose(key: string, pc: RTCPeerConnection) {
        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'closed') {
                // 连接已关闭
                this.offerRTCPeerConnectionMap.delete(key);
                this.answerRTCPeerConnectionMap.delete(key);
                this.selfRTCDataChannelMap.delete(key);
                //防止不是正常退出的
                new AjaxService(RoomInfoApi.outRoomUrl).send({
                    id: key
                });
                //移除
                const videoBox = this.videoBoxMap.get(key) as VideoBoxControl;
                ChatRoomBoxBiz.delVideoBox(videoBox);
                //聊天列表也要移除
                ChatRoomBoxBiz.delPrivateMessage(IDGenerateUtil.generateId(key));
            }
        }
    }

    //关闭连接
    public static close() {
        this.selfRTCDataChannelMap.forEach(dc => {
            dc.close();
        })
        this.offerRTCPeerConnectionMap.forEach(pc => {
            pc.close();
        });
        this.answerRTCPeerConnectionMap.forEach(pc => {
            pc.close();
        });
        this.selfStream.getTracks().forEach(track => {
            track.stop();
        });
        //房间去除本人
        new AjaxService(RoomInfoApi.outRoomUrl).send({
            id: this.selfId
        });
        //刷新网页
        window.location.reload();
    }

    //发送私人指定消息
    private static sendAppointMessage(message: string, key: string) {
        if (!this.sendMessageStateMap.get(key)) {
            MessageBoxControl.open("消息通道未打开或则发生错误已关闭！");
            return;
        }
        const dc = this.selfRTCDataChannelMap.get(key);
        dc?.send(JSON.stringify({
            sfid: IDGenerateUtil.generateId(this.selfId),
            message,
            state: MessageTypeConstant.privateState,
            style: MessageTypeConstant.messageStyle
        }));
    }

    //发送私人文件消息
    private static sendAppoinFile(fileBaseUrl: string, fileName: string, fileStyle: string, key: string, isSplit: boolean, currentNum: number, totalNum: number) {
        if (!this.sendMessageStateMap.get(key)) {
            MessageBoxControl.open("消息通道未打开或则发生错误已关闭！");
            return;
        }
        const dc = this.selfRTCDataChannelMap.get(key);
        dc?.send(JSON.stringify({
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

    //发送全员消息
    private static sendAllMessage(message: string) {
        //是否有人
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

    //发送全员文件消息
    private static sendAllFile(fileBaseUrl: string, fileName: string, fileStyle: string, isSplit: boolean, currentNum: number, totalNum: number) {
        //是否有人
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

    //offer处理消息
    private static offerReceiveMessage(key: string, pc: RTCPeerConnection) {
        this.sendMessageStateMap.set(key, false);
        this.handleChannel(key, pc.createDataChannel('xiaomaomi-xj'));
    }


    //answer处理消息
    private static answerReceiveMessage(key: string, pc: RTCPeerConnection) {
        this.sendMessageStateMap.set(key, false);
        pc.ondatachannel = (event: RTCDataChannelEvent) => {
            this.handleChannel(key, event.channel);
        }
    }

    //消息统一处理
    private static handleChannel(key: string, dc: RTCDataChannel) {
        this.selfRTCDataChannelMap.set(key, dc);
        dc.onmessage = (event) => {
            const messageInfo = JSON.parse(event.data) as MessageType;
            //全员的
            if (messageInfo.state === MessageTypeConstant.publicState) {
                ChatRoomBoxBiz.showPublicDot();
                const chatMessage = ChatRoomBoxBiz.getPublicChatMessage();
                if (messageInfo.style === MessageTypeConstant.messageStyle) {
                    //文字信息
                    chatMessage.receiveMessage(messageInfo.sfid, messageInfo.message as string);
                } else {
                    //接受文件
                    chatMessage.receiveFile(messageInfo.sfid, messageInfo.fileName as string, messageInfo.fileBaseUrl as string, messageInfo.fileStyle as string, messageInfo.isSplit as boolean, messageInfo.currentNum as number, messageInfo.totalNum as number);
                }
            } else {
                //私有的,来消息显示红点
                ChatRoomBoxBiz.showPrivateDot();
                UserListControl.showUserDot(messageInfo.sfid);
                const chatMessage = ChatRoomBoxBiz.getPrivateChatMessage(messageInfo.sfid);
                if (messageInfo.style === MessageTypeConstant.messageStyle) {
                    //文字信息
                    chatMessage.receiveMessage(messageInfo.sfid, messageInfo.message as string);
                } else {
                    //接受文件
                    chatMessage.receiveFile(messageInfo.sfid, messageInfo.fileName as string, messageInfo.fileBaseUrl as string, messageInfo.fileStyle as string, messageInfo.isSplit as boolean, messageInfo.currentNum as number, messageInfo.totalNum as number);
                }
            }
        };
        dc.onopen = () => {
            //进行记载，只有通道打开的才能发送消息
            this.sendMessageStateMap.set(key, true);
        }
        //监听关闭去除
        dc.onclose = () => {
            this.selfRTCDataChannelMap.delete(key);
        }
        dc.onerror = (event) => {
            this.selfRTCDataChannelMap.delete(key);
            if ((event as RTCErrorEvent).error.message.toLowerCase().indexOf('close') !== -1) {
                //关闭通道，不算报错
                return;
            }
            MessageBoxControl.open("发生错误，错误信息：" + (event as RTCErrorEvent).error.message + "，信息通道已关闭!", () => window.location.reload());
        };
    }
}