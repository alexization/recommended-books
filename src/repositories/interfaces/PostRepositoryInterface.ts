import {CountOfPostsPerUser} from "../../domain/dto/PostDto";

export interface PostRepositoryInterface {
    getCountOfPostsPerUserByMonth(year: number, month: number): Promise<CountOfPostsPerUser[]>;
}