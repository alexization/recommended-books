import {z} from "zod";
import {ErrorMessage} from "../exception/ErrorMessage";

export const CreateUserSchema = z.object({
    email: z
        .string(ErrorMessage.EMAIL_REQUIRED)
        .email(ErrorMessage.EMAIL_INVALID_FORMAT), password: z
        .string(ErrorMessage.PASSWORD_REQUIRED)
        .min(6, ErrorMessage.PASSWORD_INVALID_LENGTH)
        .max(12, ErrorMessage.PASSWORD_INVALID_LENGTH), name: z
        .string(ErrorMessage.NAME_REQUIRED)
        .min(1, ErrorMessage.NAME_INVALID_LENGTH)
        .max(10, ErrorMessage.NAME_INVALID_LENGTH), birth: z
        .number(ErrorMessage.BIRTH_YEAR_REQUIRED)
        .min(1900, ErrorMessage.BIRTH_YEAR_INVALID_RANGE)
        .max(new Date().getFullYear(), ErrorMessage.BIRTH_YEAR_INVALID_RANGE)
})

export const FindUserByEmailSchema = z
    .string(ErrorMessage.EMAIL_REQUIRED)
    .email(ErrorMessage.EMAIL_INVALID_FORMAT)

export const UpdateUserSchema = z.object({
    name: z
        .string(ErrorMessage.NAME_REQUIRED)
        .min(1, ErrorMessage.NAME_INVALID_LENGTH)
        .max(10, ErrorMessage.NAME_INVALID_LENGTH), birth: z
        .number(ErrorMessage.BIRTH_YEAR_REQUIRED)
        .min(1900, ErrorMessage.BIRTH_YEAR_INVALID_RANGE)
        .max(new Date().getFullYear(), ErrorMessage.BIRTH_YEAR_INVALID_RANGE)
})

export const ParamsIdSchema = z
    .string(ErrorMessage.ID_INVALID_FORMAT)
    .regex(/^\d+$/, ErrorMessage.ID_INVALID_FORMAT)
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, ErrorMessage.ID_NEGATIVE_NUMBER);

export const UserPasswordSchema = z
    .string(ErrorMessage.PASSWORD_REQUIRED)
    .min(6, ErrorMessage.PASSWORD_INVALID_LENGTH)
    .max(12, ErrorMessage.PASSWORD_INVALID_LENGTH)