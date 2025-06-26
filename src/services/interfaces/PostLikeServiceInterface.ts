import {PostLike} from "../../domain/PostLike";

export interface PostLikeServiceInterface {
    likePost(userId: number, postId: number): Promise<void>;

    unlikePost(userId: number, postId: number): Promise<void>;

    getLikedPostsByUserId(userId: number, page: number): Promise<PostLike[]>;

    getLikeCountByPostId(postId: number): Promise<number>;
}