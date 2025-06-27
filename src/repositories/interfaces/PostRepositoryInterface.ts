import {Post} from "../../domain/aggregates/Post";

export interface PostRepositoryInterface {
    createPost(post: Post): Promise<void>;

    findPostById(id: number): Promise<Post>;

    updatePost(post: Post): Promise<void>;

    deletePost(id: number): Promise<void>;
}