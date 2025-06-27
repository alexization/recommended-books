export interface PostLikeServiceInterface {
    likePost(userId: number, postId: number): Promise<void>;

    unlikePost(userId: number, postId: number): Promise<void>;

    getLikeCountByPostId(postId: number): Promise<number>;
}