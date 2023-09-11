//用户列表组件

import ChatRoomBoxBiz from "../main/ChatRoomBoxBiz.js";
import CustomBoxControl from "./CustomBoxControl.js";

//只在本类使用的类型，不导出
interface ControlDotType {
    //h红点
    userDotEl: HTMLDivElement;
    //是否需要显示
    needShow: boolean;
}

export default class UserListControl {
    private static userListBoxEl: HTMLDivElement;
    //记录一下，用于删除
    private static userInfoBoxMap: Map<string, HTMLDivElement> = new Map();
    //控制红点是否显示
    private static dotMap: Map<string, ControlDotType> = new Map();

    static {
        this.userListBoxEl = document.createElement('div');
        this.userListBoxEl.classList.add('user-list-box');
    }

    //返回组件
    public static getUserListBox(): HTMLDivElement {
        return this.userListBoxEl;
    }

    //添加一个用户
    public static addUserInfoBox(id: string) {
        const userInfoBox = document.createElement('div');
        userInfoBox.className = 'user-info-box';
        const userHeadSculpture = document.createElement('div');
        userHeadSculpture.className = 'user-head-sculpture';
        userHeadSculpture.innerText = 'ID';
        const userSfid = document.createElement('span');
        userSfid.className = 'user-sfid';
        userSfid.innerText = id;
        const userDot = document.createElement("div");
        userDot.className = 'user-dot';
        userInfoBox.appendChild(userHeadSculpture);
        userInfoBox.appendChild(userSfid);
        userInfoBox.appendChild(userDot);
        this.userListBoxEl.appendChild(userInfoBox);
        this.userInfoBoxMap.set(id, userInfoBox);
        this.dotMap.set(id, {
            userDotEl: userDot,
            needShow: true
        });
        userInfoBox.addEventListener('click', this.clickEvent.bind(this, id));
    }

    //点击事件
    private static clickEvent(id: string) {
        (this.dotMap.get(id) as ControlDotType).needShow = false;
        this.hideUserDot(id);
        CustomBoxControl.open("私人消息", ChatRoomBoxBiz.getPrivateChatMessage(id).getChatMessageBoxEl() as HTMLDivElement, () => (this.dotMap.get(id) as ControlDotType).needShow = true);
    }

    //显示小红点
    public static showUserDot(id: string) {
        //如果是false的话代表在聊天页，无需显示
        if (!(this.dotMap.get(id) as ControlDotType).needShow) {
            return;
        }
        (this.dotMap.get(id) as ControlDotType).userDotEl.style.display = 'block';
    }

    //隐藏小红点
    private static hideUserDot(id: string) {
        (this.dotMap.get(id) as ControlDotType).userDotEl.style.display = 'none';
    }

    //删除一个用户
    public static delUserInfoBox(id: string) {
        const userInfoBox = this.userInfoBoxMap.get(id) as HTMLDivElement;
        this.userListBoxEl.removeChild(userInfoBox);
    }
}