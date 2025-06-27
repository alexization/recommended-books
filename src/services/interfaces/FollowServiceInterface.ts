import {Follow} from "../../domain/entities/Follow";

export interface FollowServiceInterface {
    follow(followingId: number, followerId: number): Promise<void>;

    unfollow(followingId: number, followerId: number): Promise<void>;

    getFollowings(userId: number, page: number): Promise<Follow[]>;

    getFollowers(userId: number, page: number): Promise<Follow[]>;

    getFollowingCount(userId: number): Promise<number>;

    getFollowerCount(userId: number): Promise<number>;
}