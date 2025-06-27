import {PostRepositoryInterface} from "./interfaces/PostRepositoryInterface";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {Post} from "../domain/aggregates/Post";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";
import {PostData} from "../domain/dto/PostDto";

export class PostRepository implements PostRepositoryInterface {

    private readonly db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async save(post: Post): Promise<void> {
        const data = post.toPersistence();

        try {
            if (data.post_id === 0) {
                const query = `INSERT INTO posts (user_id, title, content, created_at, book_id, image_path)
                               VALUES (?, ?, ?, ?, ?, ?)`;

                await this.db.executeQuery(query, [data.user_id, data.title, data.content, data.created_at, data.book_id, data.image_path]);

            } else {
                const query = `UPDATE posts
                               SET title      = ?,
                                   content    = ?,
                                   image_path = ?
                               WHERE post_id = ?`;

                await this.db.executeQuery(query, [data.title, data.content, data.image_path, data.post_id]);
            }

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async delete(id: number): Promise<void> {
        const query = `DELETE
                       FROM posts
                       WHERE post_id = ?`;

        try {
            await this.db.executeQuery(query, [id]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findById(id: number): Promise<Post> {
        const query = `SELECT *
                       FROM posts
                       WHERE post_id = ?`;

        try {
            const postData = await this.db.executeQuery<PostData[]>(query, [id]);

            return Post.fromJson(postData[0]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

}

export const postRepository = new PostRepository();