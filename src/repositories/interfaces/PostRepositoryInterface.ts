import {CreatePostData} from "../../domain/dto/PostDto";
import {User} from "../../domain/User";

export interface PostRepositoryInterface {
    createPost(user: User, postData: CreatePostData, imagePath?: string): Promise<void>;
}