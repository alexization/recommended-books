import {PostLike} from "../../domain/entities/PostLike";

export interface PostLikeRepositoryInterface {
    save(postLike: PostLike): Promise<void>;

    findLikeByUserIdAndPostId(userId: number, postId: number): Promise<PostLike>;

    delete(userId: number, postId: number): Promise<void>;

    countLikesByPostId(postId: number): Promise<number>;

    deleteLikesByPostId(postId: number): Promise<void>;
}