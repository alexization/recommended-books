import {z} from "zod";
import {ErrorMessage} from "../exception/ErrorMessage";

export const CreateCommentSchema = z.object({
    postId: z.number()
        .int(), content: z.string()
})

export const UpdateCommentSchema = z.object({
    commentId: z.number().int(), content: z.string()
})

export const CommentIdSchema = z
    .string(ErrorMessage.BOOK_ID_REQUIRED)
    .regex(/^\d+$/, ErrorMessage.BOOK_ID_INVALID)
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, ErrorMessage.BOOK_ID_INVALID);