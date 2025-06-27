import {PostServiceInterface} from "./interfaces/PostServiceInterface";
import {CreatePostData} from "../domain/dto/PostDto";
import {PostRepositoryInterface} from "../repositories/interfaces/PostRepositoryInterface";
import {postRepository} from "../repositories/PostRepository";
import {User} from "../domain/User";
import {ImageUtils} from "../utils/ImageUtils";

export class PostService implements PostServiceInterface {
    private readonly postRepository: PostRepositoryInterface;

    constructor() {
        this.postRepository = postRepository;
    }

    async createPost(user: User, postData: CreatePostData): Promise<void> {
        let imagePath: string | undefined;

        if (postData.imageBase64) {
            try {
                const {buffer, extension} = ImageUtils.decodeBase64Image(postData.imageBase64);

                imagePath = await ImageUtils.saveImageFile(buffer, `${new Date().toISOString()}${extension}`);

            } catch (error) {
                throw error;
            }
        }

        await this.postRepository.createPost(user, postData, imagePath);
    }
}

export const postService = new PostService();