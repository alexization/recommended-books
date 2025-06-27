import {PostRepositoryInterface} from "./interfaces/PostRepositoryInterface";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {Post} from "../domain/Post";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";
import {PostData} from "../domain/dto/PostDto";

export class PostRepository implements PostRepositoryInterface {

    private readonly db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async createPost(post: Post): Promise<void> {
        try {
            const data = post.toPersistence();

            const query = `INSERT INTO posts (user_id, title, content, created_at, book_id, image_path)
                           VALUES (?, ?, ?, ?, ?, ?)`

            await this.db.executeQuery(query, [data.user_id, data.title, data.content, data.created_at, data.book_id, data.image_path]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findPostById(id: number): Promise<Post> {
        try {
            const query = `SELECT *
                           FROM posts
                           WHERE post_id = ?`;

            const postData = await this.db.executeQuery<PostData[]>(query, [id]);

            return Post.fromJson(postData[0]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async updatePost(post: Post): Promise<void> {
        try {
            const data = post.toPersistence();

            const query = `UPDATE posts
                           SET title      = ?,
                               content    = ?,
                               image_path = ?
                           WHERE post_id = ?`;

            await this.db.executeQuery(query, [data.title, data.content, data.image_path, data.post_id]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async deletePost(id: number): Promise<void> {
        try {
            const query = `DELETE
                           FROM posts
                           WHERE post_id = ?`;

            await this.db.executeQuery(query, [id]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

}

export const postRepository = new PostRepository();