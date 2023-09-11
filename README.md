# webrtc视频聊天室
#### 介绍
WebRTC（Web实时通信）是一个用于实现网络实时通信的开源项目。它提供了一组标准化的API，可以在Web浏览器之间直接进行音频、视频和数据传输。WebRTC 的目标是使开发者能够在 Web 应用程序中轻松地添加实时通信功能，而无需借助插件或外部软件。
WebRTC 视频聊天室是基于 WebRTC 技术的应用，允许用户通过浏览器进行实时视频通话。它提供了一个多方参与的会话环境，使用户能够在网页上进行面对面的视频交流，无论身处何处。

#### 声明
此项目的webrtc通信用的是默认配置，后端不对任何个人信息数据进行存储，这最大的程度上保证了个人隐私，为什么是最大程度，不是完全？因为你只要用了网络，就已经相当于你没有隐私了，所以切莫用于违法行为，否则一切后果由你自己承担，与本作者无关。

#### 功能
- 1.实时视频通话：WebRTC 视频聊天室利用 WebRTC 技术，支持实时的高质量视频通话。用户可以通过摄像头和麦克风与其他参与者进行面对面的交流。
- 2.多方参与：视频聊天室支持多方参与，让多个用户能够同时进行视频通话。这允许团队、朋友或家人之间进行群聊，并共享彼此的视频画面。
- 3.聊天和文件共享：除了视频通话，视频聊天室通常还提供文本聊天功能，让用户可以实时发送消息。此外，聊天室还支持文件共享，允许用户在聊天过程中发送和接收文件，支持图片和视频文件的预览。
- 4.界面体验：支持响应式变化，在视频通信的时候支持更换视频的样式，例如：美化、字符化、黑白、复古等等...
- 5.屏幕共享：在电脑端支持屏幕共享显示。

#### 使用要求
- 1.使用谷歌浏览器（目前测试的谷歌浏览器），手机可以直接在微信里面打开
- 2.允许网页获得麦克风和摄像头权限

#### 功能截图
- 1.多人视频交流
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked1.png)
- 2.屏幕共享
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked10.png)
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked11.png)
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked12.png)
- 3.视频样式的更换
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked3.png)
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked2.png)
- 4.聊天信息以及图片和视频的预览
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked4.png)
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked5.png)
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked6.png)
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked7.png)
- 5.响应式布局
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked8.png)
![](https://xiaomaomi-xj.github.io/webrtc-chat-room/README%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/Inked9.png)

#### 演示网站
> 演示网站就不放了，你们可以自己运行一下，非常的简单。

#### 个性化搭建部署
- 前提：如果你要修改ts，需要先运行一条命令，把ts转成js，当然你也可以直接修改js
```shell
# 如果没有需要提前安装
# npm install -g typescript
tsc --watch
```
- 1.前端：控制聊天文件分享的大小以及消息长度和文件分片规则修改：
>前端/ts/utils/FileUtil.ts
```typescript
export default class FileUtil {
    //设置发送最大文件大小(10mb),因为没有服务器的存储，文件大小相当于在某个时间直接存在内存中，所以要限制文件的大小
    public static fileMaxSize = 10485760;
    //每次最大发送大小(5kb)（如果发送太大会导致直接发送失败，从而导致信息通道关闭），所以以此值为标准进行分片传输
    public static sendMaxSize = 5120;
    //最大消息长度(1000个字符)（1000长度汉字接近5kb）
    public static maxMessageLenght = 1000;
    //消息过长后缀
    public static overMaxMessageSuffix = '--：消息过长，无法全部显示，你可以尝试以文件的方式进行发送！';
    //对合并的文件进行保存
    private static mergeBaseUrlMap: Map<string, Array<string>> = new Map();
    //.....
}
```
- 2.后端：允许跨域的地址和房间最大人数的修改：
> 后端/src/main/java/self/live/constant/GlobalConstant.java
```java
public class GlobalConstant {
    /**
     * 房间人数包含了发送者和应答者，最少两人
     */
    public static final int ROOM_MIN_NUMBER = 2;

    /**
     * 房间人数最多不得多余6人，（这个后端做一个限制）
     */
    public static final int ROOM_MAX_NUMBER = 6;

    /**
     * 允许跨域的地址
     */
    public static final String[] ALLOWED_ORIGINS = {
            "http://127.0.0.1:5500",
            "http://localhost:5500"
    };
    //.......
}
```