import {PostServiceInterface} from "./interfaces/PostServiceInterface";
import {CreatePostData} from "../domain/dto/PostDto";
import {PostRepositoryInterface} from "../repositories/interfaces/PostRepositoryInterface";
import {postRepository} from "../repositories/PostRepository";
import {User} from "../domain/User";

export class PostService implements PostServiceInterface {

    private readonly postRepository: PostRepositoryInterface;

    constructor() {
        this.postRepository = postRepository;
    }

    async createPost(user: User, postData: CreatePostData): Promise<void> {
        await this.postRepository.createPost(user, postData);
    }
}

export const postService = new PostService();