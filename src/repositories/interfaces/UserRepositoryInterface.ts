import {User} from "../../domain/User";
import {CreateUserData, UpdateUserData} from "../../domain/dto/UserDto";

export interface UserRepositoryInterface {
    createUser(createUserData: CreateUserData): Promise<boolean>;

    findUserById(id: number): Promise<User>;

    findUserByEmail(email: string): Promise<User>;

    updateUser(id: number, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: number): Promise<void>;
}