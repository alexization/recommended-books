import {CommentServiceInterface} from "./interfaces/CommentServiceInterface";
import {CreateCommentData, UpdateCommentData} from "../domain/dto/CommentDto";
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

    async createComment(userId: number, createCommentData: CreateCommentData): Promise<void> {
        const comment = Comment.create(0, userId, createCommentData);

        await this.commentRepository.createComment(comment);
    }

    async updateComment(userId: number, updateCommentData: UpdateCommentData): Promise<void> {
        const comment = await this.getCommentById(updateCommentData.commentId);
        comment.update(userId, updateCommentData);

        await this.commentRepository.updateComment(comment);
    }

    async deleteComment(commentId: number, userId: number): Promise<void> {
        const comment = await this.getCommentById(commentId);
        comment.validateOwner(userId);

        await this.commentRepository.deleteCommentById(commentId);
    }

    async findCommentsByPostId(postId: number, page: number): Promise<Comment[]> {
        return await this.commentRepository.findCommentsByPostId(postId, page, this.PAGE_SIZE);
    }

    async getCommentById(commentId: number): Promise<Comment> {
        const comment = await this.commentRepository.findCommentById(commentId);

        if (!comment) {
            throw new AppError(ErrorMessage.COMMENT_NOT_FOUND);
        }

        return comment;
    }
}

export const commentSerivce = new CommentService();