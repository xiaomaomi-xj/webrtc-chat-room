import { ConfirmTipsBoxControl } from "../components/ConfirmTipsBoxControl.js";
import CustomBoxControl from "../components/CustomBoxControl.js";
import UserListControl from "../components/UserListControl.js";
import UserListTipsControl from "../components/UserListTipsControl.js";
class ChatRoomBoxBiz {
    static run() {
        this.chatRoomBoxEl = document.querySelector('.chat-room-box');
        this.exitChatRoomEl = document.querySelector('.exit-chat-room');
        this.chatRoomNameEl = this.exitChatRoomEl.nextElementSibling;
        this.chatRoomBodyVideoBoxEl = document.querySelector('.chat-room-body-video-box');
        this.chatMessageLeftBtn = document.querySelector('.chat-message-left-btn');
        this.chatMessageRightBtn = document.querySelector('.chat-message-right-btn');
        this.chatMessageLeftDot = document.querySelector('.chat-message-left-dot');
        this.chatMessageRightDot = document.querySelector('.chat-message-right-dot');
        this.listerClickCloseEvent();
        this.listerPrivateBtnClick();
        this.listerPublicBtnClick();
    }
    static setRoomName(roomName) {
        this.chatRoomNameEl.innerText = '房间名：' + roomName;
    }
    static addVideoBox(videoBox) {
        this.chatRoomBodyVideoBoxEl.appendChild(videoBox.getVideoBoxEl());
    }
    static delVideoBox(videoBox) {
        this.chatRoomBodyVideoBoxEl.removeChild(videoBox.getVideoBoxEl());
    }
    static bindCloseCallBackFun(callBackFun) {
        this.closeCallBackFun = callBackFun;
    }
    static hide() {
        this.chatRoomBoxEl.style.display = 'none';
    }
    static show() {
        document.body.style.backgroundColor = '#111';
        this.chatRoomBoxEl.style.display = 'flex';
    }
    static listerClickCloseEvent() {
        this.exitChatRoomEl.addEventListener('click', () => {
            ConfirmTipsBoxControl.open("确定要退出吗？", () => this.closeCallBackFun());
        });
    }
    static showPublicDot() {
        if (this.publicFlag) {
            return;
        }
        this.chatMessageLeftDot.style.display = 'block';
    }
    static hidePublicDot() {
        this.chatMessageLeftDot.style.display = 'none';
    }
    static showPrivateDot() {
        if (this.privateFlag) {
            return;
        }
        this.chatMessageRightDot.style.display = 'block';
    }
    static hidePrivateDot() {
        this.chatMessageRightDot.style.display = 'none';
    }
    static listerPublicBtnClick() {
        this.chatMessageLeftBtn.addEventListener('click', () => {
            this.publicFlag = true;
            this.hidePublicDot();
            CustomBoxControl.open("全员聊天", this.publicChatMessage.getChatMessageBoxEl(), () => this.publicFlag = false);
        });
    }
    static listerPrivateBtnClick() {
        this.chatMessageRightBtn.addEventListener('click', () => {
            this.privateFlag = true;
            this.hidePrivateDot();
            UserListTipsControl.open("用户列表", UserListControl.getUserListBox(), () => this.privateFlag = false);
        });
    }
    static addPrivateChatMessage(id, chatMessage) {
        this.privateChatMessageMap.set(id, chatMessage);
        UserListControl.addUserInfoBox(id);
    }
    static getPrivateChatMessage(id) {
        return this.privateChatMessageMap.get(id);
    }
    static delPrivateMessage(id) {
        this.privateChatMessageMap.delete(id);
        UserListControl.delUserInfoBox(id);
    }
    static setPublicChatMessage(chatMessage) {
        this.publicChatMessage = chatMessage;
    }
    static getPublicChatMessage() {
        return this.publicChatMessage;
    }
}
ChatRoomBoxBiz.privateFlag = false;
ChatRoomBoxBiz.publicFlag = false;
ChatRoomBoxBiz.privateChatMessageMap = new Map();
export default ChatRoomBoxBiz;
