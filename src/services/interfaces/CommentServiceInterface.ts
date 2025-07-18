import {CreateCommentData, UpdateCommentData} from "../../domain/dto/CommentDto";
import {Comment} from "../../domain/entities/Comment";

export interface CommentServiceInterface {
    createComment(postId: number, userId: number, content: string): Promise<void>;

    updateComment(userId: number, updateCommentData: UpdateCommentData): Promise<void>;

    deleteComment(commentId: number, userId: number): Promise<void>;

    findCommentsByPostId(postId: number, page: number): Promise<Comment[]>;

    getCommentById(commentId: number): Promise<Comment>;
}