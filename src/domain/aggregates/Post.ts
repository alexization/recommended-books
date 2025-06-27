import {CreatePostData, PostData, UpdatePostData} from "../dto/PostDto";
import {AppError} from "../../exception/AppError";
import {ErrorMessage} from "../../exception/ErrorMessage";

export class Post {
    private readonly _id: number;
    private readonly _userId: number;
    private _title: string;
    private _content: string;
    private readonly _createdAt: Date;
    private readonly _bookId?: number;
    private _imagePath?: string;

    constructor(id: number, userId: number, title: string, content: string, createdAt: Date, bookId?: number, imagePath?: string) {
        this._id = id;
        this._userId = userId;
        this._title = title;
        this._content = content;
        this._createdAt = createdAt;
        this._bookId = bookId;
        this._imagePath = imagePath;
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

    update(userId: number, postData: UpdatePostData, imagePath?: string): void {
        this.validateOwner(userId);

        this._title = postData.title;
        this._content = postData.content;
        this._imagePath = imagePath;
    }

    validateOwner(userId: number): void {
        if (!this.canModifiedBy(userId)) {
            throw new AppError(ErrorMessage.POST_OWNER_INVALID);
        }
    }

    canModifiedBy(userId: number): boolean {
        return this._userId === userId;
    }


    static create(postId: number, userId: number, postData: CreatePostData, imagePath?: string): Post {
        return new Post(postId, userId, postData.title, postData.content, new Date(), postData.bookId, imagePath);
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
}