import {ExtendedIncomingMessage} from "../utils/Routes";

export interface BookRequest extends ExtendedIncomingMessage {
    query?: { pageNo: string } | Record<string, string>;
}