export interface CommentData {
    commentId: number;
    postId: number;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCommentData {
    postId: number;
    userId: number;
    content: string;
}

export interface UpdateCommentData {
    postId: number;
    userId: number;
    content: string;
}