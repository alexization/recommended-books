import {CommentData, CreateCommentData, UpdateCommentData} from "./dto/CommentDto.js";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";

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

    get id(): number {
        return this._id;
    }

    get postId(): number {
        return this._postId;
    }

    get userId(): number {
        return this._userId;
    }

    update(userId: number, data: UpdateCommentData): void {
        this.validateOwner(userId);

        this._content = data.content;
        this._updatedAt = new Date();
    }

    validateOwner(userId: number): void {
        if (this._userId !== userId) {
            throw new AppError(ErrorMessage.COMMENT_OWNER_INVALID);
        }
    }

    static create(commentId: number, userId: number, commentData: CreateCommentData): Comment {
        return new Comment(commentId, commentData.postId, userId, commentData.content, new Date(), new Date());
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
}