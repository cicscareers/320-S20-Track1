import Observable from 'zen-observable-ts';
declare type ConnectionStatus = {
    online: boolean;
};
export default class DataStoreConnectivity {
    private connectionStatus;
    private observer;
    constructor();
    status(): Observable<ConnectionStatus>;
    socketDisconnected(): void;
}
export {};
