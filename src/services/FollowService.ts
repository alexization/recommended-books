import {FollowServiceInterface} from "./interfaces/FollowServiceInterface";
import {Follow} from "../domain/Follow";
import {FollowRepositoryInterface} from "../repositories/interfaces/FollowRepositoryInterface";
import {followRepository} from "../repositories/FollowRepository";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";

export class FollowService implements FollowServiceInterface {

    private readonly followRepository: FollowRepositoryInterface;
    private readonly PAGE_SIZE = 10;

    constructor() {
        this.followRepository = followRepository;
    }

    async follow(followingId: number, followerId: number): Promise<void> {
        if (await this.followRepository.findFollow(followingId, followerId)) {
            throw new AppError(ErrorMessage.FOLLOW_EXISTED);
        }

        const follow = Follow.create(0, followingId, followerId);

        await this.followRepository.createFollow(follow);
    }

    async unfollow(followingId: number, followerId: number): Promise<void> {
        const follow = await this.followRepository.findFollow(followingId, followerId);

        if (!follow) {
            throw new AppError(ErrorMessage.FOLLOW_EXISTED);
        }

        await this.followRepository.deleteFollow(follow.id);
    }

    async getFollowers(userId: number, page: number): Promise<Follow[]> {
        return this.followRepository.findFollowersByUserId(userId, page, this.PAGE_SIZE);
    }

    async getFollowings(userId: number, page: number): Promise<Follow[]> {
        return this.followRepository.findFollowingsByUserId(userId, page, this.PAGE_SIZE);
    }

    async getFollowerCount(userId: number): Promise<number> {
        return this.followRepository.countFollowers(userId);
    }

    async getFollowingCount(userId: number): Promise<number> {
        return this.followRepository.countFollowings(userId);
    }
}

export const followService = new FollowService();