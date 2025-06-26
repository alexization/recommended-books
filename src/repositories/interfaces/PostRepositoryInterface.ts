import {CreatePostData} from "../../domain/dto/PostDto";
import {User} from "../../domain/User";
import {Post} from "../../domain/Post";

export interface PostRepositoryInterface {
    createPost(user: User, postData: CreatePostData, imagePath?: string): Promise<void>;

    findPostById(id: number): Promise<void>;

    updatePost(post: Post): Promise<void>;

    deletePost(id: number): Promise<void>;
}