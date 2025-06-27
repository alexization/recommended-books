import {Post} from "../../domain/Post";

export interface PostRepositoryInterface {
    createPost(post: Post): Promise<void>;

    findPostById(id: number): Promise<void>;

    updatePost(post: Post): Promise<void>;

    deletePost(id: number): Promise<void>;
}