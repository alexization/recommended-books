import {CommentServiceInterface} from "./interfaces/CommentServiceInterface";
import {UpdateCommentData} from "../domain/dto/CommentDto";
import {CommentRepositoryInterface} from "../repositories/interfaces/CommentRepositoryInterface";
import {commentRepository} from "../repositories/CommentRepository";
import {Comment} from "../domain/entities/Comment";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";

export class CommentService implements CommentServiceInterface {

    private readonly commentRepository: CommentRepositoryInterface;
    private readonly PAGE_SIZE = 10;

    constructor() {
        this.commentRepository = commentRepository;
    }

    async createComment(postId: number, userId: number, content: string): Promise<void> {
        const comment = Comment.create(postId, userId, content);

        await this.commentRepository.save(comment);
    }

    async updateComment(userId: number, updateCommentData: UpdateCommentData): Promise<void> {
        const comment = await this.getCommentById(updateCommentData.commentId);
        comment.update(userId, updateCommentData.content);

        await this.commentRepository.save(comment);
    }

    async deleteComment(commentId: number, userId: number): Promise<void> {
        const comment = await this.getCommentById(commentId);

        if (!comment.isOwnedBy(userId)) {
            throw new AppError(ErrorMessage.COMMENT_OWNER_INVALID);
        }

        await this.commentRepository.deleteById(commentId);
    }

    async findCommentsByPostId(postId: number, page: number): Promise<Comment[]> {
        return await this.commentRepository.findByPostId(postId, page, this.PAGE_SIZE);
    }

    async getCommentById(commentId: number): Promise<Comment> {
        const comment = await this.commentRepository.findById(commentId);

        if (!comment) {
            throw new AppError(ErrorMessage.COMMENT_NOT_FOUND);
        }

        return comment;
    }
}

export const commentService = new CommentService();