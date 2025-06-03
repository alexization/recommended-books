import {IncomingMessage} from "http";

export interface BookRequest extends IncomingMessage {
    query: {
        pageNo: number;
    };
}