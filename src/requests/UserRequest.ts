import {IncomingMessage} from "http";

export interface UserRequest extends IncomingMessage {
    body: {
        email: string;
        name: string;
        birth: number;
    };
    params: {
        id: string | number;
    };
    query: {
        email: string;
    };
}
