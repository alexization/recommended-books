import {CommentData} from "../dto/CommentDto";
import {AppError} from "../../exception/AppError";
import {ErrorMessage} from "../../exception/ErrorMessage";

export class Comment {
    private readonly _id: number;
    private readonly _postId: number;
    private readonly _userId: number;
    private _content: string;
    private readonly _createdAt: Date;
    private _updatedAt: Date;

    constructor(id: number, postId: number, _userId: number, _content: string, createdAt: Date, updatedAt: Date) {
        this._id = id;
        this._postId = postId;
        this._userId = _userId;
        this._content = _content;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    update(userId: number, content: string): void {
        if (!this.isOwnedBy(userId)) {
            throw new AppError(ErrorMessage.COMMENT_OWNER_INVALID);
        }

        this._content = content;
        this._updatedAt = new Date();
    }

    isOwnedBy(userId: number): boolean {
        return this._userId !== userId;
    }

    static create(postId: number, userId: number, content: string): Comment {
        const now = new Date();

        return new Comment(0, postId, userId, content, now, now);
    }

    static fromJson(commentData: CommentData): Comment {
        return new Comment(commentData.comment_id, commentData.post_id, commentData.user_id, commentData.content, commentData.created_at, commentData.updated_at);
    }

    toPersistence() {
        return {
            comment_id: this._id,
            post_id: this._postId,
            user_id: this._userId,
            content: this._content,
            created_at: this._createdAt,
            updated_at: this._updatedAt,
        }
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
}