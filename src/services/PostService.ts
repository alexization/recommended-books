import {PostServiceInterface} from "./interfaces/PostServiceInterface";
import {CreatePostData, UpdatePostData} from "../domain/dto/PostDto";
import {PostRepositoryInterface} from "../repositories/interfaces/PostRepositoryInterface";
import {postRepository} from "../repositories/PostRepository";
import {User} from "../domain/aggregates/User";
import {ImageUtils} from "../utils/ImageUtils";
import {Post} from "../domain/aggregates/Post";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";

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

        await this.postRepository.save(post);
    }

    async updatePost(userId: number, postData: UpdatePostData): Promise<void> {
        const post = await this.getPostById(postData.postId);

        let imagePath: string | undefined;
        if (postData.imageBase64) {
            const {buffer, extension} = ImageUtils.decodeBase64Image(postData.imageBase64);
            imagePath = await ImageUtils.saveImageFile(buffer, `${new Date().toISOString()}${extension}`);
        }

        post.update(userId, postData, imagePath);

        await this.postRepository.save(post);
    }

    async getPostById(postId: number): Promise<Post> {
        const post = await this.postRepository.findById(postId);

        if (!post) {
            throw new AppError(ErrorMessage.POST_NOT_FOUND);
        }

        return post;
    }

    async deletePost(userId: number, postId: number): Promise<void> {
        const post = await this.getPostById(postId);

        if (!post.canBeDeletedBy(userId)) {
            throw new AppError(ErrorMessage.POST_OWNER_INVALID);
        }

        await this.postRepository.delete(postId);
    }
}

export const postService = new PostService();