//房间类型
interface RoomInfoType {
    id?: string;
    roomName?: string;
    maxNumber?: number;
    roomAdminId?: string;
    roomMemberIds?: Array<string>;
}

//id返回值
interface IdBoType {
    id: string;
}

interface IdsBoType {
    ids: Array<string>;
}

//发送者类型
interface OfferIdentityType {
    fromId: string;
    toId: string;
    roomName: string;
    offer: string;
    candidate: string;
}

//应答者类型
interface AnswerIdentityType {
    fromId: string;
    toId: string;
    roomName: string;
    answer: string;
}

//错误信息类型
interface ExceptionBoType {
    statue: number;
    message: string;
}

export {
    OfferIdentityType,
    AnswerIdentityType,
    ExceptionBoType,
    IdBoType,
    IdsBoType,
    RoomInfoType
}