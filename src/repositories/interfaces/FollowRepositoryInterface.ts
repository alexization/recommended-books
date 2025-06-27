import {Follow} from "../../domain/entities/Follow";

export interface FollowRepositoryInterface {
    createFollow(follow: Follow): Promise<void>;

    deleteFollow(followId: number): Promise<void>;

    findFollow(followingId: number, followerId: number): Promise<Follow>;

    findFollowingsByUserId(userId: number, page: number, limit: number): Promise<Follow[]>;

    findFollowersByUserId(userId: number, page: number, limit: number): Promise<Follow[]>;

    countFollowings(userId: number): Promise<number>;

    countFollowers(userId: number): Promise<number>;
}