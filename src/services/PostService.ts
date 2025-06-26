import {PostServiceInterface} from "./interfaces/PostServiceInterface";
import {CreatePostData, UpdatePostData} from "../domain/dto/PostDto";
import {PostRepositoryInterface} from "../repositories/interfaces/PostRepositoryInterface";
import {postRepository} from "../repositories/PostRepository";
import {User} from "../domain/User";
import {ImageUtils} from "../utils/ImageUtils";
import {Post} from "../domain/Post";
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

        const post = Post.create(0, user.id, postData, imagePath);

        await this.postRepository.createPost(post);
    }

    async findPostById(postId: number): Promise<Post> {
        const post = await this.postRepository.findPostById(postId);

        if (!post) {
            throw new AppError(ErrorMessage.POST_NOT_FOUND);
        }

        return post;
    }

    async updatePost(userId: number, postData: UpdatePostData): Promise<void> {
        const post = await this.findPostById(postData.postId);

        let imagePath: string | undefined;
        if (postData.imageBase64) {
            const {buffer, extension} = ImageUtils.decodeBase64Image(postData.imageBase64);
            imagePath = await ImageUtils.saveImageFile(buffer, `${new Date().toISOString()}${extension}`);
        }

        post.update(userId, postData, imagePath);

        await this.postRepository.updatePost(post);
    }

    async deletePost(userId: number, postId: number): Promise<void> {
        const post = await this.findPostById(postId);

        if (!post) {
            throw new AppError(ErrorMessage.POST_NOT_FOUND);
        }

        post.validateOwner(userId);

        await this.postRepository.deletePost(postId);
    }
}

export const postService = new PostService();