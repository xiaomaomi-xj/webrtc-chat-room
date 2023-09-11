import { MessageBoxControl } from "../components/MessageBoxControl.js";
import StringUtil from "../utils/StringUtil.js";

//一个数据小类型,只对这个类服务，不用导出
interface RoomInfoChkType {
    isAccept: boolean;
    roomName?: string;
    maxNumber?: number;
}

//首个显示的界面功能处理
export default class FirstBoxBiz {
    //获取元素
    private static fisstBoxEl: HTMLDivElement;
    private static firstformBoxEls: Array<HTMLDivElement>;
    private static createRoomBtn: HTMLDivElement;
    private static enterRoomBtn: HTMLDivElement;
    private static createRoomNameInput: HTMLInputElement;
    private static createMaxNumberInput: HTMLInputElement;
    private static enterRoomNameInput: HTMLInputElement;
    private static toCreateRoom: HTMLSpanElement;
    private static toEnterRoom: HTMLSpanElement;
    private static createRoomCallBackFun: Function;
    private static enterRoomCallBackFun: Function;

    //运行
    public static run() {
        this.fisstBoxEl = document.querySelector('.first-box') as HTMLDivElement;
        this.firstformBoxEls = document.querySelectorAll(".first-form-box") as unknown as Array<HTMLDivElement>;
        this.createRoomBtn = document.querySelector('.create-room-btn') as HTMLDivElement;
        this.enterRoomBtn = document.querySelector('.enter-room-btn') as HTMLDivElement;
        this.createRoomNameInput = document.querySelector('.create-roomName') as HTMLInputElement;
        this.createMaxNumberInput = document.querySelector('.create-maxNumber') as HTMLInputElement;
        this.enterRoomNameInput = document.querySelector('.enter-roomName') as HTMLInputElement;
        this.toCreateRoom = document.querySelector('.to-create-room') as HTMLSpanElement;
        this.toEnterRoom = document.querySelector('.to-enter-room') as HTMLSpanElement;
        this.bindOverturnEvent();
        this.listerCreateRoom();
        this.listerEnterRoom();
    }

    //翻转控制
    private static bindOverturnEvent() {
        this.toEnterRoom.addEventListener('click', () => {
            this.firstformBoxEls[0].style.transform = 'rotateY(180deg)';
            this.firstformBoxEls[1].style.transform = 'rotateY(360deg)';
        });
        this.toCreateRoom.addEventListener('click', () => {
            this.firstformBoxEls[0].style.transform = 'rotateY(0deg)';
            this.firstformBoxEls[1].style.transform = 'rotateY(180deg)';
        });
    }

    //界面隐藏,只有刷新页面才会重新显示
    public static hide() {
        this.fisstBoxEl.style.display = 'none';
    }

    //创建房间信息检测
    private static chkCreateRoomInfo(): RoomInfoChkType {
        let roomName = this.createRoomNameInput.value;
        let maxNumber = this.createMaxNumberInput.value;
        if (this.chkRoomName(roomName) && this.chkMaxNumber(maxNumber)) {
            return {
                isAccept: true,
                roomName,
                maxNumber: window.parseInt(maxNumber)
            }
        }
        return {
            isAccept: false
        }
    }

    //进入房间信息检测
    private static chkEnterRoomInfo(): RoomInfoChkType {
        const roomName = this.enterRoomNameInput.value;
        if (this.chkRoomName(roomName)) {
            return {
                isAccept: true,
                roomName
            }
        }
        return {
            isAccept: false
        }
    }

    //房间名称检测
    private static chkRoomName(roomName: string): boolean {
        if (StringUtil.chkObjNull(roomName)) {
            MessageBoxControl.open("房间名称不能为空！");
            return false;
        }
        return true;
    }

    //最大报名数检测
    private static chkMaxNumber(maxNumber: string): boolean {
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

    //绑定回调事件
    public static bindCallBackFun(createRoomCallBackFun: Function, enterRoomCallBackFun: Function) {
        this.createRoomCallBackFun = createRoomCallBackFun;
        this.enterRoomCallBackFun = enterRoomCallBackFun;
    }

    //创建房间
    private static listerCreateRoom() {
        this.createRoomBtn.addEventListener('click', () => {
            const createRoomInfo = this.chkCreateRoomInfo();
            if (createRoomInfo.isAccept) {
                this.createRoomCallBackFun(createRoomInfo.roomName, createRoomInfo.maxNumber);
            }
        });
    }

    //进入房间
    private static listerEnterRoom() {
        this.enterRoomBtn.addEventListener('click', () => {
            const enterRoomInfo = this.chkEnterRoomInfo();
            if (enterRoomInfo.isAccept) {
                this.enterRoomCallBackFun(enterRoomInfo.roomName);
            }
        });
    }
}