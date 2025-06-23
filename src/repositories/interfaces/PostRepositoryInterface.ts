import {CountOfPostsPerUser} from "../../domain/dto/PostDto";

export interface PostRepositoryInterface {
    getCountOfPostsPerUserByMonth(month: number): Promise<CountOfPostsPerUser[]>;
}