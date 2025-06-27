import {z} from "zod";
import {ErrorMessage} from "../exception/ErrorMessage";

export const QueryFollowIdSchema = z
    .string(ErrorMessage.ID_INVALID_FORMAT)
    .regex(/^\d+$/, ErrorMessage.ID_INVALID_FORMAT)
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, ErrorMessage.ID_NEGATIVE_NUMBER);

export const ParamPageSchema = z
    .string(ErrorMessage.ID_INVALID_FORMAT)
    .regex(/^\d+$/, ErrorMessage.ID_INVALID_FORMAT)
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, ErrorMessage.ID_NEGATIVE_NUMBER);