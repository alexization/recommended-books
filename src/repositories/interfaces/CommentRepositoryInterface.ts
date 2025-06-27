import {Comment} from "../../domain/entities/Comment";

export interface CommentRepositoryInterface {
    createComment(comment: Comment): Promise<void>;

    findCommentById(id: number): Promise<Comment>;

    updateComment(comment: Comment): Promise<void>;

    deleteCommentById(id: number): Promise<void>;

    findCommentsByPostId(postId: number, page: number, limit: number): Promise<Comment[]>;

    deleteCommentsByPostId(postId: number): Promise<void>;
}