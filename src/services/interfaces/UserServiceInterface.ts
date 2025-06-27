import {CreateUserData, UpdateUserData} from "../../domain/dto/UserDto";
import {User} from "../../domain/User";

export interface UserServiceInterface {
    createUser(userData: CreateUserData): Promise<void>;

    getUserById(id: number): Promise<User>;

    getUserByEmail(email: string): Promise<User>;

    updateUser(id: number, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: number): Promise<void>;

    changePassword(id: number, newPassword: string): Promise<void>;
}