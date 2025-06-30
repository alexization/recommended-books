import {Post} from "../../domain/aggregates/Post";

export interface PostRepositoryInterface {
    save(post: Post): Promise<void>;

    delete(id: number): Promise<void>;

    findById(id: number): Promise<Post>;
}