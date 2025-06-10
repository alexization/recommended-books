import {ExtendedIncomingMessage} from "../utils/Routes";

export interface UserRequest extends ExtendedIncomingMessage {
    body?: {
        email: string; name: string; birth: number;
    };
    params?: { id: string } | Record<string, string>;
    query?: { email: string } | Record<string, string>;
}