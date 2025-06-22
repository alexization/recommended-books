import {z} from "zod";
import {ErrorMessage} from "../utils/ErrorMessage";

export const PageNumberSchema = z
    .string(ErrorMessage.BOOK_PAGE_NUMBER_REQUIRED)
    .regex(/^\d+$/, ErrorMessage.BOOK_PAGE_NUMBER_INVALID)
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, ErrorMessage.BOOK_PAGE_NUMBER_INVALID);

export const BookTitleSchema = z
    .string(ErrorMessage.BOOK_TITLE_REQUIRED);

export const BookAuthorSchema = z
    .string(ErrorMessage.BOOK_AUTHOR_REQUIRED);

export const BookIdSchema = z
    .string(ErrorMessage.BOOK_ID_REQUIRED)
    .regex(/^\d+$/, ErrorMessage.BOOK_ID_INVALID)
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, ErrorMessage.BOOK_ID_INVALID);