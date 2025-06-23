import {User} from "../../domain/User";

export interface PostRepositoryInterface {
    getGoldUsers(): Promise<User[]>;

    getSilverUsers(): Promise<User[]>;
}