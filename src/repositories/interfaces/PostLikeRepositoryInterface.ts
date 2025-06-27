import {PostLike} from "../../domain/PostLike";

export interface PostLikeRepositoryInterface {
    createLike(postLike: PostLike): Promise<void>;

    deleteLike(userId: number, postId: number): Promise<void>;

    countLikesByPostId(postId: number): Promise<number>;

    deleteLikesByPostId(postId: number): Promise<void>;
}