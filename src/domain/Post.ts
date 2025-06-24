import {CreatePostData, PostData} from "./dto/PostDto.js";

export class Post {
    private readonly _id: number;
    private readonly _userId: number;
    private readonly _title: string;
    private readonly _content: string;
    private readonly _createdAt: Date;
    private readonly _bookId?: number;
    private readonly _image?: string;

    constructor(id: number, userId: number, title: string, content: string, createdAt: Date, bookId?: number, image?: string) {
        this._id = id;
        this._userId = userId;
        this._title = title;
        this._content = content;
        this._createdAt = createdAt;
        this._bookId = bookId;
        this._image = image;
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
        return new Post(postData.postId, postData.userId, postData.title, postData.content, postData.createdAt, postData.bookId, postData.image);
    }

    static create(userId: number, postData: CreatePostData): Post {
        return new Post(0, userId, postData.title, postData.content, new Date(), postData.bookId, postData.image);
    }
}