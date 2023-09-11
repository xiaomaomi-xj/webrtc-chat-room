//消息类型
export default interface MessageType {
    sfid: string;
    message?: string;
    fileName?: string;
    fileBaseUrl?: string;
    fileStyle?: string;
    style: string;
    state: string;
    isSplit?: boolean;
    currentNum?: number;
    totalNum?: number;
}