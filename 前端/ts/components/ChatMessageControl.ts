import FileTypeConstant from "../constant/FileTypeConstant.js";
import FileUtil from "../utils/FileUtil.js";
import StringUtil from "../utils/StringUtil.js";
import ChatMessageImageControl from "./ChatMessageImageControl.js";
import ChatMessageVideoControl from "./ChatMessageVideoControl.js";
import LoadingControl from "./LoadingControl.js";
import { MessageBoxControl } from "./MessageBoxControl.js";

//聊天界面控制
export default class ChatMessageControl {
    private chatMessageBoxEl: HTMLDivElement;
    private chatMessageBodyBoxEl: HTMLDivElement;
    private chatMessageInputEl: HTMLInputElement;
    private chatMessageSendBtnEl: HTMLDivElement;
    private fileBoxEl: HTMLDivElement;
    private hideFileInputEl: HTMLInputElement;
    constructor() {
        this.chatMessageBoxEl = document.createElement('div');
        this.chatMessageBoxEl.classList.add('custom-use-box');
        this.chatMessageBoxEl.classList.add('chat-message-box');
        const chatMessageHeaderBox = document.createElement('div');
        chatMessageHeaderBox.className = 'chat-message-header-box';
        chatMessageHeaderBox.innerText = 'ID相当于此人的姓名，对应了视频显示框上面的id';
        this.chatMessageBoxEl.appendChild(chatMessageHeaderBox);
        this.chatMessageBodyBoxEl = document.createElement('div');
        this.chatMessageBodyBoxEl.className = 'chat-message-body-box';
        this.chatMessageBoxEl.appendChild(this.chatMessageBodyBoxEl);
        const chatMessageFooterBoxEl = document.createElement('div');
        chatMessageFooterBoxEl.className = 'chat-message-footer-box';
        const chatMessageInputBoxEl = document.createElement('div');
        chatMessageInputBoxEl.className = 'chat-message-input-box';
        this.chatMessageInputEl = document.createElement('input');
        chatMessageInputBoxEl.appendChild(this.chatMessageInputEl);
        chatMessageFooterBoxEl.appendChild(chatMessageInputBoxEl);
        this.chatMessageSendBtnEl = document.createElement('div');
        this.chatMessageSendBtnEl.className = 'chat-message-send-btn';
        this.chatMessageSendBtnEl.innerText = '发送';
        chatMessageFooterBoxEl.appendChild(this.chatMessageSendBtnEl);
        this.fileBoxEl = document.createElement('div');
        this.fileBoxEl.className = 'file-box';
        this.hideFileInputEl = document.createElement('input');
        this.hideFileInputEl.type = 'file';
        this.hideFileInputEl.style.display = 'none';
        this.fileBoxEl.appendChild(this.hideFileInputEl);
        const fileLeftBoxEl = document.createElement('div');
        fileLeftBoxEl.className = 'file-left-box';
        const fileRightBoxEl = document.createElement('div');
        fileRightBoxEl.className = 'file-right-box';
        this.fileBoxEl.appendChild(fileLeftBoxEl);
        this.fileBoxEl.appendChild(fileRightBoxEl);
        chatMessageFooterBoxEl.appendChild(this.fileBoxEl);
        this.chatMessageBoxEl.appendChild(chatMessageFooterBoxEl);
        this.bindMessageEvent();
    }

    //绑定消息监听事件
    private bindMessageEvent() {
        this.chatMessageInputEl.addEventListener('input', (e) => {
            this.chatMessageInputEl.value = this.chatMessageInputEl.value.trim();
            if (StringUtil.chkObjNull(this.chatMessageInputEl.value)) {
                this.chatMessageSendBtnEl.classList.remove('active');
            } else {
                this.chatMessageSendBtnEl.classList.add('active');
            }
        });
    }

    //获取控件
    public getChatMessageBoxEl(): HTMLDivElement {
        return this.chatMessageBoxEl;
    }

