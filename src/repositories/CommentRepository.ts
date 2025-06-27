import {CommentRepositoryInterface} from "./interfaces/CommentRepositoryInterface";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {Comment} from "../domain/Comment";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";
import {CommentData} from "../domain/dto/CommentDto";

export class CommentRepository implements CommentRepositoryInterface {

    private readonly db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async createComment(comment: Comment): Promise<void> {
        try {
            const data = comment.toPersistence();

            const query = `INSERT INTO comments (post_id, user_id, content, created_at, updated_at)
                           VALUES (?, ?, ?, ?, ?)`;

            await this.db.executeQuery(query, [data.post_id, data.user_id, data.content, data.created_at, data.updated_at]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async updateComment(comment: Comment): Promise<void> {
        try {
            const data = comment.toPersistence();

            const query = `UPDATE comments
                           SET content    = ?,
                               updated_at = ?
                           WHERE comment_id = ?`;

            await this.db.executeQuery(query, [data.content, data.updated_at, data.comment_id]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async deleteCommentById(id: number): Promise<void> {
        try {
            const query = `DELETE
                           FROM comments
                           WHERE comment_id = ?`;

            await this.db.executeQuery(query, [id]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async deleteCommentsByPostId(postId: number): Promise<void> {
        try {
            const query = `DELETE
                           FROM comments
                           WHERE post_id = ?`;

            await this.db.executeQuery(query, [postId]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findCommentById(id: number): Promise<Comment> {
        try {
            const query = `SELECT *
                           FROM comments
                           WHERE comment_id = ?`;

            const commentData = await this.db.executeQuery<CommentData[]>(query, [id]);

            return Comment.fromJson(commentData[0]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findCommentsByPostId(postId: number, page: number, limit: number): Promise<Comment[]> {
        try {
            const offset = (page - 1) * limit;
            const query = `SELECT *
                           FROM comments
                           WHERE post_id = ?
                           ORDER BY created_at DESC
                           LIMIT ? OFFSET ?`;

            const commentData = await this.db.executeQuery<CommentData[]>(query, [postId, limit, offset]);

            return commentData.map(comment => Comment.fromJson(comment));

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }
}

export const commentRepository = new CommentRepository();