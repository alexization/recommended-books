import {z} from "zod";
import {ErrorMessage} from "../utils/ErrorMessage";

export const LoginUserSchema = z.object({
    email: z
        .string(ErrorMessage.EMAIL_REQUIRED)
        .email(ErrorMessage.EMAIL_INVALID_FORMAT), password: z
        .string(ErrorMessage.PASSWORD_REQUIRED)
        .min(6, ErrorMessage.PASSWORD_INVALID_LENGTH)
        .max(12, ErrorMessage.PASSWORD_INVALID_LENGTH)
})