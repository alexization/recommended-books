import {CreateCommentData, UpdateCommentData} from "../../domain/dto/CommentDto";
import {Comment} from "../../domain/Comment";

export interface CommentServiceInterface {
    createComment(createCommentData: CreateCommentData): Promise<void>;

    updateComment(updateCommentData: UpdateCommentData): Promise<void>;

    deleteComment(commentId: number, userId: number): Promise<void>;

    getCommentsByPostId(postId: number, page: number): Promise<Comment[]>;
}