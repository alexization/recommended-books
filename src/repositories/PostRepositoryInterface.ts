import {PostRepositoryInterface} from "./interfaces/PostRepositoryInterface";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {CountOfPostsPerUser} from "../domain/dto/PostDto";

export class PostRepository implements PostRepositoryInterface {

    private readonly db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    getCountOfPostsPerUserByMonth(month: number): Promise<CountOfPostsPerUser[]> {
        return Promise.resolve([]);
    }
}

export const postRepository = new PostRepository();