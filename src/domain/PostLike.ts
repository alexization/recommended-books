import {PostLikeData} from "./dto/PostLikeDto";

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

    get createdAt(): Date {
        return this._createdAt;
    }

    static fromJson(postLikeData: PostLikeData): PostLike {
        return new PostLike(postLikeData.userId, postLikeData.postId, postLikeData.createdAt);
    }
}