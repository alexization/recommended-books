import {User, UserData} from "../domain/User";

export interface UserRepositoryInterface {
    initialize(): Promise<void>;

    createUser(userData: UserData): Promise<User>;

    findUserById(id: string | number): Promise<UserData[]>;

    findUserByEmail(email: string): Promise<UserData[]>;

    updateUser(updateUserData: UserData): Promise<UserData>;

    deleteUser(id: string | number): Promise<void>;
}