import {Comment} from "../../domain/entities/Comment";

export interface CommentRepositoryInterface {
    save(comment: Comment): Promise<void>;

    findById(id: number): Promise<Comment>;

    deleteById(id: number): Promise<void>;

    findByPostId(postId: number, page: number, limit: number): Promise<Comment[]>;

    deleteByPostId(postId: number): Promise<void>;
}