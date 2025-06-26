import {PostServiceInterface} from "./interfaces/PostServiceInterface";
import {CreatePostData} from "../domain/dto/PostDto";
import {PostRepositoryInterface} from "../repositories/interfaces/PostRepositoryInterface";
import {postRepository} from "../repositories/PostRepository";
import {User} from "../domain/User";
import {ImageUtils} from "../utils/ImageUtils";
import {Post} from "../domain/Post";

export class PostService implements PostServiceInterface {
    private readonly postRepository: PostRepositoryInterface;

    constructor() {
        this.postRepository = postRepository;
    }

    async createPost(user: User, postData: CreatePostData): Promise<void> {
        let imagePath: string | undefined;

        if (postData.imageBase64) {
            const {buffer, extension} = ImageUtils.decodeBase64Image(postData.imageBase64);
            imagePath = await ImageUtils.saveImageFile(buffer, `${new Date().toISOString()}${extension}`);
        }

        const post = Post.create(user.id, postData, imagePath);

        await this.postRepository.createPost(post);
    }
}

export const postService = new PostService();