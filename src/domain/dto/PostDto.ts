export interface PostData {
    postId: number;
    userId: number;
    bookId: number | undefined;
    title: string;
    content: string;
    image: string | undefined;
    createdAt: Date;
}