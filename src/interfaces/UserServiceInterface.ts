import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto";
import {User} from "../domain/User";

export interface UserServiceInterface {
    initialize(): Promise<void>;

    createUser(userData: CreateUserData): Promise<User>;

    findUserById(id: string): Promise<User>;

    findUserByEmail(email: string): Promise<User>;

    updateUser(id: string, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: string): Promise<void>;
}