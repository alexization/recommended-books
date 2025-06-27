import {PostLikeData} from "./dto/PostLikeDto.js";

export class PostLike {
    private readonly _userId: number;
    private readonly _postId: number;
    private readonly _createdAt: Date;

    constructor(userId: number, postId: number, createdAt: Date) {
        this._userId = userId;
        this._postId = postId;
        this._createdAt = createdAt;
    }

    get userId(): number {
        return this._userId;
    }

    get postId(): number {
        return this._postId;
    }

    static create(userId: number, postId: number): PostLike {
        return new PostLike(userId, postId, new Date());
    }

    static fromJson(postLikeData: PostLikeData): PostLike {
        return new PostLike(postLikeData.user_id, postLikeData.post_id, postLikeData.created_at);
    }

    toPersistence() {
        return {
            user_id: this._userId, post_id: this._postId, created_at: this._createdAt
        }
    }
}