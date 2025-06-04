import {User} from "../domain/User";
import {CreateUserData, UpdateUserData, UserData} from "../domain/dto/UserDto";

export interface UserRepositoryInterface {
    initialize(): Promise<void>;

    createUser(createUserData: CreateUserData): Promise<User>;

    findUserById(id: number): Promise<UserData[]>;

    findUserByEmail(email: string): Promise<UserData[]>;

    updateUser(id: number, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: number): Promise<void>;
}