import {PostData} from "./dto/PostDto";

export class Post {
    private readonly _id: number;
    private readonly _userId: number;
    private readonly _bookId?: number;
    private readonly _title: string;
    private readonly _content: string;
    private readonly _image?: string;
    private readonly _createdAt: Date;

    constructor(id: number, userId: number, bookId: number | undefined, title: string, content: string, image: string | undefined, createdAt?: Date) {
        this._id = id;
        this._userId = userId;
        this._bookId = bookId;
        this._title = title;
        this._content = content;
        this._image = image;
        this._createdAt = createdAt ?? new Date();
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

    get image(): string | undefined {
        return this._image;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    static fromJson(postData: PostData): Post {
        return new Post(postData.postId, postData.userId, postData.bookId, postData.title, postData.content, postData.image, postData.createdAt);
    }
}