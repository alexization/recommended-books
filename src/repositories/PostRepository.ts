import {PostRepositoryInterface} from "./interfaces/PostRepositoryInterface";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {CreatePostData} from "../domain/dto/PostDto";
import {Post} from "../domain/Post";
import {AppError} from "../utils/AppError";
import {ErrorMessage} from "../utils/ErrorMessage";
import {User} from "../domain/User";

export class PostRepository implements PostRepositoryInterface {

    private readonly db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async createPost(user: User, postData: CreatePostData): Promise<void> {
        try {
            const query = `INSERT INTO posts (post_id, user_id, title, content, created_at, book_id, image)
                           VALUES (?, ?, ?, ?, ?, ?, ?)`

            const newPost = Post.create(user.id, postData);

            await this.db.executeQuery(query, [newPost.id, newPost.userId, newPost.title, newPost.content, newPost.createdAt, newPost.bookId, newPost.image]);

        } catch (error) {
            throw new AppError(ErrorMessage.UNEXPECTED_ERROR);
        }
    }
}

export const postRepository = new PostRepository();