import {FollowData} from "./dto/FollowDto.js";

export class Follow {
    private readonly _id: number;
    private readonly _followingId: number;
    private readonly _followerId: number;
    private readonly _createdAt: Date;

    constructor(id: number, followingId: number, followerId: number, createdAt: Date) {
        this._id = id;
        this._followingId = followingId;
        this._followerId = followerId;
        this._createdAt = createdAt;
    }

    get id(): number {
        return this._id;
    }

    get followingId(): number {
        return this._followingId;
    }

    get followerId(): number {
        return this._followerId;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    static fromJson(followData: FollowData): Follow {
        return new Follow(followData.followId, followData.followingId, followData.followerId, followData.createdAt);
    }
}