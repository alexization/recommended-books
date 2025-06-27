import {CreatePostData, UpdatePostData} from "../../domain/dto/PostDto";
import {User} from "../../domain/User";
import {Post} from "../../domain/Post";

export interface PostServiceInterface {
    createPost(user: User, postData: CreatePostData): Promise<void>;

    updatePost(updatePostData: UpdatePostData): Promise<void>;

    deletePost(postId: number): Promise<void>;

    findPostById(postId: number): Promise<Post>;
}