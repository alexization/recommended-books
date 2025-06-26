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

    static create(followId: number, followingId: number, followerId: number): Follow {
        return new Follow(followId, followingId, followerId, new Date());
    }

    static fromJson(followData: FollowData): Follow {
        return new Follow(followData.follow_id, followData.following_id, followData.follower_id, followData.created_at);
    }

    toPersistence() {
        return {
            follow_id: this._id,
            following_id: this._followingId,
            follower_id: this._followerId,
            created_at: this._createdAt,
        }
    }
}