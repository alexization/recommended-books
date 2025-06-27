import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto.js";
import {User} from "../domain/User.js";

export interface UserServiceInterface {
    createUser(userData: CreateUserData): Promise<boolean>;

    findUserById(id: number): Promise<User>;

    findUserByEmail(email: string): Promise<User>;

    updateUser(id: number, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: number): Promise<void>;
}