    //创建接收信息组件
    public createReceiveMessage(id: string, message: string) {
        const chatMessageBodyLeftBoxEl = document.createElement('div');
        chatMessageBodyLeftBoxEl.className = 'chat-message-body-left-box';
        const chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '他';
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyHeadSculpture);
        const chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        const chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        const chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        const chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-message';
        chatMessageBodyMessage.innerText = message;
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyMessageBox);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyLeftBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
    }

    //创建发送信息组件
    public createSendMessage(id: string, message: string) {
        const chatMessageBodyRightBoxEl = document.createElement('div');
        chatMessageBodyRightBoxEl.className = 'chat-message-body-right-box';
        const chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        const chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        const chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        const chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-message';
        chatMessageBodyMessage.innerText = message;
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        const chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '我';
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyMessageBox);
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyHeadSculpture);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyRightBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
    }

    //创建接收图片组件
    public createReceiveImage(id: string, fileName: string, imgBase64Url: string) {
        const chatMessageBodyLeftBoxEl = document.createElement('div');
        chatMessageBodyLeftBoxEl.className = 'chat-message-body-left-box';
        const chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '他';
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyHeadSculpture);
        const chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        const chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        const chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        const chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-image-box';
        const imgEl = document.createElement('img');
        imgEl.className = 'chat-message-body-image';
        imgEl.src = imgBase64Url;
        chatMessageBodyMessage.appendChild(imgEl)
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyMessageBox);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyLeftBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
        chatMessageBodyMessage.addEventListener('click', () => {
            ChatMessageImageControl.open(imgBase64Url, fileName);
        });
    }

    //创建发送图片组件
    public createSendImage(id: string, fileName: string, imgBase64Url: string) {
        const chatMessageBodyRightBoxEl = document.createElement('div');
        chatMessageBodyRightBoxEl.className = 'chat-message-body-right-box';
        const chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        const chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        const chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        const chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-image-box';
        const imgEl = document.createElement('img');
        imgEl.className = 'chat-message-body-image';
        imgEl.src = imgBase64Url;
        chatMessageBodyMessage.appendChild(imgEl)
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        const chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '我';
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyMessageBox);
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyHeadSculpture);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyRightBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
        chatMessageBodyMessage.addEventListener('click', () => {
            ChatMessageImageControl.open(imgBase64Url, fileName);
        });
    }

    //创建接收视频组件
    public createReceiveVideo(id: string, fileName: string, videoBaseUrl: string) {
        const chatMessageBodyLeftBoxEl = document.createElement('div');
        chatMessageBodyLeftBoxEl.className = 'chat-message-body-left-box';
        const chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '他';
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyHeadSculpture);
        const chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        const chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        const chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        const chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-video-box';
        const videoEl = document.createElement('video');
        videoEl.className = 'chat-message-body-video';
        videoEl.src = videoBaseUrl;
        chatMessageBodyMessage.appendChild(videoEl)
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyMessageBox);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyLeftBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
        chatMessageBodyMessage.addEventListener('click', () => {
            ChatMessageVideoControl.open(videoBaseUrl, fileName);
        });
    }

    //创建发送视频组件
    public createSendVideo(id: string, fileName: string, videoBaseUrl: string) {
        const chatMessageBodyRightBoxEl = document.createElement('div');
        chatMessageBodyRightBoxEl.className = 'chat-message-body-right-box';
        const chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        const chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        const chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        const chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-video-box';
        const videoEl = document.createElement('video');
        videoEl.className = 'chat-message-body-video';
        videoEl.src = videoBaseUrl;
        chatMessageBodyMessage.appendChild(videoEl)
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        const chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '我';
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyMessageBox);
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyHeadSculpture);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyRightBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
        chatMessageBodyMessage.addEventListener('click', () => {
            ChatMessageVideoControl.open(videoBaseUrl, fileName);
        });
    }

    //创建接受文件组件
    public createReceiveFile(id: string, fileName: string, url: string) {
        const chatMessageBodyLeftBoxEl = document.createElement('div');
        chatMessageBodyLeftBoxEl.className = 'chat-message-body-left-box';
        const chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '他';
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyHeadSculpture);
        const chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        const chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        const chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        const chatMessageBodyFile = document.createElement('div');
        chatMessageBodyFile.className = 'chat-message-body-message-file';
        const chatMessageBodyMessageFileBody = document.createElement('div');
        chatMessageBodyMessageFileBody.className = 'chat-message-body-message-file-body';
        const imgEl = document.createElement('img');
        imgEl.className = 'chat-message-body-message-file-icon';
        imgEl.src = './src/img/file-icon.png';
        chatMessageBodyMessageFileBody.appendChild(imgEl);
        const chatMessageBodyMessageFileName = document.createElement('span');
        chatMessageBodyMessageFileName.className = 'chat-message-body-message-file-name';
        chatMessageBodyMessageFileName.innerText = fileName;
        chatMessageBodyMessageFileBody.appendChild(chatMessageBodyMessageFileName);
        chatMessageBodyFile.appendChild(chatMessageBodyMessageFileBody);
        const chatMessageBodyMessageFileFooter = document.createElement('div');
        chatMessageBodyMessageFileFooter.className = 'chat-message-body-message-file-footer';
        const chatMessageBodyMessageFileStyleText = document.createElement('span');
        chatMessageBodyMessageFileStyleText.className = 'chat-message-body-message-file-style-text';
        let suffixName = FileUtil.getFileSuffixName(fileName);
        if (StringUtil.chkObjNull(suffixName)) {
            chatMessageBodyMessageFileStyleText.innerText = '未知文件';
        } else {
            chatMessageBodyMessageFileStyleText.innerText = suffixName + '文件';
        }
        chatMessageBodyMessageFileFooter.appendChild(chatMessageBodyMessageFileStyleText);
        const chatMessageBodyMessageFileDownloadBtn = document.createElement('div');
        chatMessageBodyMessageFileDownloadBtn.className = 'chat-message-body-message-file-download-btn';
        chatMessageBodyMessageFileDownloadBtn.innerText = '下载';
        chatMessageBodyMessageFileDownloadBtn.addEventListener('click', () => FileUtil.downloadFile(url, fileName));
        chatMessageBodyMessageFileFooter.appendChild(chatMessageBodyMessageFileDownloadBtn);
        chatMessageBodyFile.appendChild(chatMessageBodyMessageFileFooter);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyFile);
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyMessageBox);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyLeftBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
    }

    //创建发送文件组件
    public createSendFile(id: string, fileName: string, url: string) {
        const chatMessageBodyRightBoxEl = document.createElement('div');
        chatMessageBodyRightBoxEl.className = 'chat-message-body-right-box';
        const chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        const chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        const chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        const chatMessageBodyFile = document.createElement('div');
        chatMessageBodyFile.className = 'chat-message-body-message-file';
        const chatMessageBodyMessageFileBody = document.createElement('div');
        chatMessageBodyMessageFileBody.className = 'chat-message-body-message-file-body';
        const imgEl = document.createElement('img');
        imgEl.className = 'chat-message-body-message-file-icon';
        imgEl.src = './src/img/file-icon.png';
        chatMessageBodyMessageFileBody.appendChild(imgEl);
        const chatMessageBodyMessageFileName = document.createElement('span');
        chatMessageBodyMessageFileName.className = 'chat-message-body-message-file-name';
        chatMessageBodyMessageFileName.innerText = fileName;
        chatMessageBodyMessageFileBody.appendChild(chatMessageBodyMessageFileName);
        chatMessageBodyFile.appendChild(chatMessageBodyMessageFileBody);
        const chatMessageBodyMessageFileFooter = document.createElement('div');
        chatMessageBodyMessageFileFooter.className = 'chat-message-body-message-file-footer';
        const chatMessageBodyMessageFileStyleText = document.createElement('span');
        chatMessageBodyMessageFileStyleText.className = 'chat-message-body-message-file-style-text';
        let suffixName = FileUtil.getFileSuffixName(fileName);
        if (StringUtil.chkObjNull(suffixName)) {
            chatMessageBodyMessageFileStyleText.innerText = '未知文件';
        } else {
            chatMessageBodyMessageFileStyleText.innerText = suffixName + '文件';
        }
        chatMessageBodyMessageFileFooter.appendChild(chatMessageBodyMessageFileStyleText);
        const chatMessageBodyMessageFileDownloadBtn = document.createElement('div');
        chatMessageBodyMessageFileDownloadBtn.className = 'chat-message-body-message-file-download-btn';
        chatMessageBodyMessageFileDownloadBtn.innerText = '下载';
        chatMessageBodyMessageFileDownloadBtn.addEventListener('click', () => FileUtil.downloadFile(url, fileName));
        chatMessageBodyMessageFileFooter.appendChild(chatMessageBodyMessageFileDownloadBtn);
        chatMessageBodyFile.appendChild(chatMessageBodyMessageFileFooter);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyFile);
        const chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '我';
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyMessageBox);
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyHeadSculpture);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyRightBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
    }

    //绑定发送点击事件
    public bindSendMessageFun(id: string, callBackFun: Function) {
        this.chatMessageSendBtnEl.addEventListener('click', () => {
            //不是活动状态或则为空都不处理
            if (!this.chatMessageSendBtnEl.classList.contains('active')) {
                return;
            }
            let message = this.chatMessageInputEl.value;
            if (StringUtil.chkObjNull(message)) {
                return;
            }
            //检验消息长度
            if (message.length > FileUtil.maxMessageLenght) {
                MessageBoxControl.open("你发送的消息过长，已对消息进行截取发送！");
                message = message.substring(0, FileUtil.maxMessageLenght - FileUtil.overMaxMessageSuffix.length) + FileUtil.overMaxMessageSuffix;
            }
            //发送
            this.createSendMessage(id, message);
            callBackFun(message);
            this.chatMessageInputEl.value = '';
            this.chatMessageSendBtnEl.classList.remove('active');
        });
    }

    //绑定发送文件事件
    public bindSelectSendFileFun(id: string, callBackFun: Function) {
        this.fileBoxEl.addEventListener('click', () => {
            this.hideFileInputEl.click();
        });
        this.hideFileInputEl.addEventListener('change', () => {
            const file = (this.hideFileInputEl.files as FileList)[0];
            //没有选择文件
            if (file == undefined) {
                return;
            }
            //检查文件大小
            if (file.size > FileUtil.fileMaxSize) {
                MessageBoxControl.open("文件最大不得超过" + Math.floor(FileUtil.fileMaxSize / 1024 / 1024) + "MB!");
                return;
            }
            let fileName = file.name;
            //对文件进行base64处理
            FileUtil.fileToBaseInfo(file, (fileStyle: string, fileBaseUrl: string) => {
                //发送文件超过限定大小，进行分片
                if (file.size > FileUtil.sendMaxSize) {
                    //开启loading,发完之后再显示
                    LoadingControl.open()
                    FileUtil.splitBaseUrl(fileBaseUrl, (splitStr: string, currentNum: number, totalNum: number) => {
                        callBackFun(splitStr, fileName, fileStyle, true, currentNum, totalNum);
                    }, () => {
                        if (fileStyle.startsWith(FileTypeConstant.imgType)) {
                            this.createSendImage(id, fileName, fileBaseUrl);
                        } else if (fileStyle.startsWith(FileTypeConstant.videoType)) {
                            this.createSendVideo(id, fileName, fileBaseUrl);
                        } else {
                            this.createSendFile(id, fileName, fileBaseUrl);
                        }
                    });
                } else {
                    //普通的直接显示即可
                    if (fileStyle.startsWith(FileTypeConstant.imgType)) {
                        this.createSendImage(id, fileName, fileBaseUrl);
                    } else if (fileStyle.startsWith(FileTypeConstant.videoType)) {
                        this.createSendVideo(id, fileName, fileBaseUrl);
                    } else {
                        this.createSendFile(id, fileName, fileBaseUrl);
                    }
                    callBackFun(fileBaseUrl, fileName, fileStyle, false, 0, 0);
                }
            });
            this.hideFileInputEl.value = '';
        });
    }

    //接受消息
    public receiveMessage(id: string, message: string) {
        this.createReceiveMessage(id, message);
    }

    //接受文件
    public receiveFile(id: string, fileName: string, fileBaseUrl: string, fileStyle: string, isSplit: boolean, currentNum: number, totalNum: number) {
        //不是分片直接显示
        if (!isSplit) {
            if (fileStyle.startsWith(FileTypeConstant.imgType)) {
                this.createReceiveImage(id, fileName, fileBaseUrl);
            } else if (fileStyle.startsWith(FileTypeConstant.videoType)) {
                this.createReceiveVideo(id, fileName, fileBaseUrl);
            } else {
                this.createReceiveFile(id, fileName, fileBaseUrl);
            }
        } else {
            //是分片进行合并
            FileUtil.mergeBaseUrl(id, fileBaseUrl, currentNum, totalNum, (mergeBaseUrl: string) => {
                if (fileStyle.startsWith(FileTypeConstant.imgType)) {
                    this.createReceiveImage(id, fileName, mergeBaseUrl);
                } else if (fileStyle.startsWith(FileTypeConstant.videoType)) {
                    this.createReceiveVideo(id, fileName, mergeBaseUrl);
                } else {
                    this.createReceiveFile(id, fileName, mergeBaseUrl);
                }
            });
        }
    }
}