import {User} from "../domain/User";
import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto";

export interface UserRepositoryInterface {
    initialize(): Promise<void>;

    createUser(createUserData: CreateUserData): Promise<User>;

    findUserById(id: string): Promise<User>;

    findUserByEmail(email: string): Promise<User>;

    updateUser(id: string, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: string): Promise<void>;
}