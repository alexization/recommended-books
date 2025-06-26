import {CreatePostData, PostData} from "./dto/PostDto.js";

export class Post {
    private readonly _id: number;
    private readonly _userId: number;
    private readonly _title: string;
    private readonly _content: string;
    private readonly _createdAt: Date;
    private readonly _bookId?: number;
    private readonly _imagePath?: string;

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

    get title(): string {
        return this._title;
    }

    get content(): string {
        return this._content;
    }

    get imagePath(): string | undefined {
        return this._imagePath;
    }

    get createdAt(): Date {
        return this._createdAt;
    }


    static create(userId: number, postData: CreatePostData, imagePath?: string): Post {
        return new Post(0, userId, postData.title, postData.content, new Date(), postData.bookId, imagePath);
    }

    static fromJson(postData: PostData): Post {
        return new Post(postData.postId, postData.userId, postData.title, postData.content, postData.createdAt, postData.bookId, postData.imagePath);
    }

    toPersistence() {
        return {
            post_id: this._id,
            user_id: this._userId,
            title: this._title,
            content: this._content,
            createdAt: this._createdAt,
            bookId: this._bookId,
            imagePath: this._imagePath,
        }
    }
}