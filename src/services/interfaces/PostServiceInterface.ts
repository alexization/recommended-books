import {CreatePostData} from "../../domain/dto/PostDto";
import {User} from "../../domain/User";

export interface PostServiceInterface {
    createPost(user: User, postData: CreatePostData): Promise<void>;
}