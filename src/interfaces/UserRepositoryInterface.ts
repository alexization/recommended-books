import {User} from "../domain/User";
import {CreateUserData, UpdateUserData, UserData} from "../domain/dto/UserDto";

export interface UserRepositoryInterface {
    initialize(): Promise<void>;

    createUser(createUserData: CreateUserData): Promise<User>;

    findUserById(id: number): Promise<User>;

    findUserByEmail(email: string): Promise<User>;

    updateUser(id: number, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: number): Promise<void>;
}