import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto";
import {User} from "../domain/User";

export interface UserServiceInterface {
    initialize(): Promise<void>;

    createUser(userData: CreateUserData): Promise<User>;

    findUserById(id: number): Promise<User>;

    findUserByEmail(email: string): Promise<User>;

    updateUser(id: number, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: number): Promise<void>;
}