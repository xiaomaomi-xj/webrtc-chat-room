var _a, _b, _c, _d;
class BaseUrl {
}
BaseUrl.url = 'http://localhost:9000';
class RoomInfoApi {
}
_a = RoomInfoApi;
RoomInfoApi.baseUrl = '/room-info/';
RoomInfoApi.createRoommUrl = _a.baseUrl + 'create-room';
RoomInfoApi.enterRoomUrl = _a.baseUrl + 'enter-room';
RoomInfoApi.outRoomUrl = _a.baseUrl + 'out-room';
class SignTransferApi {
}
_b = SignTransferApi;
SignTransferApi.baseUrl = '/sign-transfer/';
SignTransferApi.addOfferIdentityUrl = _b.baseUrl + 'add-offer-identity';
SignTransferApi.addAnswerIdentityUrl = _b.baseUrl + 'add-answer-identity';
class SignTransferExtApi {
}
_c = SignTransferExtApi;
SignTransferExtApi.baseUrl = '/sign-transfer-ext/';
SignTransferExtApi.getNewOfferUrl = _c.baseUrl + 'get-new-offer';
SignTransferExtApi.getNewAnswerUrl = _c.baseUrl + 'get-new-answer';
class RoomInfoExtApi {
}
_d = RoomInfoExtApi;
RoomInfoExtApi.baseUrl = '/room-info-ext/';
RoomInfoExtApi.getNewMemberUrl = _d.baseUrl + 'get-new-member';
export { BaseUrl, SignTransferApi, SignTransferExtApi, RoomInfoApi, RoomInfoExtApi };
