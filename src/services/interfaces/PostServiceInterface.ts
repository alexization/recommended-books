import {CreatePostData, UpdatePostData} from "../../domain/dto/PostDto";
import {User} from "../../domain/aggregates/User";
import {Post} from "../../domain/aggregates/Post";

export interface PostServiceInterface {
    createPost(user: User, postData: CreatePostData): Promise<void>;

    updatePost(userId: number, updatePostData: UpdatePostData): Promise<void>;

    deletePost(userId: number, postId: number): Promise<void>;

    getPostById(postId: number): Promise<Post>;
}