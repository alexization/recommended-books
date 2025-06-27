import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto";
import {User} from "../domain/User";

export interface UserServiceInterface {
    createUser(userData: CreateUserData): Promise<boolean>;

    findUserById(id: number): Promise<User>;

    findUserByEmail(email: string): Promise<User>;

    updateUser(id: number, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: number): Promise<void>;
}