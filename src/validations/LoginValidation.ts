import {z} from "zod";
import {ErrorMessage} from "../utils/ErrorMessage";

export const LoginUserSchema = z.object({
    email: z
        .string({required_error: ErrorMessage.EMAIL_REQUIRED.message})
        .email(ErrorMessage.EMAIL_INVALID_FORMAT.message), password: z
        .string({required_error: ErrorMessage.PASSWORD_REQUIRED.message})
        .min(6, ErrorMessage.PASSWORD_INVALID_LENGTH.message)
        .max(12, ErrorMessage.PASSWORD_INVALID_LENGTH.message)
})