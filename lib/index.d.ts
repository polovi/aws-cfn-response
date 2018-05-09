export declare enum Status {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}
export interface Message {
    Status: Status;
    ResponseURL: string;
    PhysicalResourceId: string;
    StackId: string;
    RequestId: string;
    LogicalResourceId: string;
    Data?: any;
    Reason?: string;
}
export declare const send: (msg: Message) => Promise<{}>;
