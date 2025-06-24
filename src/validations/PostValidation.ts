import {z} from "zod";
import {ErrorMessage} from "../exception/ErrorMessage";

export const CreatePostSchema = z.object({
    bookId: z.number(ErrorMessage.BOOK_ID_REQUIRED)
        .int()
        .positive()
        .optional(),
    title: z.string(ErrorMessage.POST_TITLE_REQUIRED)
        .min(1, ErrorMessage.POST_TITLE_INVALID)
        .max(50, ErrorMessage.POST_TITLE_INVALID),
    content: z.string(ErrorMessage.POST_CONTENT_REQUIRED),
    imageBase64: z.string()
        .optional()
});