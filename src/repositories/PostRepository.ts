import {PostRepositoryInterface} from "./interfaces/PostRepositoryInterface";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {CreatePostData} from "../domain/dto/PostDto";
import {Post} from "../domain/Post";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";
import {User} from "../domain/User";

export class PostRepository implements PostRepositoryInterface {

    private readonly db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async createPost(user: User, createPostData: CreatePostData, imagePath?: string): Promise<void> {
        try {
            const newPost = Post.create(user.id, createPostData, imagePath);
            const postData = newPost.toPersistence();

            const query = `INSERT INTO posts (post_id, user_id, title, content, created_at, book_id, image_path)
                           VALUES (?, ?, ?, ?, ?, ?, ?)`

            await this.db.executeQuery(query, [postData.post_id, postData.user_id, postData.title, postData.content, postData.created_at, postData.book_id, postData.image_path]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }
}

export const postRepository = new PostRepository();