export interface PostData {
    postId: number;
    userId: number;
    title: string;
    content: string;
    createdAt: Date;
    bookId?: number;
    image?: string;
}

export interface CreatePostData {
    title: string;
    content: string;
    bookId?: number;
    image?: string;
}