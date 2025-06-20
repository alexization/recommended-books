import {z} from "zod";
import {ErrorMessage} from "../utils/ErrorMessage";

export const CreateUserScheme = z.object({
    email: z
        .string({required_error: ErrorMessage.EMAIL_REQUIRED.message})
        .email(ErrorMessage.EMAIL_INVALID_FORMAT.message), password: z
        .string({required_error: ErrorMessage.PASSWORD_REQUIRED.message})
        .min(6, ErrorMessage.PASSWORD_INVALID_LENGTH.message)
        .max(12, ErrorMessage.PASSWORD_INVALID_LENGTH.message), name: z
        .string({required_error: ErrorMessage.NAME_REQUIRED.message})
        .min(1, ErrorMessage.NAME_INVALID_LENGTH.message)
        .max(10, ErrorMessage.NAME_INVALID_LENGTH.message), birth: z
        .number({required_error: ErrorMessage.BIRTH_YEAR_REQUIRED.message})
        .min(1900, ErrorMessage.BIRTH_YEAR_INVALID_RANGE.message)
        .max(new Date().getFullYear(), ErrorMessage.BIRTH_YEAR_INVALID_RANGE.message)
})

export const FindUserByEmailScheme = z
    .string({required_error: ErrorMessage.EMAIL_REQUIRED.message})
    .email(ErrorMessage.EMAIL_INVALID_FORMAT.message)

export const UpdateUserScheme = z.object({
    name: z
        .string({required_error: ErrorMessage.NAME_REQUIRED.message})
        .min(1, ErrorMessage.NAME_INVALID_LENGTH.message)
        .max(10, ErrorMessage.NAME_INVALID_LENGTH.message), birth: z
        .number({required_error: ErrorMessage.BIRTH_YEAR_REQUIRED.message})
        .min(1900, ErrorMessage.BIRTH_YEAR_INVALID_RANGE.message)
        .max(new Date().getFullYear(), ErrorMessage.BIRTH_YEAR_INVALID_RANGE.message)
})

export const ParamsIdScheme = z
    .string({required_error: ErrorMessage.ID_INVALID_FORMAT.message})
    .regex(/^\d+$/, ErrorMessage.ID_INVALID_FORMAT.message)
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, ErrorMessage.ID_NEGATIVE_NUMBER.message);
