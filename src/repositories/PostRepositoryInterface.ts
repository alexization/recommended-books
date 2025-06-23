import {PostRepositoryInterface} from "./interfaces/PostRepositoryInterface";
import {User} from "../domain/User";
import {DatabaseConnection} from "../config/DatabaseConfig";

export class PostRepository implements PostRepositoryInterface {

    private readonly db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    getGoldUsers(): Promise<User[]> {
        return Promise.resolve([]);
    }

    getSilverUsers(): Promise<User[]> {
        return Promise.resolve([]);
    }
}

export const postRepository = new PostRepository();