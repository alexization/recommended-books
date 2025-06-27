import {CreatePostData, UpdatePostData} from "../../domain/dto/PostDto";
import {User} from "../../domain/User";
import {Post} from "../../domain/Post";

export interface PostServiceInterface {
    createPost(user: User, postData: CreatePostData): Promise<void>;

    updatePost(userId: number, updatePostData: UpdatePostData): Promise<void>;

    deletePost(userId: number, postId: number): Promise<void>;

    getPostById(postId: number): Promise<Post>;
}