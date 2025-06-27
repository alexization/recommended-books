import {PostLikeServiceInterface} from "./interfaces/PostLikeServiceInterface";
import {PostLike} from "../domain/entities/PostLike";
import {PostLikeRepositoryInterface} from "../repositories/interfaces/PostLikeRepositoryInterface";
import {postLikeRepository} from "../repositories/PostLikeRepository";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";

export class PostLikeService implements PostLikeServiceInterface {
    private readonly postLikeRepository: PostLikeRepositoryInterface;

    constructor() {
        this.postLikeRepository = postLikeRepository;
    }

    async likePost(userId: number, postId: number): Promise<void> {
        if (await this.postLikeRepository.findLikeByUserIdAndPostId(userId, postId)) {
            throw new AppError(ErrorMessage.POST_LIKE_EXISTS);
        }

        const postLike = PostLike.create(userId, postId);

        await this.postLikeRepository.createLike(postLike);
    }

    async unlikePost(userId: number, postId: number): Promise<void> {
        if (!await this.postLikeRepository.findLikeByUserIdAndPostId(userId, postId)) {
            throw new AppError(ErrorMessage.POST_LIKE_NOT_FOUND);
        }

        await this.postLikeRepository.deleteLike(userId, postId);
    }

    async getLikeCountByPostId(postId: number): Promise<number> {
        return await this.postLikeRepository.countLikesByPostId(postId);
    }
}

export const postLikeService = new PostLikeService();