import {User} from "../domain/User.js";
import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto.js";

export interface UserRepositoryInterface {
    createUser(createUserData: CreateUserData): Promise<boolean>;

    findUserById(id: number): Promise<User>;

    findUserByEmail(email: string): Promise<User>;

    updateUser(id: number, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: number): Promise<void>;
}