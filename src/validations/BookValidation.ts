import {z} from "zod";
import {ErrorMessage} from "../exception/ErrorMessage";

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

export const CreateBookSchema = z.object({
    title: z.string(ErrorMessage.BOOK_TITLE_REQUIRED)
        .min(1, ErrorMessage.BOOK_TITLE_REQUIRED),
    author: z.string(ErrorMessage.BOOK_AUTHOR_REQUIRED)
        .min(1, ErrorMessage.BOOK_AUTHOR_REQUIRED),
    publisher: z.string(ErrorMessage.BOOK_PUBLISHER_REQUIRED)
        .min(1, ErrorMessage.BOOK_PUBLISHER_REQUIRED),
    publicationYear: z.number(ErrorMessage.BOOK_PUBLICATION_YEAR_REQUIRED)
        .min(1500, ErrorMessage.BOOK_PUBLICATION_YEAR_INVALID)
        .max(new Date().getFullYear() + 1, ErrorMessage.BOOK_PUBLICATION_YEAR_INVALID),
});

export const StartDateSchema = z.coerce.date()