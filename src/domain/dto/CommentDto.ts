export interface CommentData {
    comment_id: number;
    post_id: number;
    user_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateCommentData {
    postId: number;
    content: string;
}

export interface UpdateCommentData {
    commentId: number;
    content: string;
}