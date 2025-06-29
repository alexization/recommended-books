import {Follow} from "../../domain/entities/Follow";

export interface FollowRepositoryInterface {
    save(follow: Follow): Promise<void>;

    delete(followId: number): Promise<void>;

    findFollow(followingId: number, followerId: number): Promise<Follow>;

    findFollowingsByUserId(userId: number, page: number, limit: number): Promise<Follow[]>;

    findFollowersByUserId(userId: number, page: number, limit: number): Promise<Follow[]>;

    countFollowings(userId: number): Promise<number>;

    countFollowers(userId: number): Promise<number>;
}