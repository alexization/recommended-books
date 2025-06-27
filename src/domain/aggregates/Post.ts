import {CreatePostData, PostData, UpdatePostData} from "../dto/PostDto";
import {AppError} from "../../exception/AppError";
import {ErrorMessage} from "../../exception/ErrorMessage";
import {Comment} from "../entities/Comment";
import {PostLike} from "../entities/PostLike";

export class Post {
    private readonly _id: number;
    private readonly _userId: number;
    private _title: string;
    private _content: string;
    private readonly _createdAt: Date;
    private readonly _bookId?: number;
    private _imagePath?: string;

    /* Aggregate Members */
    private _comments: Comment[] = [];
    private _likes: PostLike[] = [];
    private _likeCount: number = 0;

    constructor(id: number, userId: number, title: string, content: string, createdAt: Date, bookId?: number, imagePath?: string) {
        this._id = id;
        this._userId = userId;
        this._title = title;
        this._content = content;
        this._createdAt = createdAt;
        this._bookId = bookId;
        this._imagePath = imagePath;
    }

    update(userId: number, postData: UpdatePostData, imagePath?: string): void {
        this.validateOwner(userId);

        this._title = postData.title;
        this._content = postData.content;
        this._imagePath = imagePath;
    }

    canBeDeletedBy(userId: number): boolean {
        return this.isOwnedBy(userId);
    }

    addComment(userId: number, content: string): Comment {
        const comment = Comment.create(this._id, userId, content);
        this._comments.push(comment);

        return comment;
    }

    updateComment(commentId: number, userId: number, content: string): void {
        const comment = this.findComment(commentId);
        comment.update(userId, content);
    }

    removeComment(commentId: number, userId: number): void {
        const comment = this.findComment(commentId);

        if (comment.isOwnedBy(userId) || this.isOwnedBy(userId)) {
            this._comments = this._comments.filter(c => c.id !== commentId);
        } else {
            throw new AppError(ErrorMessage.COMMENT_OWNER_INVALID);
        }
    }

    addLike(userId: number): void {
        if (this.hasLikedBy(userId)) {
            throw new AppError(ErrorMessage.POST_LIKE_EXISTS);
        }

        const like = PostLike.create(userId, this._id);
        this._likes.push(like);
        this._likeCount++;
    }

    removeLike(userId: number): void {
        if (!this.hasLikedBy(userId)) {
            throw new AppError(ErrorMessage.POST_LIKE_NOT_FOUND);
        }

        this._likes = this._likes.filter(like => like.userId !== userId);
        this._likeCount--;
    }

    private hasLikedBy(userId: number): boolean {
        return this._likes.some(like => like.userId === userId);
    }

    private validateOwner(userId: number): void {
        if (!this.isOwnedBy(userId)) {
            throw new AppError(ErrorMessage.POST_OWNER_INVALID);
        }
    }

    private isOwnedBy(userId: number): boolean {
        return this._userId === userId;
    }

    private findComment(commentId: number): Comment {
        const comment = this._comments.find(c => c.id === commentId);

        if (!comment) {
            throw new AppError(ErrorMessage.COMMENT_NOT_FOUND);
        }

        return comment;
    }

    static create(userId: number, postData: CreatePostData, imagePath?: string): Post {
        return new Post(0, userId, postData.title, postData.content, new Date(), postData.bookId, imagePath);
    }


    static fromJson(postData: PostData): Post {
        return new Post(postData.post_id, postData.user_id, postData.title, postData.content, postData.created_at, postData.book_id, postData.image_path);
    }

    toPersistence() {
        return {
            post_id: this._id,
            user_id: this._userId,
            title: this._title,
            content: this._content,
            created_at: this._createdAt,
            book_id: this._bookId,
            image_path: this._imagePath,
        }
    }

    get id(): number {
        return this._id;
    }

    get userId(): number {
        return this._userId;
    }

    get bookId(): number | undefined {
        return this._bookId;
    }
}