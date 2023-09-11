import LoadingControl from "../components/LoadingControl.js";
import { MessageBoxControl } from "../components/MessageBoxControl.js";
import { VideoMaxBoxControl } from "../components/VideoMaxBoxControl.js";
import FirstBoxBiz from "./FirstBoxBiz.js";
import { ConfirmTipsBoxControl } from "../components/ConfirmTipsBoxControl.js";
import OutputStreamUtil from "../utils/OutputStreamUtil.js";
import SelfVideoBoxControl from "../components/SelfVideoBoxControl.js";
import CanvasStyle from "../constant/CanvasStyle.js";
import SelectBoxControl from "../components/SelectBoxControl.js";
import TvBoxControl from "../components/TvBoxControl.js";
import ChatRoomBoxBiz from "./ChatRoomBoxBiz.js";
import SignTransferUtil from "../utils/SignTransferUtil.js";
import CustomBoxControl from "../components/CustomBoxControl.js";
import UserListTipsControl from "../components/UserListTipsControl.js";
import ChatMessageImageControl from "../components/ChatMessageImageControl.js";
import ChatMessageVideoControl from "../components/ChatMessageVideoControl.js";
class MainBiz {
    static run() {
        LoadingControl.mount(this.bodyEl);
        MessageBoxControl.mount(this.bodyEl);
        VideoMaxBoxControl.mount(this.bodyEl);
        ConfirmTipsBoxControl.mount(this.bodyEl);
        CustomBoxControl.mount(this.bodyEl);
        UserListTipsControl.mount(this.bodyEl);
        ChatMessageImageControl.mount(this.bodyEl);
        ChatMessageVideoControl.mount(this.bodyEl);
        this.firstBoxViewCode(() => {
            FirstBoxBiz.run();
        });
        FirstBoxBiz.bindCallBackFun((roomName, maxNumber) => {
            this.createRoom(roomName, maxNumber);
        }, (roomName) => {
            this.enterRoom(roomName);
        });
        this.chatRoomBoxCode(() => {
            ChatRoomBoxBiz.run();
            ChatRoomBoxBiz.hide();
        });
        ChatRoomBoxBiz.bindCloseCallBackFun(() => SignTransferUtil.close());
        this.setSelfVideoStyle();
        SelectBoxControl.run();
        TvBoxControl.run();
        TvBoxControl.bindEvent(() => {
            OutputStreamUtil.getDisplayMedia(this.selfVideoBox.modifyVideo.bind(this.selfVideoBox), () => {
                TvBoxControl.publicClose();
                OutputStreamUtil.getUserMedia(this.selfVideoBox.modifyVideo.bind(this.selfVideoBox));
            });
        }, () => {
            OutputStreamUtil.getUserMedia(this.selfVideoBox.modifyVideo.bind(this.selfVideoBox));
        });
    }
    static createRoom(roomName, maxNumber) {
        OutputStreamUtil.getUserMedia((stream) => {
            LoadingControl.open();
            this.selfVideoBox.createVideo(stream);
            ChatRoomBoxBiz.addVideoBox(this.selfVideoBox);
            SignTransferUtil.createRoom(roomName, maxNumber, this.selfVideoBox.getStream());
        });
    }
    static enterRoom(roomName) {
        OutputStreamUtil.getUserMedia((stream) => {
            LoadingControl.open();
            this.selfVideoBox.createVideo(stream);
            ChatRoomBoxBiz.addVideoBox(this.selfVideoBox);
            SignTransferUtil.enterRoom(roomName, this.selfVideoBox.getStream());
        });
    }
    static setSelfVideoStyle() {
        const selfVideoStyleSelect = document.querySelector('.self-video-style');
        SelectBoxControl.bindChangeEvent(selfVideoStyleSelect, this.selfVideoBox.modifyStyle.bind(this.selfVideoBox));
        CanvasStyle.getStyleMap().forEach((v, k) => {
            const divEl = document.createElement('div');
            if (k === 'original') {
                divEl.setAttribute("check", "check");
            }
            divEl.className = 'select-option-box';
            divEl.setAttribute('value', k);
            divEl.innerText = v;
            selfVideoStyleSelect.appendChild(divEl);
        });
    }
    static firstBoxViewCode(callBackFun) {
        let firstBoxEl = document.createElement('div');
        firstBoxEl.className = 'first-box';
        let firstBoxContent = `
            <div class="first-form-box">
                <div class="first-form-create-room">
                    <div class="first-form-header">
                        <span>webrtc视频聊天室</span>
                    </div>
                    <div class="first-form-body">
                        <div class="input-box-box">
                            <span>房间名称：</span>
                            <div class="input-box">
                                <input type="text" class="create-roomName" placeholder="请输入房间名称...">
                            </div>
                        </div>
                        <div class="input-box-box">
                            <span>房间最大人数：</span>
                            <div class="input-box">
                                <input type="number" class="create-maxNumber" placeholder="请输入房间最大人数...">
                            </div>
                        </div>
                    </div>
                    <div class="first-form-footer">
                        <div class="button-box create-room-btn">创建房间</div>
                        <span style="font-size: .9em;cursor: pointer;" class="to-enter-room">>>>进入房间页</span>
                    </div>
                </div>
            </div>
            <div class="first-form-box">
                <div class="first-form-enter-room">
                    <div class="first-form-header">
                        <span>webrtc视频聊天室</span>
                    </div>
                    <div class="first-form-body">
                        <div class="input-box-box">
                            <span>房间名称：</span>
                            <div class="input-box">
                                <input type="text" class="enter-roomName" placeholder="请输入房间名称...">
                            </div>
                        </div>
                    </div>
                    <div class="first-form-footer">
                        <div class="button-box enter-room-btn">进入房间</div>
                        <span style="font-size: .9em;cursor: pointer;" class="to-create-room">>>>创建房间页</span>
                    </div>
                </div>
            </div>
        `;
        firstBoxEl.innerHTML = firstBoxContent;
        this.bodyEl.appendChild(firstBoxEl);
        setTimeout(() => {
            callBackFun();
        });
    }
    static chatRoomBoxCode(callBackFun) {
        let chatRoomBoxEl = document.createElement('div');
        chatRoomBoxEl.className = 'chat-room-box';
        let chatRoomCode = `
            <div class="chat-room-header-box">
                <div class="exit-chat-room">
                    <div class="exit-chat-room-left"></div>
                    <div class="exit-chat-room-right"></div>
                </div>
                <span></span>
            </div>
            <div class="chat-room-body-box">
                <div class="chat-room-body-video-box">
                </div>
            </div>
            <div class="chat-room-footer-box">
                <div class="chat-room-footer-left-box">
                    <span>视频样式：</span>
                    <div class="select-box">
                        <span>test</span>
                        <div class="select-option-box-box self-video-style">
                        </div>
                    </div>
                </div>
                <div class="chat-room-footer-middle-box">
                    <div class="tv-box">
                        <div class="tv-header-box">
                            <span>TV</span>
                        </div>
                        <div class="tv-body-box">
                        </div>
                        <div class="tv-footer-box">
                        </div>
                    </div>
                </div>
                <div class="chat-room-footer-right-box">
                    <div class="chat-message-btn-box">
                        <div class="chat-message-left-btn">
                            <div class="chat-message-left-dot"></div>
                            全员消息
                        </div>
                        <div class="chat-message-right-btn">
                            <div class="chat-message-right-dot"></div>
                            私人消息
                        </div>
                    </div>
                </div>
            </div>
        `;
        chatRoomBoxEl.innerHTML = chatRoomCode;
        this.bodyEl.appendChild(chatRoomBoxEl);
        setTimeout(() => {
            callBackFun();
        });
    }
}
MainBiz.bodyEl = document.body;
MainBiz.selfVideoBox = new SelfVideoBoxControl();
export default MainBiz;
