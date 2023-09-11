import ChatMessageControl from "../components/ChatMessageControl.js";
import { ConfirmTipsBoxControl } from "../components/ConfirmTipsBoxControl.js";
import CustomBoxControl from "../components/CustomBoxControl.js";
import SelfVideoBoxControl from "../components/SelfVideoBoxControl.js";
import UserListControl from "../components/UserListControl.js";
import UserListTipsControl from "../components/UserListTipsControl.js";
import VideoBoxControl from "../components/VideoBoxControl.js";

//聊天室业务控制
export default class ChatRoomBoxBiz {
    private static chatRoomBoxEl: HTMLDivElement;
    private static exitChatRoomEl: HTMLDivElement;
    private static chatRoomNameEl: HTMLSpanElement;
    private static chatRoomBodyVideoBoxEl: HTMLDivElement;
    private static chatMessageLeftBtn: HTMLDivElement;
    private static chatMessageRightBtn: HTMLDivElement;
    private static privateFlag: boolean = false;
    private static publicFlag: boolean = false;
    private static chatMessageLeftDot: HTMLDivElement;
    private static chatMessageRightDot: HTMLDivElement;
    //关闭回调事件
    private static closeCallBackFun: Function;
    //全员聊天框和个人聊天框
    private static publicChatMessage: ChatMessageControl;
    private static privateChatMessageMap: Map<string, ChatMessageControl> = new Map();

    //运行
    public static run() {
        this.chatRoomBoxEl = document.querySelector('.chat-room-box') as HTMLDivElement;
        this.exitChatRoomEl = document.querySelector('.exit-chat-room') as HTMLDivElement;
        this.chatRoomNameEl = this.exitChatRoomEl.nextElementSibling as HTMLSpanElement;
        this.chatRoomBodyVideoBoxEl = document.querySelector('.chat-room-body-video-box') as HTMLDivElement;
        this.chatMessageLeftBtn = document.querySelector('.chat-message-left-btn') as HTMLDivElement;
        this.chatMessageRightBtn = document.querySelector('.chat-message-right-btn') as HTMLDivElement;
        this.chatMessageLeftDot = document.querySelector('.chat-message-left-dot') as HTMLDivElement;
        this.chatMessageRightDot = document.querySelector('.chat-message-right-dot') as HTMLDivElement;
        this.listerClickCloseEvent();
        this.listerPrivateBtnClick();
        this.listerPublicBtnClick();
    }

    //设置房间名
    public static setRoomName(roomName: string) {
        this.chatRoomNameEl.innerText = '房间名：' + roomName;
    }

    //添加一个视频组件
    public static addVideoBox(videoBox: SelfVideoBoxControl | VideoBoxControl) {
        this.chatRoomBodyVideoBoxEl.appendChild(videoBox.getVideoBoxEl());
    }

    //去掉一个视频组件
    public static delVideoBox(videoBox: VideoBoxControl) {
        this.chatRoomBodyVideoBoxEl.removeChild(videoBox.getVideoBoxEl());
    }

    //绑定关闭回调事件
    public static bindCloseCallBackFun(callBackFun: Function) {
        this.closeCallBackFun = callBackFun;
    }

    //隐藏页面
    public static hide() {
        this.chatRoomBoxEl.style.display = 'none';
    }

    //显示页面
    public static show() {
        document.body.style.backgroundColor = '#111';
        this.chatRoomBoxEl.style.display = 'flex';
    }

    //监听点击关闭事件
    private static listerClickCloseEvent() {
        this.exitChatRoomEl.addEventListener('click', () => {
            ConfirmTipsBoxControl.open("确定要退出吗？", () => this.closeCallBackFun());
        });
    }

    //显示全员消息小红点
    public static showPublicDot() {
        if (this.publicFlag) {
            //如果当前已经在全员页不处理
            return;
        }
        this.chatMessageLeftDot.style.display = 'block';
    }

    //隐藏全员消息小红点
    public static hidePublicDot() {
        this.chatMessageLeftDot.style.display = 'none';
    }

    //显示私有消息小红点
    public static showPrivateDot() {
        if (this.privateFlag) {
            //如果当前已经在私有聊天页不处理
            return;
        }
        this.chatMessageRightDot.style.display = 'block';
    }

    //隐藏私有消息小红点
    private static hidePrivateDot() {
        this.chatMessageRightDot.style.display = 'none';
    }

    //房间全部人员聊天按钮
    private static listerPublicBtnClick() {
        this.chatMessageLeftBtn.addEventListener('click', () => {
            //开启公共标识
            this.publicFlag = true;
            this.hidePublicDot();
            CustomBoxControl.open("全员聊天", this.publicChatMessage.getChatMessageBoxEl(), () => this.publicFlag = false);
        });
    }

    //房间私人聊天按钮
    private static listerPrivateBtnClick() {
        this.chatMessageRightBtn.addEventListener('click', () => {
            //开启私有标识
            this.privateFlag = true;
            this.hidePrivateDot();
            UserListTipsControl.open("用户列表", UserListControl.getUserListBox(), () => this.privateFlag = false);
        });
    }

    //添加私人聊天框
    public static addPrivateChatMessage(id: string, chatMessage: ChatMessageControl) {
        this.privateChatMessageMap.set(id, chatMessage);
        UserListControl.addUserInfoBox(id);
    }

    //获取私人聊天框
    public static getPrivateChatMessage(id: string): ChatMessageControl {
        return this.privateChatMessageMap.get(id) as ChatMessageControl;
    }

    //删除私用聊天框
    public static delPrivateMessage(id: string) {
        this.privateChatMessageMap.delete(id);
        UserListControl.delUserInfoBox(id);
    }

    //设置全员聊天框，只有一个
    public static setPublicChatMessage(chatMessage: ChatMessageControl) {
        this.publicChatMessage = chatMessage;
    }

    //获取全员聊天
    public static getPublicChatMessage(): ChatMessageControl {
        return this.publicChatMessage;
    }
}