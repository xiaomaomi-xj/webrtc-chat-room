var _a;
import ChatRoomBoxBiz from "../main/ChatRoomBoxBiz.js";
import CustomBoxControl from "./CustomBoxControl.js";
class UserListControl {
    static getUserListBox() {
        return this.userListBoxEl;
    }
    static addUserInfoBox(id) {
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
    static clickEvent(id) {
        this.dotMap.get(id).needShow = false;
        this.hideUserDot(id);
        CustomBoxControl.open("私人消息", ChatRoomBoxBiz.getPrivateChatMessage(id).getChatMessageBoxEl(), () => this.dotMap.get(id).needShow = true);
    }
    static showUserDot(id) {
        if (!this.dotMap.get(id).needShow) {
            return;
        }
        this.dotMap.get(id).userDotEl.style.display = 'block';
    }
    static hideUserDot(id) {
        this.dotMap.get(id).userDotEl.style.display = 'none';
    }
    static delUserInfoBox(id) {
        const userInfoBox = this.userInfoBoxMap.get(id);
        this.userListBoxEl.removeChild(userInfoBox);
    }
}
_a = UserListControl;
UserListControl.userInfoBoxMap = new Map();
UserListControl.dotMap = new Map();
(() => {
    _a.userListBoxEl = document.createElement('div');
    _a.userListBoxEl.classList.add('user-list-box');
})();
export default UserListControl;
