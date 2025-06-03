import {UserData} from "../domain/User";

export interface UserServiceInterface {
    initialize(): Promise<void>;

    createUser(userData: UserData): Promise<UserData>;

    findUserById(id: number): Promise<UserData[]>;

    findUserByEmail(email: string): Promise<UserData[]>;

    updateUser(updateUserData: UserData): Promise<UserData>;

    deleteUser(id: number): Promise<void>;
}