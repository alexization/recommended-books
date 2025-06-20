import {z} from "zod";
import {ErrorMessage} from "../utils/ErrorMessage";

export const PageNumberSchema = z
    .string({required_error: ErrorMessage.BOOK_PAGE_NUMBER_REQUIRED.message})
    .regex(/^\d+$/, ErrorMessage.BOOK_PAGE_NUMBER_INVALID.message)
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, ErrorMessage.BOOK_PAGE_NUMBER_INVALID.message);