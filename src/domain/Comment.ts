import {CommentData} from "./dto/CommentDto";

export class Comment {
    private readonly _id: number;
    private readonly _postId: number;
    private readonly _userId: number;
    private readonly _content: string;
    private readonly _createdAt: Date;
    private readonly _updatedAt: Date;

    constructor(id: number, postId: number, _userId: number, _content: string, createdAt: Date, updatedAt: Date) {
        this._id = id;
        this._postId = postId;
        this._userId = _userId;
        this._content = _content;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    get id(): number {
        return this._id;
    }

    get postId(): number {
        return this._postId;
    }

    get userId(): number {
        return this._userId;
    }

    get content(): string {
        return this._content;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    static fromJson(commentData: CommentData): Comment {
        return new Comment(commentData.commentId, commentData.postId, commentData.userId, commentData.content, commentData.createdAt, commentData.updatedAt);
    }
}