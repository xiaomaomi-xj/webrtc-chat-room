//主地址
class BaseUrl {
    public static url = 'http://localhost:9000';
}

//房间信息接口
class RoomInfoApi {
    private static baseUrl = '/room-info/';
    public static createRoommUrl = this.baseUrl + 'create-room';
    public static enterRoomUrl = this.baseUrl + 'enter-room';
    public static outRoomUrl = this.baseUrl + 'out-room';
}

//信令交互接口
class SignTransferApi {
    private static baseUrl = '/sign-transfer/';
    public static addOfferIdentityUrl = this.baseUrl + 'add-offer-identity';
    public static addAnswerIdentityUrl = this.baseUrl + 'add-answer-identity';
}

//信令交互扩展接口
class SignTransferExtApi {
    private static baseUrl = '/sign-transfer-ext/';
    public static getNewOfferUrl = this.baseUrl + 'get-new-offer';
    public static getNewAnswerUrl = this.baseUrl + 'get-new-answer';
}

//房间扩展接口
class RoomInfoExtApi {
    private static baseUrl = '/room-info-ext/';
    public static getNewMemberUrl = this.baseUrl + 'get-new-member';
}

export {
    BaseUrl,
    SignTransferApi,
    SignTransferExtApi,
    RoomInfoApi,
    RoomInfoExtApi
}