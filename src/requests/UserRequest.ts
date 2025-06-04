import {IncomingMessage} from "http";

export interface UserRequest extends IncomingMessage {
    body: {
        email: string;
        name: string;
        birth: number;
    };
    params: {
        id: number;
    };
    query: {
        email: string;
    };
}