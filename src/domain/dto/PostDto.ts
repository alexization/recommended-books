export interface PostData {
    postId: number;
    userId: number;
    bookId?: number;
    title: string;
    content: string;
    image?: string;
    createdAt: Date;
}