import {ExtendedIncomingMessage} from "../utils/Routes";

export namespace UserRequest {

    export interface CreateRequest extends ExtendedIncomingMessage {
        body?: {
            email: string; name: string; birth: number;
        };
    }

    export interface FindByIdRequest extends ExtendedIncomingMessage {
        params?: { id: string } | Record<string, string>;
    }

    export interface FindByEmailRequest extends ExtendedIncomingMessage {
        query?: { email: string } | Record<string, string>;
    }

    export interface UpdateRequest extends ExtendedIncomingMessage {
        params?: { id: string } | Record<string, string>;
    }

    export interface DeleteRequest extends ExtendedIncomingMessage {
        params?: { id: string } | Record<string, string>;
    }
}