import { MessageBoxControl } from "../components/MessageBoxControl.js";
import StringUtil from "../utils/StringUtil.js";
export default class FirstBoxBiz {
    static run() {
        this.fisstBoxEl = document.querySelector('.first-box');
        this.firstformBoxEls = document.querySelectorAll(".first-form-box");
        this.createRoomBtn = document.querySelector('.create-room-btn');
        this.enterRoomBtn = document.querySelector('.enter-room-btn');
        this.createRoomNameInput = document.querySelector('.create-roomName');
        this.createMaxNumberInput = document.querySelector('.create-maxNumber');
        this.enterRoomNameInput = document.querySelector('.enter-roomName');
        this.toCreateRoom = document.querySelector('.to-create-room');
        this.toEnterRoom = document.querySelector('.to-enter-room');
        this.bindOverturnEvent();
        this.listerCreateRoom();
        this.listerEnterRoom();
    }
    static bindOverturnEvent() {
        this.toEnterRoom.addEventListener('click', () => {
            this.firstformBoxEls[0].style.transform = 'rotateY(180deg)';
            this.firstformBoxEls[1].style.transform = 'rotateY(360deg)';
        });
        this.toCreateRoom.addEventListener('click', () => {
            this.firstformBoxEls[0].style.transform = 'rotateY(0deg)';
            this.firstformBoxEls[1].style.transform = 'rotateY(180deg)';
        });
    }
    static hide() {
        this.fisstBoxEl.style.display = 'none';
    }
    static chkCreateRoomInfo() {
        let roomName = this.createRoomNameInput.value;
        let maxNumber = this.createMaxNumberInput.value;
        if (this.chkRoomName(roomName) && this.chkMaxNumber(maxNumber)) {
            return {
                isAccept: true,
                roomName,
                maxNumber: window.parseInt(maxNumber)
            };
        }
        return {
            isAccept: false
        };
    }
    static chkEnterRoomInfo() {
        const roomName = this.enterRoomNameInput.value;
        if (this.chkRoomName(roomName)) {
            return {
                isAccept: true,
                roomName
            };
        }
        return {
            isAccept: false
        };
    }
    static chkRoomName(roomName) {
        if (StringUtil.chkObjNull(roomName)) {
            MessageBoxControl.open("房间名称不能为空！");
            return false;
        }
        return true;
    }
    static chkMaxNumber(maxNumber) {
        if (StringUtil.chkObjNull(maxNumber)) {
            MessageBoxControl.open("房间最大人数不能为空！");
            return false;
        }
        let numV = parseInt(maxNumber);
        if (window.isNaN(numV)) {
            MessageBoxControl.open("房间最大人数必须为数字！");
            return false;
        }
        if (numV < 2) {
            MessageBoxControl.open("房间最大人数不得小于2！");
            return false;
        }
        return true;
    }
    static bindCallBackFun(createRoomCallBackFun, enterRoomCallBackFun) {
        this.createRoomCallBackFun = createRoomCallBackFun;
        this.enterRoomCallBackFun = enterRoomCallBackFun;
    }
    static listerCreateRoom() {
        this.createRoomBtn.addEventListener('click', () => {
            const createRoomInfo = this.chkCreateRoomInfo();
            if (createRoomInfo.isAccept) {
                this.createRoomCallBackFun(createRoomInfo.roomName, createRoomInfo.maxNumber);
            }
        });
    }
    static listerEnterRoom() {
        this.enterRoomBtn.addEventListener('click', () => {
            const enterRoomInfo = this.chkEnterRoomInfo();
            if (enterRoomInfo.isAccept) {
                this.enterRoomCallBackFun(enterRoomInfo.roomName);
            }
        });
    }
}
