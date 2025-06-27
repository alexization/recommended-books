import {DatabaseConnection} from "../config/DatabaseConfig";
import {PostLikeRepositoryInterface} from "./interfaces/PostLikeRepositoryInterface";
import {PostLike} from "../domain/entities/PostLike";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";
import {PostLikeData} from "../domain/dto/PostLikeDto";

export class PostLikeRepository implements PostLikeRepositoryInterface {
    private readonly db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async createLike(postLike: PostLike): Promise<void> {
        try {
            const data = postLike.toPersistence();

            const query = `INSERT INTO post_likes (user_id, post_id, created_at)
                           VALUES (?, ?, ?)`;

            await this.db.executeQuery(query, [data.user_id, data.post_id, data.created_at]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findLikeByUserIdAndPostId(userId: number, postId: number): Promise<PostLike> {
        try {
            const query = `SELECT *
                           FROM post_likes
                           WHERE user_id = ?
                             AND post_id = ?`;

            const postLikeData = await this.db.executeQuery<PostLikeData[]>(query, [userId, postId]);

            return PostLike.fromJson(postLikeData[0]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async deleteLike(userId: number, postId: number): Promise<void> {
        try {
            const query = `DELETE
                           FROM post_likes
                           WHERE user_id = ?
                             AND post_id = ?`;

            await this.db.executeQuery(query, [userId, postId]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async deleteLikesByPostId(postId: number): Promise<void> {
        try {
            const query = `DELETE
                           FROM post_likes
                           WHERE post_id = ?`;

            await this.db.executeQuery(query, [postId]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async countLikesByPostId(postId: number): Promise<number> {
        try {
            const query = `SELECT COUNT(*) as count
                           FROM post_likes
                           WHERE post_id = ?`;

            const result = await this.db.executeQuery<{ count: bigint }[]>(query, [postId]);

            return Number(result[0].count);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }
}

export const postLikeRepository = new PostLikeRepository();